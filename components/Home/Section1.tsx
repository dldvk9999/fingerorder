import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { homeIntro, isDarkmode } from "../../states";
import Img from "../common/Img";
import styles from "./styles/Home_Section1.module.scss";

export default function Home_Section1() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const [isHomeIntro] = useRecoilState(homeIntro);
    const [showIntro, setShowIntro] = useState([false, false, false]);
    const homeInto = useRef<HTMLElement>(null);

    // 페이지 로드 후에 2초 있다가 Intro의 Height가 짧아지게 하는 함수
    function upIntro() {
        homeInto.current!.style.height = window.innerWidth > 650 ? "70vh" : "50vh";
        homeInto.current!.style.paddingTop = "4.4rem";
    }

    useEffect(() => {
        if (isHomeIntro) {
            // Intro 텍스트 순차적 slide 처리
            setTimeout(() => {
                window.scrollTo(0, 0);
                setShowIntro([true, false, false]); // Logo Slide
            }, 100);
            setTimeout(() => {
                setShowIntro([true, true, false]); // "더 빠르게! 더 간편하게!" Slide
            }, 500);
            setTimeout(() => {
                setShowIntro([true, true, true]); // 키오스크를 대신할 새로운 플랫폼 Slide
            }, 1000);

            setTimeout(() => {
                upIntro();
            }, 2000);

            // Home 화면 접근 시 UI slide in 처리
            if (Router.pathname === "/") {
                document.documentElement.style.overflowY = "hidden";
                let header = document.querySelector<HTMLElement>("header");
                header!.style.opacity = "0";
                header!.style.transform = "translateY(-4.4rem)";

                setTimeout(() => {
                    header!.style.opacity = "1";
                    header!.style.transform = "translateY(0)";
                    document.documentElement.style.overflowY = "overlay";
                }, 2000);
            }
        } else {
            window.scrollTo(0, 0);
            setShowIntro([true, true, true]);
            upIntro();
        }
    }, [isHomeIntro]);

    return (
        <section className={styles.homeInto} ref={homeInto}>
            {Img(
                "fingerorder",
                200,
                200,
                `${styles.homeIntroImage} ${showIntro[0] && styles.homeShow1} ${
                    darkmode ? styles.homeIntroImageInvert : ""
                }`
            )}
            <div className={styles.homeIntroSub}>
                <p className={`${styles.homeIntroP} ${showIntro[1] && styles.homeShow2}`}>
                    더 <span>빠르게!</span> 더 <span>간편하게!</span>
                </p>
                <h1 className={`${styles.homeIntroH1} ${showIntro[2] && styles.homeShow3}`}>
                    키오스크를 대신할 새로운 <span>플랫폼</span>
                </h1>
            </div>
        </section>
    );
}
