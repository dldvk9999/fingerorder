import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/pages/Login.module.scss";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    function signup(e: { preventDefault: () => void }) {
        if (email === "" || pass1 === "" || pass2 === "") {
            alert("이메일과 비밀번호를 입력하여주세요");
            e.preventDefault();
        } else if (pass1 !== pass2) {
            alert("비밀번호가 일치하지 않습니다.");
            e.preventDefault();
        } else if (pass1.length < 8 || pass2.length < 8) {
            alert("비밀번호는 최소 8자 이내로 해주세요.");
            e.preventDefault();
        } else {
            alert("signup function complete");
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
                <form
                    className={styles.loginForm}
                    onSubmit={signup}
                    action="/login"
                >
                    <input
                        type="email"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        minLength={8}
                        onChange={(e) => setPass1(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        minLength={8}
                        onChange={(e) => setPass2(e.target.value)}
                    />
                    <button type="submit">회원가입</button>
                </form>
            </section>
        </main>
    );
}
