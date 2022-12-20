import { useEffect, useRef } from "react";
import Menu from "./Menu/Menu";
import Category from "./Category/Category";
import Store from "./Store/Store";
import store from "../../data/store";
import LoginCheck from "../common/Login_Check";
import { useRecoilState } from "recoil";
import { registrationIndex, editNumber } from "../../states";
import styles from "./Registration.module.scss";

export default function Registration() {
    const [editPage, _] = useRecoilState(editNumber);
    const [regiIndex, setRegiIndex] = useRecoilState(registrationIndex);
    const registration = useRef<HTMLDivElement>(null);
    const main = useRef<HTMLElement>(null);

    useEffect(() => {
        setRegiIndex(0);
    }, [registrationIndex]);

    useEffect(() => {
        // 각 Step transform 처리
        registration.current!.style.transform = `translateX(${regiIndex * -100}%)`;

        // 슬라이드로 넘길 때 마다 Y축 스크롤은 항상 위로 스크롤
        main.current!.scrollIntoView({ behavior: "smooth" });
    }, [regiIndex]);

    return LoginCheck() ? (
        <main ref={main}>
            {/* 서비스 등록 Step 표시 */}
            <div className={styles.regiNodeEdge}>
                {[1, 2, 3].map((n) => (
                    <div key={"regi-step-" + (n - 1)}>
                        <div
                            className={`${styles.regiNode} ${regiIndex >= n - 1 && styles.regiNodeActive} ${
                                regiIndex === n - 1 && styles.regiNodeScaleActive
                            }`}
                        >
                            {n}
                        </div>
                        {n !== 3 && (
                            <div className={styles.regiEdgeToRight}>
                                <div className={`${styles.regiEdge} ${regiIndex >= n && styles.regiEdgeActive}`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* 서비스 등록 Body 부분 */}
            <div className={styles.registration} ref={registration}>
                <section className={styles.regiSection}>
                    <Store
                        name={editPage !== -1 ? store[editPage].name : ""}
                        tableCount={editPage !== -1 ? store[editPage].table : 0}
                        tmpTableCount={editPage !== -1 ? store[editPage].table : 0}
                        location={editPage !== -1 ? store[editPage].locate : ""}
                        type={editPage !== -1 ? store[editPage].type : ""}
                    />
                </section>
                <section className={styles.regiSection}>
                    <Category category={editPage !== -1 ? store[editPage].category : []} />
                </section>
                <section className={styles.regiSection}>
                    <Menu />
                </section>
            </div>
        </main>
    ) : null;
}
