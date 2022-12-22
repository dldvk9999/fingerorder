import Link from "next/link";
import { logout } from "../Login/LoginFunction";
import Img from "../common/Img";
import styles from "./Header.module.scss";

const router = [["registration", "서비스 등록"]];
const routerLogin = [
    ["order", "주문목록"],
    ["", "로그아웃"],
    ["mypage", "마이페이지"],
];

// nav open
export function openNav(nav: any) {
    nav.current!.classList.add("active");
}

// nav close
export function closeNav(nav: any) {
    nav.current!.classList.remove("active");
}

// router 가능한 주소 목록 (재사용 가능 함수)
export function RouterList(nav: any, printWhere: string, setEdit: Function) {
    // router click event
    function routerClickEvent(nav: any, printWhere: string) {
        if (printWhere === "nav") closeNav(nav);
        setEdit(-1);
    }

    return router.map((el, i) => (
        <Link href={"/" + el[0]} onClick={() => routerClickEvent(nav, printWhere)} key={"header-router-" + i}>
            {el[1]}
        </Link>
    ));
}

// 로그인 후 접근 가능한 주소 목록 (재사용 가능 함수)
export function RouterListLogin(nav: any, printWhere: string, darkmode: boolean) {
    return routerLogin.map((el, i) => (
        <Link
            href={"/" + el[0]}
            onClick={async () => {
                printWhere === "nav" && closeNav(nav);
                el[0] === "" && (await logout(localStorage["accessToken"] ? localStorage["accessToken"] : ""));
            }}
            key={"header-login-profile-" + i}
        >
            {i === routerLogin.length - 1 && printWhere !== "nav" ? (
                Img("profile", 40, 40, `${styles.headerProfile} ${darkmode ? styles.headerLogoInvert : ""}`)
            ) : (
                <>{el[1]}</>
            )}
        </Link>
    ));
}
