import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function loginDefault() {
        localStorage["kakao"] = "false";
    }

    function loginKakao() {
        localStorage["kakao"] = "true";
    }

    function login(e: { preventDefault: () => void }) {
        if (!email || !pass) {
            alert("이메일과 비밀번호를 입력해주세요.");
            e.preventDefault();
        } else if (pass.length < 8) {
            alert("비밀번호를 8자 이상 입력해주세요.");
            e.preventDefault();
        } else {
            localStorage["login"] = "true";
            localStorage["email"] = email;
            alert("login function complete");
        }
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
                <form className={styles.loginForm} onSubmit={login} action="/">
                    <input
                        type="email"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        minLength={8}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button onClick={loginKakao} type="submit">
                        <Image
                            src={"/kakao_login.webp"}
                            alt={"kakao_login"}
                            width={240}
                            height={50}
                            priority
                        />
                    </button>
                    <button onClick={loginDefault} type="submit">
                        로그인
                    </button>
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
                </form>
            </section>
        </main>
    );
}
