import Img from "../common/Img";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import { LoginDefault, LoginKakao, autoLogin, login } from "./LoginFunction";
import styles from "./Login.module.scss";

export default function Login() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loginTry, setLoginTry] = useState(false);
    const [loginAPI, setLoginAPI] = useState(false);
    const [loginResult, setLoginResult] = useState(false);
    const [loginData, setLoginData] = useState<any>(false);

    return (
        <main>
            <section className={styles.login}>
                {Img("fingerorder", 150, 150, `${darkmode ? styles.loginInvert : ""}`)}
                <div className={styles.loginForm}>
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
                    {loginAPI && <p>{loginData.message}</p>}
                    <button onClick={LoginKakao} type="submit">
                        {Img("sample_menu/kakao_login", 240, 50, styles.loginForKakao)}
                    </button>
                    <button
                        onClick={async (e) => {
                            LoginDefault();
                            const result = (await login(email, pass, e)) as any;
                            console.log(result);
                            setLoginAPI(result.api);
                            if (result.api) {
                                setLoginResult(result.result);
                                setLoginData(result.data);
                                if (result.result) console.log(result.data);
                            }
                            setLoginTry(true);
                        }}
                    >
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
                </div>
            </section>
        </main>
    );
}
