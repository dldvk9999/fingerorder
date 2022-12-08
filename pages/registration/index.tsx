import { useEffect } from "react";
import Menu from "../menu";
import Category from "../category";
import Store from "../store";
import store from "../../data/store";
import LoginCheck from "../login_check";
import { useRecoilState } from "recoil";
import { registrationIndex, editNumber } from "../../states";
import styles from "../../styles/pages/Registration.module.scss";

export default function Registration() {
    const [editPage, _] = useRecoilState(editNumber);
    const [regiIndex, setRegiIndex] = useRecoilState(registrationIndex);

    function printStep() {
        let result = [];
        for (let i = 0; i < 3; i++) {
            result.push(
                <div key={"regi-step-" + i}>
                    <div
                        className={`${styles.regiNode} ${styles.regiNodeActive} ${
                            regiIndex === i && styles.regiNodeScaleActive
                        }`}
                    >
                        {i + 1}
                    </div>
                    {i !== 2 && (
                        <div className={styles.regiEdgeToRight}>
                            <div className={`${styles.regiEdge} ${regiIndex >= i + 1 && styles.regiEdgeActive}`} />
                        </div>
                    )}
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        setRegiIndex(0);
    }, []);

    useEffect(() => {
        // 각 Step transform 처리
        let step = document.querySelector<HTMLElement>("." + styles.registration);
        step!.style.transform = `translateX(${regiIndex * -100}%)`;

        // 슬라이드로 넘길 때 마다 Y축 스크롤은 항상 위로 스크롤
        document.querySelector("main")?.scrollIntoView({
            behavior: "smooth",
        });
    }, [regiIndex]);

    return LoginCheck() ? (
        <main>
            {/* 서비스 등록 Step 표시 */}
            <div className={styles.regiNodeEdge}>{printStep()}</div>
            {/* 서비스 등록 Body 부분 */}
            <div className={styles.registration}>
                <section className={styles.regiSection}>
                    <Store
                        auth
                        name={editPage !== -1 ? store[editPage].name : ""}
                        tableCount={editPage !== -1 ? store[editPage].table : 0}
                        tmpTableCount={editPage !== -1 ? store[editPage].table : 0}
                        location={editPage !== -1 ? store[editPage].locate : ""}
                        type={editPage !== -1 ? store[editPage].type : ""}
                    />
                </section>
                <section className={styles.regiSection}>
                    <Category auth category={editPage !== -1 ? store[editPage].category : []} />
                </section>
                <section className={styles.regiSection}>
                    <Menu auth />
                </section>
            </div>
        </main>
    ) : null;
}
