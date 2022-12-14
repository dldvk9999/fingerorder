import Image from "next/image";
import styles from "./Error.module.scss";

export default function Error(props: { type: string }) {
    return (
        <main>
            <section className={styles.error}>
                <Image
                    src={!props.type ? "/error.gif" : "/notfound.webp"}
                    alt={!props.type ? "error" : "notfound"}
                    width={200}
                    height={200}
                    loading="lazy"
                />
                {!props.type ? (
                    <>
                        <p>에러가 발생했습니다.</p>
                        <p>다시 시도해주시고 에러가 재발할 경우 사이트 운영자에게 문의해주십시오.</p>
                    </>
                ) : (
                    <>
                        <p>페이지를 찾을 수 없습니다.</p>
                        <p>페이지 주소를 다시 확인해주시고 접속이 불가할 경우 사이트 운영자에게 문의해주십시오.</p>
                    </>
                )}
                <p>운영자 : 010-xxxx-xxxx</p>
            </section>
        </main>
    );
}
