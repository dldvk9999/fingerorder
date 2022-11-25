import Link from "next/link";
import review from "../../data/review";
import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Mypage() {
    // 구매 매장 목록 출력
    function printBuyList() {
        let result = [];
        for (let i = 0; i < review.length; i++) {
            result.push(
                <div key={"mypage-buylist-" + i}>
                    <div>
                        <span className={styles.mypageReviewName}>
                            {review[i].type === 1 ? "매장 리뷰" : "메뉴 좋아요"}
                        </span>
                        <span className={styles.mypageReviewDate}>
                            {review[i].date}
                        </span>
                    </div>
                    <div className={styles.mypageReviewBody}>
                        {review[i].type === 1 ? "" : "메뉴 : "}
                        {review[i].type === 1
                            ? review[i].comment
                            : review[i].menu}
                    </div>
                    {review[i].type === 1 && (
                        <div className={styles.mypageReviewButton}>
                            <Link href={"/review"}>
                                <button>답글달기</button>
                            </Link>
                        </div>
                    )}
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
                            href={"/changestore"}
                            className={styles.mypageChangePassword}
                        >
                            매장 수정
                        </Link>
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
                    <div className={styles.mypageBuyList}>
                        <h2>리뷰 내역</h2>
                        <div className={styles.mypageBuyListItem}>
                            {printBuyList()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ) : null;
}
