import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Login.module.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loginTry, setLoginTry] = useState(false);

    // 자동 로그인 (테스트할때 재로그인하기 귀찮아서 만듬. 삭제 예정)
    function autoLogin() {
        localStorage["login"] = "true";
        localStorage["email"] = "fingerorder@naver.com";
        localStorage["kakao"] = "true";
        location.href = "/";
    }

    // 일반 로그인 일 때
    function loginDefault() {
        localStorage["kakao"] = "false";
    }

    // 카카오 로그인 일 때
    function loginKakao() {
        localStorage["kakao"] = "true";
    }

    // 로그인 함수
    function login(e: { preventDefault: () => void }) {
        const emailRegex = /[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$/;
        const passRegex = /[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]/;
        if (!email || !pass) {
            alert("이메일과 비밀번호를 입력해주세요.");
            e.preventDefault();
        } else if (pass.length < 8) {
            alert("비밀번호를 8자 이상 입력해주세요.");
            e.preventDefault();
        } else if (!emailRegex.exec(email) || passRegex.exec(pass)) {
            alert("알맞는 이메일 및 비밀번호 형식을 사용해주세요.");
            e.preventDefault();
        } else {
            localStorage["login"] = "true";
            localStorage["email"] = email;
        }
        setLoginTry(true);
    }

    return (
        <main>
            <section className={styles.login}>
                <Image src={"/fingerorder.webp"} alt={"fingerorder"} width={150} height={150} priority />
                <form className={styles.loginForm} onSubmit={login} action="/">
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        pattern="[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-required={loginTry}
                        required={loginTry}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        minLength={8}
                        pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                        onChange={(e) => setPass(e.target.value)}
                        aria-required={loginTry}
                        required={loginTry}
                    />
                    <button onClick={loginKakao} type="submit">
                        <Image
                            src={"/kakao_login.webp"}
                            alt={"kakao_login"}
                            width={240}
                            height={50}
                            className={styles.loginForKakao}
                            priority
                        />
                    </button>
                    <button onClick={loginDefault} type="submit">
                        로그인
                    </button>
                    <button onClick={autoLogin}>자동로그인</button>
                    <div className={styles.loginFormSub}>
                        <Link className={styles.loginFormFunc} href={"/login/findpassword"}>
                            비밀번호 찾기
                        </Link>
                        /
                        <Link className={styles.loginFormFunc} href={"/login/signup"}>
                            회원가입
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    );
}
