import Img from "../common/Img";
import Link from "next/link";
import { useState } from "react";
import { LoginDefault, LoginKakao, autoLogin, login } from "./LoginFunction";
import styles from "./Login.module.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loginTry, setLoginTry] = useState(false);

    return (
        <main>
            <section className={styles.login}>
                {Img("fingerorder", 150, 150)}
                <form
                    className={styles.loginForm}
                    onSubmit={(e) => {
                        login(email, pass, e);
                        setLoginTry(true);
                    }}
                    action="/"
                >
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        pattern="[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-required={loginTry}
                        required={loginTry}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        minLength={8}
                        pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                        onChange={(e) => setPass(e.target.value)}
                        aria-required={loginTry}
                        required={loginTry}
                    />
                    <button onClick={LoginKakao} type="submit">
                        {Img("sample_menu/kakao_login", 240, 50, styles.loginForKakao)}
                    </button>
                    <button onClick={LoginDefault} type="submit">
                        로그인
                    </button>
                    <button onClick={autoLogin}>자동로그인</button>
                    <div className={styles.loginFormSub}>
                        <Link className={styles.loginFormFunc} href={"/login/findpassword"}>
                            비밀번호 찾기
                        </Link>
                        /
                        <Link className={styles.loginFormFunc} href={"/login/signup"}>
                            회원가입
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    );
}
