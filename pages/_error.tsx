import Image from "next/image";
import styles from "../styles/pages/Error.module.scss";

const Error = () => {
    return (
        <main>
            <section className={styles.error}>
                <Image src={"/error.gif"} alt={"error"} width={200} height={200} loading="lazy" />
                <p>에러가 발생했습니다.</p>
                <p>다시 시도해주시고 에러가 재발할 경우 사이트 운영자에게 문의해주십시오.</p>
                <p>운영자 : 010-xxxx-xxxx</p>
            </section>
        </main>
    );
};

export default Error;
