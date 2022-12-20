import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../apis/api";
import { isAPI } from "../../states";

const emailRegex = /[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$/;
const passRegex = /[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]/;
const alertText = [
    "이메일과 비밀번호를 입력해주세요.",
    "비밀번호를 8자 이상 입력해주세요.",
    "알맞는 이메일 및 비밀번호 형식을 사용해주세요.",
    "이메일을 입력해주세요.",
    "알맞는 이메일 형식을 사용해주세요.",
    "비밀번호가 일치하지 않습니다.",
];

// 자동 로그인 (테스트할때 재로그인하기 귀찮아서 만듬. 삭제 예정)
export function autoLogin() {
    localStorage["login"] = "true";
    localStorage["email"] = "fingerorder@naver.com";
    localStorage["kakao"] = "true";
    location.href = "/";
}

// 일반 로그인 일 때
export function LoginDefault() {
    localStorage["kakao"] = "false";
}

// 카카오 로그인 일 때
export function LoginKakao() {
    localStorage["kakao"] = "true";
}

// 로그인 함수
export function login(email: string, pass: string, e: { preventDefault: () => void }) {
    if (!email || !pass) {
        alert(alertText[0]);
        e.preventDefault();
    } else if (pass.length < 8) {
        alert(alertText[1]);
        e.preventDefault();
    } else if (!emailRegex.exec(email) || passRegex.exec(pass)) {
        alert(alertText[2]);
        e.preventDefault();
    } else {
        if (isAPI) {
            APIPost(
                "/api/auth/sign-up",
                JSON.stringify({
                    email: email,
                    password: pass,
                    nickName: "",
                    type: "MERCHANT",
                })
            );
        } else {
            localStorage["login"] = "true";
            localStorage["email"] = email;
        }
    }
}

// 로그아웃 함수
export function logout() {
    if (isAPI) {
        APIGet("/api/auth/sign-out");
    } else {
        localStorage.removeItem("login");
        localStorage.removeItem("email");
        localStorage.removeItem("kakao");
        location.href = "/";
    }
}

// 비밀번호 재설정 링크 보낼 이메일 입력
export function emailSend(email: string) {
    if (!email) alert(alertText[3]);
    else if (!emailRegex.exec(email)) alert(alertText[4]);
    else {
        if (isAPI) {
            APIPost(
                "/api/users/password",
                JSON.stringify({
                    email: email,
                })
            );
        } else {
            localStorage.removeItem("login");
            localStorage.removeItem("email");
            localStorage.removeItem("kakao");
            location.href = "/";
        }
        return true;
    }
    return false;
}

// 회원가입
export function signup(email: string, pass1: string, pass2: string) {
    if (email === "" || pass1 === "" || pass2 === "") alert(alertText[0]);
    else if (pass1 !== pass2) alert(alertText[5]);
    else if (pass1.length < 8 || pass2.length < 8) alert(alertText[1]);
    else if (!emailRegex.exec(email) || passRegex.exec(pass1) || passRegex.exec(pass2)) alert(alertText[2]);
    else {
        if (isAPI) {
            APIPost(
                "/api/auth/sign-up",
                JSON.stringify({
                    email: email,
                    password: pass1,
                    nickName: "",
                    type: "MERCHANT",
                })
            );
        }
        return true;
    }
    return false;
}

// 비밀번호 초기화
export function passwordReset(uuid: string, pass1: string, pass2: string) {
    if (uuid === "" || pass1 === "" || pass2 === "") alert(alertText[0]);
    else if (pass1 !== pass2) alert(alertText[5]);
    else if (pass1.length < 8 || pass2.length < 8) alert(alertText[1]);
    else if (passRegex.exec(pass1) || passRegex.exec(pass2)) alert(alertText[2]);
    else {
        if (isAPI) {
            APIPut(
                "/api/?",
                JSON.stringify({
                    uuid: uuid,
                    password: pass1,
                })
            );
        }
        return true;
    }
    return false;
}

// 회원 탈퇴
export function withdrawal(pass: string) {
    const email = localStorage["email"];
    if (email === "" || pass === "") alert(alertText[0]);
    else if (pass.length < 8) alert(alertText[1]);
    else if (passRegex.exec(pass)) alert(alertText[2]);
    else {
        if (isAPI) {
            APIDel(
                "/api/users",
                JSON.stringify({
                    email: email,
                    password: pass,
                })
            );
        }
        return true;
    }
    return false;
}
