import styles from "./styles/Home_Section2.module.scss";

export default function Home_Section2() {
    // WhiteBox 부분에 아래 화살표 클릭 시 아래로 스크롤
    function scrollDown() {
        let compare = document.querySelector<HTMLElement>("#compare");
        compare?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className={styles.homeWhitebox}>
            <div className={styles.homeWhiteboxBackground}>
                <div className={styles.homeWhiteboxItems}>
                    <div className={styles.homeWhiteboxLeft}>
                        <div className={styles.homeWhiteboxItem}>
                            <h2>서비스 등록 및 사용자 이용 비용</h2>
                            <div className={styles.homeWhiteboxItemHighlight}>무료</div>
                        </div>
                        <div>
                            <svg className={styles.homeWhiteboxDown} onClick={scrollDown} viewBox="0 0 1024 1024">
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
    );
}
