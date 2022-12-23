import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import Img from "../common/Img";
import { signupAuth } from "./LoginAPI";
import styles from "./Login.module.scss";

export default function Signup() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const router = useRouter();
    const { params } = router.query;

    useEffect(() => {
        signupAuth(params ? params[0].slice(5) : "");
    }, [params]);

    return (
        <main>
            <section className={styles.login}>
                {Img("fingerorder", 150, 150, `${darkmode ? styles.loginInvert : ""}`)}
                <h1>이메일 인증이 완료되었습니다.</h1>
                <p>이제 로그인하실 수 있습니다!</p>
                <Link href={"/login"}>
                    <button>로그인</button>
                </Link>
            </section>
        </main>
    );
}
