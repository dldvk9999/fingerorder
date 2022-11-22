import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
    const [showIntro, setShowIntro] = useState([false, false, false]);

    // Intro 부분에 0원 상품 클릭 시 아래로 스크롤
    function scrollDown() {
        document.querySelector("." + styles.homeStrongth)?.scrollIntoView({
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
                            1,500,000원 ~
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.homeStrongth}>
                <div className={styles.homeStrongthSub}>
                    <Image
                        src={"/fingerorder.webp"}
                        alt={"fingerorder"}
                        width={200}
                        height={200}
                        className={styles.homeStrongthLogo}
                        loading="lazy"
                    />
                    <h2>핑거오더의 장점</h2>
                </div>
                <ul className={styles.homeStrongthSub}>
                    <li>
                        <h3>1. 키오스크를 대체 할 수 있다.</h3>
                        <p>
                            테이블에 앉아서 키오스크를 대신해 메뉴를 주문할 수
                            있어 기다림이 없고 간편하다.
                        </p>
                    </li>
                    <li>
                        <h3>2. POS기를 대체 할 수 있다.</h3>
                        <p>
                            핑거오더의 결제 시스템을 이용해 테이블에서 메뉴를
                            고르고 선결제를 통해 주문하기 때문에 후불 결제를
                            하지 않아도 된다.
                        </p>
                    </li>
                    <li>
                        <h3>3. 비용을 아낄 수 있다.</h3>
                        <p>
                            키오스크 비용 최소 100만원과 POS기 비용 최소
                            30만원을 아낄 수 있고 무료로 이용 가능하다.
                        </p>
                    </li>
                </ul>
            </section>

            <section className={styles.homeSubmit}>
                <div className={styles.homeSubmitButton}>
                    <Link href={"/store"}>지금 매장 등록하러 가기</Link>
                </div>
            </section>
        </main>
    );
}
