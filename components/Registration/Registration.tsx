import { useEffect, useRef, useState } from "react";
import Menu from "./Menu/Menu";
import Category from "./Category/Category";
import Store from "./Store/Store";
import LoginCheck from "../common/Login_Check";
import { useRecoilState } from "recoil";
import { registrationIndex, editNumber } from "../../states";
import { getStore } from "./Store/StoreAPI";
import styles from "./Registration.module.scss";
import { getCategory } from "./Category/CategoryAPI";

export default function Registration() {
    const [editPage, _] = useRecoilState(editNumber);
    const [regiIndex, setRegiIndex] = useRecoilState(registrationIndex);
    const [storeList, setStoreList] = useState<any>({
        name: "",
        table: 0,
        locate: "",
        type: "",
    });
    const [categoryList, setCategoryList] = useState([]);
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

    useEffect(() => {
        async function initStore() {
            const result = await getStore();
            setStoreList(result.data.data.filter((el: { storeId: number }) => el.storeId === editPage)[0]);
        }
        initStore();

        async function initCategory() {
            const result = await getCategory(editPage);
            setCategoryList(result.data.names);
        }
        initCategory();
    }, [editPage]);

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
                        name={editPage !== -1 ? storeList && storeList.name : ""}
                        tableCount={editPage !== -1 ? storeList && storeList.tableCount : 0}
                        tmpTableCount={editPage !== -1 ? storeList && storeList.tableCount : 0}
                        location={editPage !== -1 ? storeList && storeList.location : ""}
                        type={
                            editPage !== -1 ? storeList && (storeList.orderNumber ? "OrderNumber" : "TableNumber") : ""
                        }
                    />
                </section>
                <section className={styles.regiSection}>
                    <Category category={editPage !== -1 ? categoryList : []} />
                </section>
                <section className={styles.regiSection}>
                    <Menu />
                </section>
            </div>
        </main>
    ) : null;
}
