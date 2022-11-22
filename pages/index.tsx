import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
    const [showIntro, setShowIntro] = useState([false, false, false]);

    // Intro 부분에 0원 상품 클릭 시 아래로 스크롤
    function scrollDown() {
        document.querySelector("." + styles.homeEtc)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    // 페이지 로드 후에 2초 있다가 Intro의 Height가 짧아지게 하는 함수
    function upIntro() {
        let intro = document.querySelector<HTMLElement>("." + styles.homeInto);
        intro!.style.height =
            window.innerWidth > 650
                ? "calc(60vh - 4.4rem)"
                : "calc(30vh - 4.4rem)";
    }

    // Images의 Image들을 slide-in 시키는 함수
    function showImages() {
        let images = document.querySelectorAll<HTMLElement>(
            "." + styles.homeImage
        );
        images[0].style.transform = "translateX(0%)";
        images[1].style.transform = "translateX(0%)";
    }

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            setShowIntro([true, false, false]);
        }, 100);
        setTimeout(() => {
            setShowIntro([true, true, false]);
        }, 500);
        setTimeout(() => {
            setShowIntro([true, true, true]);
        }, 1000);
        setTimeout(() => {
            upIntro();
        }, 2000);
        setTimeout(() => {
            showImages();
        }, 2200);
    }, []);

    return (
        <main>
            <section className={styles.homeInto}>
                <Image
                    src={"/fingerorder.webp"}
                    alt={"fingerorder"}
                    width={200}
                    height={200}
                    className={`${styles.homeIntroImage} ${
                        showIntro[0] && styles.homeShow1
                    }`}
                    priority
                />
                <div className={styles.homeIntroSub}>
                    <p
                        className={`${styles.homeIntroP} ${
                            showIntro[1] && styles.homeShow2
                        }`}
                    >
                        더 <span>빠르게!</span> 더 <span>간편하게!</span>
                    </p>
                    <h1
                        className={`${styles.homeIntroH1} ${
                            showIntro[2] && styles.homeShow3
                        }`}
                    >
                        키오스크를 대신할 새로운 <span>플랫폼</span>
                    </h1>
                </div>
            </section>

            <section className={styles.homeImg}>
                <h2>어떤 것을 선택하시겠습니까?</h2>
                <div className={styles.homeImages}>
                    <Image
                        src={"/home/touch.webp"}
                        alt={"touch"}
                        width={300}
                        height={300}
                        className={styles.homeImage}
                        loading="lazy"
                    />
                    <div
                        className={`${styles.homeImageText} ${styles.homeImageLeft}`}
                        onClick={scrollDown}
                    >
                        <div className={styles.homeImageTextTitle}>
                            서비스 등록 및 사용자 이용 비용
                        </div>
                        <div className={styles.homeImageTextPrice}>0원</div>
                    </div>
                    <Image
                        src={"/home/kiosk.webp"}
                        alt={"kiosk"}
                        width={300}
                        height={300}
                        className={styles.homeImage}
                        loading="lazy"
                    />
                    <div
                        className={`${styles.homeImageText} ${styles.homeImageRight}`}
                    >
                        <div className={styles.homeImageTextTitle}>
                            기기 설치 및 유지보수 비용
                        </div>
                        <div className={styles.homeImageTextPrice2}>
                            2,000,000원 ~
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.homeEtc}>여백</section>
        </main>
    );
}
