import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import { passwordReset } from "./LoginFunction";
import Img from "../common/Img";
import styles from "./Login.module.scss";

export default function FindPassword() {
    const router = useRouter();
    const { params } = router.query;
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const [uuid, setUuid] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [isSend, setSend] = useState(false);
    const [sendTry, setSendTry] = useState(false);

    useEffect(() => {
        setUuid(params ? params[0] : "");
    }, [params]);

    return (
        <main>
            <section className={styles.login}>
                {Img("fingerorder", 150, 150, `${darkmode ? styles.loginInvert : ""}`)}
                <div className={styles.loginForm}>
                    {!isSend ? (
                        <>
                            <input
                                type="password"
                                placeholder="새로운 비밀번호를 입력해주세요."
                                minLength={8}
                                pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                                className={styles.loginInput}
                                onChange={(e) => setPass1(e.target.value)}
                                aria-required={sendTry}
                                required={sendTry}
                            />
                            <input
                                type="password"
                                placeholder="새로운 비밀번호를 다시 입력해주세요."
                                minLength={8}
                                pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                                className={styles.loginInput}
                                onChange={(e) => setPass2(e.target.value)}
                                aria-required={sendTry}
                                required={sendTry}
                            />
                            <button
                                onClick={() => {
                                    setSend(passwordReset(uuid, pass1, pass2));
                                    setSendTry(true);
                                }}
                            >
                                비밀번호 재설정
                            </button>
                        </>
                    ) : (
                        <p className={styles.findpasswordText}>
                            비밀번호 재설정이 완료되었습니다.
                            <br />
                            재설정한 비밀번호로 다시 로그인해주시기 바랍니다.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
