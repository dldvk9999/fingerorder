import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function FindPassword() {
    const [email, setEmail] = useState("");
    const [isSend, setSend] = useState(false);
    const [sendTry, setSendTry] = useState(false);

    function emailSend(e: { preventDefault: () => void }) {
        const emailRegex = /[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$/;
        if (!email) alert("이메일을 입력해주세요.");
        else if (!emailRegex.exec(email)) alert("알맞는 이메일 형식을 사용해주세요.");
        else setSend(true);
        setSendTry(true);
        e.preventDefault();
    }

    return (
        <main>
            <section className={styles.login}>
                <Image src={"/fingerorder.webp"} alt={"fingerorder"} width={150} height={150} priority />
                <form className={styles.loginForm} onSubmit={emailSend} action="/">
                    {!isSend ? (
                        <>
                            <input
                                type="email"
                                placeholder="이메일을 입력해주세요."
                                pattern="[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$"
                                className={styles.loginInput}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-required={sendTry}
                                required={sendTry}
                            />
                            <button type="submit">이메일 전송</button>
                        </>
                    ) : (
                        <p className={styles.findpasswordText}>
                            이메일로 초기화 링크가 전송되었습니다.
                            <br />
                            링크에 접속하여 초기화 부탁드립니다.
                        </p>
                    )}
                </form>
            </section>
        </main>
    );
}
