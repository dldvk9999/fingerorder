import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function FindPassword() {
    const [email, setEmail] = useState("");
    const [isSend, setSend] = useState(false);

    function emailSend(e: { preventDefault: () => void }) {
        if (email === "") {
            alert("이메일을 입력해주세요.");
        } else {
            setSend(true);
            alert("email send function complete");
        }
        e.preventDefault();
    }

    return (
        <main>
            <section className={styles.login}>
                <Image
                    src={"/fingerorder.webp"}
                    alt={"fingerorder"}
                    width={150}
                    height={150}
                />
                <form
                    className={styles.loginForm}
                    onSubmit={emailSend}
                    action="/"
                >
                    {!isSend ? (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.loginInput}
                                onChange={(e) => setEmail(e.target.value)}
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
