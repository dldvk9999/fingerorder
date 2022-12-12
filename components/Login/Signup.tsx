import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Login.module.scss";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [signupOK, setSignupOK] = useState(false);
    const [signupTry, setSignupTry] = useState(false);

    function signup(e: { preventDefault: () => void }) {
        const emailRegex = /[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$/;
        const passRegex = /[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]/;
        if (email === "" || pass1 === "" || pass2 === "") alert("이메일과 비밀번호를 입력하여주세요");
        else if (pass1 !== pass2) alert("비밀번호가 일치하지 않습니다.");
        else if (pass1.length < 8 || pass2.length < 8) alert("비밀번호는 최소 8자 이내로 해주세요.");
        else if (!emailRegex.exec(email) || passRegex.exec(pass1) || passRegex.exec(pass2))
            alert("알맞는 이메일 및 비밀번호 형식을 사용해주세요.");
        else setSignupOK(true);
        setSignupTry(true);
        e.preventDefault();
    }

    return (
        <main>
            <section className={styles.login}>
                <Image src={"/fingerorder.webp"} alt={"fingerorder"} width={150} height={150} priority />
                {!signupOK ? (
                    <form className={styles.loginForm} onSubmit={signup} action="/login">
                        <input
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            onChange={(e) => setEmail(e.target.value)}
                            pattern="[a-zA-Z.].+[@][a-zA-Z].+[.][a-zA-Z]{2,4}$"
                            aria-required={signupTry}
                            required={signupTry}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            minLength={8}
                            pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                            onChange={(e) => setPass1(e.target.value)}
                            aria-required={signupTry}
                            required={signupTry}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호를 확인해주세요."
                            minLength={8}
                            pattern="[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*()-_=+,.?]{8,}"
                            onChange={(e) => setPass2(e.target.value)}
                            aria-required={signupTry}
                            required={signupTry}
                        />
                        <button type="submit">회원가입</button>
                    </form>
                ) : (
                    <>
                        <p>회원가입이 완료되었습니다.</p>
                        <p>이메일 인증을 완료하신 후 로그인하여 주세요.</p>
                        <Link href={"/login"}>
                            <button>로그인</button>
                        </Link>
                    </>
                )}
            </section>
        </main>
    );
}
