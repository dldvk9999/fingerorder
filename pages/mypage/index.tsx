import Link from "next/link";
import styles from "../../styles/Home.module.scss";

export default function Mypage() {
    function printBuyList() {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <div key={"mypage-buylist-" + i}>
                    <div className={styles.mypageVisitStoreName}>가게 이름</div>
                    <div>매장 위치 : xxxxx</div>
                    <div>구매 일자 : 2022.11.24</div>
                    <div className={styles.mypageReviewButton}>
                        <Link href={"/review"}>
                            <button>리뷰</button>
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

    return (
        <main>
            <section className={styles.mypage}>
                <h1>마이 페이지</h1>
                <div className={styles.mypageSub}>
                    <div className={styles.mypageInfo}>
                        <Link href={"/findpassword"}>비밀번호 수정</Link>
                        <button onClick={Withdrawal}>회원 탈퇴</button>
                    </div>
                    <div className={styles.mypageBuyList}>
                        <h2>구매 내역</h2>
                        <div className={styles.mypageBuyListItem}>
                            {printBuyList()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
