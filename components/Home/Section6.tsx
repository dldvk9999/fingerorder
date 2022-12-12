import Link from "next/link";
import styles from "./styles/Home_Section6.module.scss";

export default function Home_Section6() {
    return (
        <section className={styles.homeSubmit}>
            <Link href={"/registration"}>
                <div className={styles.homeSubmitButton}>지금 매장 등록하러 가기</div>
            </Link>
        </section>
    );
}
