import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { openNav, closeNav, RouterList, RouterListLogin } from "./HeaderRouter";
import { useRecoilState } from "recoil";
import { isDarkmode, editNumber, grantType } from "../../states";
import Img from "../common/Img";
import styles from "./Header.module.scss";

export default function Header() {
    const [darkmode, setDarkmode] = useRecoilState<boolean>(isDarkmode);
    const [_, setEditPage] = useRecoilState(editNumber);
    const [__, setGrant] = useRecoilState(grantType);
    const [isLogin, setLogin] = useState(false);
    const [isMobile, setMobile] = useState(false);
    const nav = useRef<HTMLElement>(null);

    // 다크모드 아이콘 출력
    function printDarkmode() {
        return (
            <button
                className={styles.headerDarkmode}
                onClick={() => {
                    setDarkmode(!darkmode);
                    localStorage["theme"] = !(localStorage["theme"] === "true");
                }}
                aria-label="Darkmode Switch"
            >
                <svg
                    viewBox="0 0 24 24"
                    className={`${!darkmode ? styles.headerDarkmodeSunActive : styles.headerDarkmodeSunInactive}`}
                >
                    <title>Darkmode OFF</title>
                    <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"></path>
                </svg>
                <svg
                    viewBox="0 0 24 24"
                    className={`${darkmode ? styles.headerDarkmodeMoonActive : styles.headerDarkmodeMoonInactive}`}
                >
                    <title>Darkmode ON</title>
                    <path d="M20.6144 14.6145C19.787 14.8653 18.9093 15.0001 18 15.0001C13.0294 15.0001 9 10.9707 9 6.00013C9 5.09088 9.13484 4.21311 9.3856 3.38574C5.69007 4.50583 3 7.93883 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.0613 21.0001 19.4943 18.3101 20.6144 14.6145Z"></path>
                </svg>
            </button>
        );
    }

    useEffect(() => {
        // 로그인 체크(추후 함수 구현)
        setLogin(localStorage["login"] == "true" ? true : false);

        // 다크모드 localStorage 체크
        if (localStorage["theme"]) setDarkmode(localStorage["theme"] === "true");
        else {
            localStorage["theme"] = false;
            setDarkmode(localStorage["theme"]);
        }

        // prefers-color-scheme의 변경을 감지하여 다크모드 변경
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            setDarkmode(event.matches);
            localStorage["theme"] = event.matches;
        });

        // innerWidth가 800px 이하일때만 nav를 렌더링함
        // onresize를 사용하여 override하면 home에서 또 override해서 덮어써지면서 작동이 안돼 addEventListener로 대체
        setMobile(window.innerWidth < 800);
        window.addEventListener("resize", () => setMobile(window.innerWidth < 800));

        return () => {
            window.removeEventListener("resize", () => setMobile(window.innerWidth < 800));
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", (event) => {
                localStorage["theme"] = event.matches;
            });
        };
    }, []);

    useEffect(() => {
        document.body.setAttribute("class", darkmode ? "dark" : "light");
    }, [darkmode]);

    return (
        <header>
            <div className={styles.headerLeft}>
                <Link href={"/"}>
                    <div className={styles.headerLogo}>
                        {Img("fingerorder", 30, 30, darkmode ? styles.headerLogoInvert : "")}
                        <div className={styles.headerLogoText}>
                            <div>FINGER</div>
                            <div>ORDER</div>
                        </div>
                    </div>
                </Link>
                {!isMobile && <div className={styles.headerItems}>{RouterList(nav, "header", setEditPage)}</div>}
            </div>

            {!isMobile ? (
                <div className={`${styles.headerRight} ${styles.headerItems}`}>
                    {printDarkmode()}
                    {isLogin ? (
                        RouterListLogin(nav, "header", darkmode, setGrant)
                    ) : (
                        <Link href={"/login"}>
                            <div>로그인</div>
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.headerMobileMenu}>
                        {printDarkmode()}
                        <button onClick={() => openNav(nav)} aria-label="menu">
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke={darkmode ? "white" : ""}
                                fill={darkmode ? "white" : ""}
                            >
                                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
                            </svg>
                        </button>
                    </div>

                    <nav ref={nav} aria-label="네비게이션 메뉴">
                        <div className={styles.headerNavClose}>
                            <button onClick={() => closeNav(nav)} aria-label="navigation close button">
                                <svg
                                    viewBox="0 0 120.64 122.88"
                                    width="17"
                                    height="17"
                                    stroke={darkmode ? "white" : ""}
                                    fill={darkmode ? "white" : ""}
                                >
                                    <path d="M66.6,108.91c1.55,1.63,2.31,3.74,2.28,5.85c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12c-1.58,1.5-3.6,2.23-5.61,2.2 c-2.01-0.03-4.02-0.82-5.55-2.37C37.5,102.85,20.03,84.9,2.48,67.11c-0.07-0.05-0.13-0.1-0.19-0.16C0.73,65.32-0.03,63.19,0,61.08 c0.03-2.11,0.85-4.21,2.45-5.8l0.27-0.26C20.21,37.47,37.65,19.87,55.17,2.36C56.71,0.82,58.7,0.03,60.71,0 c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76c0.03,2.1-0.73,4.22-2.28,5.85L19.38,61.23L66.6,108.91 L66.6,108.91z M118.37,106.91c1.54,1.62,2.29,3.73,2.26,5.83c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12 c-1.57,1.5-3.6,2.23-5.61,2.21c-2.01-0.03-4.02-0.82-5.55-2.37C89.63,101.2,71.76,84.2,54.24,67.12c-0.07-0.05-0.14-0.11-0.21-0.17 c-1.55-1.63-2.31-3.76-2.28-5.87c0.03-2.11,0.85-4.21,2.45-5.8C71.7,38.33,89.27,21.44,106.8,4.51l0.12-0.13 c1.53-1.54,3.53-2.32,5.54-2.35c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76 c0.03,2.1-0.73,4.22-2.28,5.85L71.17,61.23L118.37,106.91L118.37,106.91z" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.headerNavList}>
                            <div>
                                {RouterList(nav, "nav", setEditPage)}
                                <hr />
                                {isLogin ? (
                                    RouterListLogin(nav, "nav", darkmode, setGrant)
                                ) : (
                                    <Link href={"/login"} onClick={() => closeNav(nav)}>
                                        로그인
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </header>
    );
}
