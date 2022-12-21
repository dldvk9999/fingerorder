import Link from "next/link";
import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import Img from "../common/Img";
import styles from "./Login.module.scss";

export default function Signup() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);

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
