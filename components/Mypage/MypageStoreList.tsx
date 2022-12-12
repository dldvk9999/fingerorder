import { useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import Link from "next/link";
import store from "../../data/store";
import styles from "./Mypage.module.scss";

// 서비스 등록 완료한 매장 목록 출력
export default function PrintStoreList() {
    const [nowStore, setStore] = useState(store);
    const [_, setPage] = useRecoilState(editNumber);

    // 매장 삭제
    function deleteStore(index: number) {
        if (confirm(nowStore[index].id + ". " + nowStore[index].name + " 매장을 삭제하시겠습니까?")) {
            setStore(nowStore.slice(0, index).concat(nowStore.slice(index + 1, nowStore.length)));
            alert("매장을 삭제하였습니다.");
        }
    }

    let result = [];
    for (let i = 0; i < nowStore.length; i++) {
        result.push(
            <div key={"mypage-storelist-" + i}>
                <div className={styles.mypageStoreNameDate}>
                    <span className={styles.mypageStoreName}>
                        {nowStore[i].id}. {nowStore[i].name}
                    </span>
                    <span className={styles.mypageStoreDate}>최근수정 : {nowStore[i].date}</span>
                </div>
                <div className={styles.mypageStoreBody}>{nowStore[i].locate}</div>
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
                    <button onClick={() => deleteStore(i)}>삭제</button>
                </div>
            </div>
        );
    }
    return result;
}
