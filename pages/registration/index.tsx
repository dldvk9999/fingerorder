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

    useEffect(() => {
        setRegiIndex(0);
    }, []);

    useEffect(() => {
        let node = document.querySelector<HTMLElement>("." + styles.registration);
        node!.style.transform = `translateX(${regiIndex * -100}%)`;
    }, [regiIndex]);

    return LoginCheck() ? (
        <main>
            {/* 서비스 등록 Step 표시 */}
            <div className={styles.regiNodeEdge}>
                <div>
                    <div className={`${styles.regiNode} ${styles.regiNodeActive}`}>1</div>
                    <div className={styles.regiEdgeToRight}>
                        <div className={`${styles.regiEdge} ${regiIndex >= 1 && styles.regiEdgeActive}`} />
                    </div>
                    <div className={`${styles.regiNode} ${regiIndex >= 1 && styles.regiNodeActive}`}>2</div>
                    <div className={styles.regiEdgeToRight}>
                        <div className={`${styles.regiEdge} ${regiIndex >= 2 && styles.regiEdgeActive}`} />
                    </div>
                    <div className={`${styles.regiNode} ${regiIndex >= 2 && styles.regiNodeActive}`}>3</div>
                </div>
            </div>
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
