import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import Link from "next/link";
import { getStore, deleteStore } from "../Registration/Store/StoreAPI";
import styles from "./Mypage.module.scss";

// 서비스 등록 완료한 매장 목록 출력
export default function PrintStoreList() {
    const [nowStore, setStore] = useState<any>([]);
    const [_, setPage] = useRecoilState(editNumber);

    // 매장 삭제
    function deleteStoreButton(index: number) {
        if (confirm(nowStore[index].storeId + ". " + nowStore[index].name + " 매장을 삭제하시겠습니까?")) {
            setStore(nowStore.slice(0, index).concat(nowStore.slice(index + 1, nowStore.length)));
            deleteStore(nowStore[index].storeId);
            alert("매장을 삭제하였습니다.");
        }
    }

    useEffect(() => {
        // 매장 조회
        async function initStore() {
            const store = await getStore();
            setStore(store.data.data);
        }
        initStore();
    }, []);

    if (nowStore && nowStore.length) {
        return nowStore.map((el: any, i: number) => (
            <div key={"mypage-storelist-" + i}>
                <div className={styles.mypageStoreNameDate}>
                    <span className={styles.mypageStoreName}>
                        {el.storeId}. {el.name}
                    </span>
                    <span className={styles.mypageStoreDate}>최근수정 : {new Date(el.updatedAt).toLocaleString()}</span>
                </div>
                <div className={styles.mypageStoreBody}>{el.location}</div>
                <div className={`${styles.mypageStoreButton} ${styles.mypageStoreButtonUp}`}>
                    <Link
                        href={
                            "/mypage/qrcode/" + el.tableCount + "/" + (el.tableNumber ? "TableNumber" : "OrderNumber")
                        }
                    >
                        <button onClick={() => setPage(el.storeId)}>QR코드</button>
                    </Link>
                    <Link href={"/mypage/review"}>
                        <button onClick={() => setPage(el.storeId)}>리뷰보기</button>
                    </Link>
                    <Link href={"/registration"}>
                        <button onClick={() => setPage(el.storeId)}>수정</button>
                    </Link>
                    <button onClick={() => deleteStoreButton(i)}>삭제</button>
                </div>
                <div className={`${styles.mypageStoreButton} ${styles.mypageStoreButtonDown}`}>
                    <Link href={"/mypage/orderlist"}>
                        <button onClick={() => setPage(el.storeId)}>주문 내역</button>
                    </Link>
                    <Link href={"/mypage/sales"}>
                        <button onClick={() => setPage(el.storeId)}>매출 내역</button>
                    </Link>
                </div>
            </div>
        ));
    } else {
        return (
            <div>
                <p>매장이 존재하지 않습니다.</p>
                <p>서비스 등록을 통해 매장을 추가해주세요.</p>
            </div>
        );
    }
}
