import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    function signup() {
        alert("signup function complete");
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
                <form className={styles.loginForm} action="/">
                    <input
                        type="email"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => setPass1(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        onChange={(e) => setPass2(e.target.value)}
                    />
                    <Link href={"/login"}>
                        <button type="submit" onClick={signup}>
                            회원가입
                        </button>
                    </Link>
                </form>
            </section>
        </main>
    );
}
