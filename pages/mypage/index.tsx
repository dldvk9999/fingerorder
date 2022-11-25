import Link from "next/link";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import store from "../../data/store";
import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Mypage() {
    const [_, setPage] = useRecoilState(editNumber);

    // 구매 매장 목록 출력
    function printStoreList() {
        let result = [];
        for (let i = 0; i < store.length; i++) {
            result.push(
                <div key={"mypage-storelist-" + i}>
                    <div className={styles.mypageStoreNameDate}>
                        <span className={styles.mypageStoreName}>
                            {store[i].id}. {store[i].name}
                        </span>
                        <span className={styles.mypageStoreDate}>
                            최근수정 : {store[i].date}
                        </span>
                    </div>
                    <div className={styles.mypageStoreBody}>
                        {store[i].locate}
                    </div>
                    <div className={styles.mypageStoreButton}>
                        <Link href={"/review"}>
                            <button onClick={() => setPage(i)}>리뷰보기</button>
                        </Link>
                        <Link href={"/changestore"}>
                            <button onClick={() => setPage(i)}>수정</button>
                        </Link>
                    </div>
                </div>
            );
        }
        return result;
    }

    // sample withdrawal
    function Withdrawal() {
        alert("withdrawal is complete");
    }

    return LoginCheck() ? (
        <main>
            <section className={styles.mypage}>
                <h1>마이 페이지</h1>
                <div className={styles.mypageSub}>
                    <div className={styles.mypageInfo}>
                        <Link
                            href={"/findpassword"}
                            className={styles.mypageChangePassword}
                        >
                            비밀번호 수정
                        </Link>
                        <button
                            onClick={Withdrawal}
                            className={styles.mypageWithdrawal}
                        >
                            회원 탈퇴
                        </button>
                    </div>
                    <div className={styles.mypageStoreList}>
                        <h2>나의 매장</h2>
                        <div className={styles.mypageStoreListItem}>
                            {printStoreList()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ) : null;
}
