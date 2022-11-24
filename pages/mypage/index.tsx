import Link from "next/link";
import { useState } from "react";
import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Mypage() {
    const [nickname, setNickname] = useState("닉네임");

    function changeNickname() {
        if (confirm(nickname + "으로 변경하시겠습니까?"))
            alert(nickname + "으로 변경 완료되었습니다.");
    }

    // 구매 매장 목록 출력
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

    return LoginCheck() ? (
        <main>
            <section className={styles.mypage}>
                <h1>마이 페이지</h1>
                <div className={styles.mypageSub}>
                    <div className={styles.mypageInfo}>
                        <div className={styles.mypageInfoInput}>
                            <input
                                type="text"
                                placeholder={nickname}
                                onChange={(e) =>
                                    setNickname(
                                        e.target.value !== ""
                                            ? e.target.value
                                            : "닉네임"
                                    )
                                }
                                className={styles.mypageNickname}
                            />
                            <button
                                className={styles.mypageChangeInfo}
                                onClick={changeNickname}
                            >
                                수정
                            </button>
                        </div>
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
                        <h2>구매 내역</h2>
                        <div className={styles.mypageBuyListItem}>
                            {printBuyList()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ) : null;
}
