import Image from "next/image";
import styles from "../styles/pages/Error.module.scss";

const NotFound = () => {
    return (
        <main>
            <section className={styles.error}>
                <Image src={"/notfound.webp"} alt={"notfound"} width={200} height={200} loading="lazy" />
                <p>페이지를 찾을 수 없습니다.</p>
                <p>페이지 주소를 다시 확인해주시고 접속이 불가할 경우 사이트 운영자에게 문의해주십시오.</p>
                <p>운영자 : 010-xxxx-xxxx</p>
            </section>
        </main>
    );
};

export default NotFound;
