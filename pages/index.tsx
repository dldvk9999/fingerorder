import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { data } from "./data";
import styles from "../styles/Home.module.scss";

export default function Home() {
    const [showIntro, setShowIntro] = useState([false, false, false]);
    const path = useRouter();

    // carousel에서 background에 있는 카드 생성
    function compareLayout() {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(
                <div
                    className={styles.homeCompareBackItem}
                    key={"home-compare-" + i}
                >
                    <div>{data[i].name}</div>
                    <div>?</div>
                    <div>{data[i].price}</div>
                </div>
            );
        }
        return result;
    }

    // Intro 부분에 0원 상품 클릭 시 아래로 스크롤
    function scrollDown() {
        document.querySelector("." + styles.homeCompare)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    // 페이지 로드 후에 2초 있다가 Intro의 Height가 짧아지게 하는 함수
    function upIntro() {
        let intro = document.querySelector<HTMLElement>("." + styles.homeInto);
        intro!.style.height = window.innerWidth > 650 ? "70vh" : "50vh";
        intro!.style.paddingTop = "4.4rem";
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

        if (path.pathname === "/") {
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
    }, []);

    return (
        <main className={styles.homeMain}>
            {/* Section 1. */}
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

            {/* Section 2. */}
            <section className={styles.homeWhitebox}>
                <div className={styles.homeWhiteboxBackground}>
                    <div className={styles.homeWhiteboxItems}>
                        <div className={styles.homeWhiteboxLeft}>
                            <div className={styles.homeWhiteboxItem}>
                                <h2>서비스 등록 및 사용자 이용 비용</h2>
                                <div
                                    className={styles.homeWhiteboxItemHighlight}
                                >
                                    무료
                                </div>
                            </div>
                            <div>
                                <svg
                                    className={styles.homeWhiteboxDown}
                                    onClick={scrollDown}
                                    viewBox="0 0 1024 1024"
                                >
                                    <path d="M133.404444 349.108148l365.131852 352.616296c1.232593 1.137778 2.56 2.085926 3.982222 2.939259 7.205926 4.361481 16.592593 3.508148 22.945185-2.56l365.131852-352.616296c7.68-7.395556 7.774815-19.816296 0-27.306667-7.395556-7.205926-19.342222-6.826667-26.737778 0.379259l-351.762963 339.626667c0 0 0 0-0.094815 0L160.047407 322.180741c-7.395556-7.205926-19.342222-7.49037-26.737778-0.379259C125.62963 329.291852 125.724444 341.712593 133.404444 349.108148z" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.homeWhiteboxRight}>
                            <div className={styles.homeWhiteboxItem}>
                                <h2>기기 설치 및 유지보수 비용</h2>
                                <div>1,500,000원 ~</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3. */}
            <section className={styles.homeCompare}>
                <div className={styles.homeCompareBackground}>
                    {compareLayout()}
                </div>
                <div className={styles.homeCompareFront}>
                    <div>핑거오더</div>
                    <div>
                        <Image
                            src={"/fingerorder.webp"}
                            alt={"fingerorder"}
                            width={200}
                            height={200}
                            className={styles.homeCompareFrontImage}
                            loading="lazy"
                        />
                    </div>
                    <div>무료</div>
                </div>
                <p>사장님을 위한 현명한 선택!</p>
            </section>

            {/* Section 4. */}
            <section className={styles.homeStrongth}>
                <div className={styles.homeStrongthCard}>
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
                            <h3>1. 키오스크를 대체 할 수 있습니다.</h3>
                            <p>
                                테이블에 앉아서 키오스크를 대신해 메뉴를 주문할
                                수 있어 기다림이 없고 간편합니다.
                            </p>
                        </li>
                        <li>
                            <h3>2. POS기를 대체 할 수 있습니다.</h3>
                            <p>
                                핑거오더의 결제 시스템을 이용해 테이블에서
                                메뉴를 고르고 선결제를 통해 주문하기 때문에 후불
                                결제를 하지 않아도 됩니다.
                            </p>
                        </li>
                        <li>
                            <h3>3. 비용을 아낄 수 있습니다.</h3>
                            <p>
                                키오스크 비용 최소 100만원과 POS기 비용 최소
                                30만원을 아낄 수 있고 무료로 이용 가능합니다.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 5. */}
            <section className={styles.homeSubmit}>
                <Link href={"/store"}>
                    <div className={styles.homeSubmitButton}>
                        지금 매장 등록하러 가기
                    </div>
                </Link>
            </section>
        </main>
    );
}
