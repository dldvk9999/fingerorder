import Link from "next/link";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import store from "../../data/store";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Mypage.module.scss";
import { useEffect, useState } from "react";

export default function Mypage() {
    const [_, setPage] = useRecoilState(editNumber);
    const [myEmail, setEmail] = useState("");
    const [isKakao, setKakao] = useState(false);

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
                        <Link href={"/qrcode"}>
                            <button onClick={() => setPage(i)}>QR코드</button>
                        </Link>
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

    useEffect(() => {
        setEmail(localStorage["email"]);
        setKakao(localStorage["kakao"] === "true" ? true : false);
    }, []);

    return LoginCheck() ? (
        <main>
            <section className={styles.mypage}>
                <h1>마이 페이지</h1>
                <div className={styles.mypageSub}>
                    <div className={styles.mypageInfo}>
                        <div className={styles.mypageMyEmail}>
                            {isKakao && (
                                <svg
                                    viewBox="0 0 100 100"
                                    height="25"
                                    width="25"
                                >
                                    <g transform="matrix(1,0,0,-1,-362.26358,234.09895)">
                                        <g clipPath="url(#clipPath692)">
                                            <g transform="translate(163.2612,376.6777)">
                                                <path
                                                    className={
                                                        styles.mypageKakaoSymbol
                                                    }
                                                    d="m 248.81039,-143.57875 c -26.953,0 -48.80801,-17.256 -48.80801,-38.555 0,-13.68101 9.05201,-25.69301 22.64601,-32.54901 l -4.599,-17.167 c -0.176,-0.527 -0.03,-1.085 0.352,-1.465 0.263,-0.265 0.614,-0.411 0.995,-0.411 0.294,0 0.586,0.117 0.85,0.322 l 19.775,13.36 c 2.872,-0.41 5.802,-0.644 8.789,-0.644 26.953,0 48.81,17.255 48.81,38.55401 0,21.299 -21.857,38.555 -48.81,38.555"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            )}
                            <h2>{myEmail}</h2>
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
