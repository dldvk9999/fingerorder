import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import Link from "next/link";
import store from "../../data/store";
import { getStore, deleteStore } from "../Registration/Store/StoreFunction";
import styles from "./Mypage.module.scss";

// 서비스 등록 완료한 매장 목록 출력
export default function PrintStoreList() {
    const [nowStore, setStore] = useState<any>([]);
    const [_, setPage] = useRecoilState(editNumber);

    // 매장 삭제
    function deleteStoreButton(index: number) {
        if (confirm(nowStore[index].id + ". " + nowStore[index].name + " 매장을 삭제하시겠습니까?")) {
            setStore(nowStore.slice(0, index).concat(nowStore.slice(index + 1, nowStore.length)));
            deleteStore(index);
            alert("매장을 삭제하였습니다.");
        }
    }

    useEffect(() => {
        // 매장 조회
        const apiStore = getStore();
        setStore(Object.keys(apiStore).length ? apiStore : store);
    }, []);

    return nowStore.map((el: any, i: number) => (
        <div key={"mypage-storelist-" + i}>
            <div className={styles.mypageStoreNameDate}>
                <span className={styles.mypageStoreName}>
                    {el.id}. {el.name}
                </span>
                <span className={styles.mypageStoreDate}>최근수정 : {el.date}</span>
            </div>
            <div className={styles.mypageStoreBody}>{el.locate}</div>
            <div className={styles.mypageStoreButton}>
                <Link href={"/mypage/qrcode"}>
                    <button onClick={() => setPage(i)}>QR코드</button>
                </Link>
                <Link href={"/mypage/review"}>
                    <button onClick={() => setPage(i)}>리뷰보기</button>
                </Link>
                <Link href={"/registration"}>
                    <button onClick={() => setPage(i)}>수정</button>
                </Link>
                <button onClick={() => deleteStoreButton(i)}>삭제</button>
            </div>
        </div>
    ));
}
