import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function login() {
        localStorage["login"] = "true";
        alert("login function complete");
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
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <div className={styles.loginFormSub}>
                        <Link
                            className={styles.loginFormFunc}
                            href={"/findpassword"}
                        >
                            비밀번호 찾기
                        </Link>
                        /
                        <Link className={styles.loginFormFunc} href={"/signup"}>
                            회원가입
                        </Link>
                    </div>
                    <button type="submit" onClick={login}>
                        로그인
                    </button>
                </form>
            </section>
        </main>
    );
}
