import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { homeIntro } from "../../states";
import Modal from "../../components/Modal/Modal";
import LoginCheck from "../common/Login_Check";
import { withdrawal, logout } from "../Login/LoginFunction";
import PrintStoreList from "./MypageStoreList";
import styles from "./Mypage.module.scss";

export default function Mypage() {
    const [isHomeIntro, setHomeIntro] = useRecoilState(homeIntro);
    const [myEmail, setEmail] = useState("");
    const [isKakao, setKakao] = useState(false);
    const [isShowModal, setShowModal] = useState(false);

    // 회원탈퇴에 사용되는 설문 목록
    const qList = [
        "사이트의 디자인이 너무 별로입니다.",
        "사이트 기능이 좋지 않습니다.",
        "제 PC(모바일)에서는 호환이 잘 되지 않습니다.",
        "사이트를 이용할 이유가 없어졌습니다.",
        "사이트가 도움이 되지 않습니다.",
        "문의 해결 과정이 상당히 불편합니다.",
        "기타",
    ];

    // 회원 탈퇴 후 로그아웃
    function exeWithdrawal(pass: string) {
        setShowModal(false);
        withdrawal(pass);
        logout(localStorage["accessToken"] ? localStorage["accessToken"] : "");
    }

    useEffect(() => {
        setEmail(localStorage["email"]);
        setKakao(localStorage["kakao"] == "true" ? true : false);
    }, []);

    return LoginCheck() ? (
        <main>
            <section className={styles.mypage}>
                <h1>마이 페이지</h1>
                <div className={styles.mypageSub}>
                    <div className={styles.mypageInfo}>
                        <div className={styles.mypageMyEmail}>
                            {isKakao && (
                                <svg viewBox="0 0 100 100" height="25" width="25">
                                    <g transform="matrix(1,0,0,-1,-362.26358,234.09895)">
                                        <g clipPath="url(#clipPath692)">
                                            <g transform="translate(163.2612,376.6777)">
                                                <path
                                                    className={styles.mypageKakaoSymbol}
                                                    d="m 248.81039,-143.57875 c -26.953,0 -48.80801,-17.256 -48.80801,-38.555 0,-13.68101 9.05201,-25.69301 22.64601,-32.54901 l -4.599,-17.167 c -0.176,-0.527 -0.03,-1.085 0.352,-1.465 0.263,-0.265 0.614,-0.411 0.995,-0.411 0.294,0 0.586,0.117 0.85,0.322 l 19.775,13.36 c 2.872,-0.41 5.802,-0.644 8.789,-0.644 26.953,0 48.81,17.255 48.81,38.55401 0,21.299 -21.857,38.555 -48.81,38.555"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            )}
                            <h2>{myEmail}</h2>
                        </div>
                        <button
                            className={`${styles.mypageHomeIntro} ${isHomeIntro && styles.mypageHomeIntroActive}`}
                            onClick={() => setHomeIntro(!isHomeIntro)}
                        >
                            홈 인트로 {isHomeIntro ? "ON" : "OFF"}
                        </button>
                        <Link href={"/login/findpassword"} className={styles.mypageChangePassword}>
                            비밀번호 수정
                        </Link>
                        <button onClick={() => setShowModal(true)} className={styles.mypageWithdrawal}>
                            회원 탈퇴
                        </button>
                        {isShowModal && (
                            <Modal
                                h1={"회원탈퇴"}
                                h2={"정말 탈퇴하시겠습니까?"}
                                isCheckbox={true}
                                checkboxList={qList}
                                onClose={() => setShowModal(false)}
                                onAccept={(pass: string) => exeWithdrawal(pass)}
                                cancel={"취소"}
                                accept={"탈퇴"}
                                subChildren={"* 중복도 가능합니다"}
                            >
                                {"✅ 어떤 이유때문인지 설문 부탁드립니다 :)"}
                            </Modal>
                        )}
                    </div>
                    <div className={styles.mypageStoreList}>
                        <h2>나의 매장</h2>
                        <div className={styles.mypageStoreListItem}>{PrintStoreList()}</div>
                    </div>
                </div>
            </section>
        </main>
    ) : null;
}
