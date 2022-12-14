import styles from "./Footer.module.scss";

export default function Footer() {
    const developers = ["dldvk9999", "GaJaMy", "hossi97", "jys9049", "seongyeong826", "suzhanlee"];
    return (
        <footer className={styles.footer}>
            <div className={styles.footerSub}>
                <div>Powered by</div>
                <a href="https://zero-base.co.kr/" className={styles.footerLink} rel="noopener noreferrer">
                    zerobase
                </a>
            </div>
            <div className={styles.footerSub}>
                <div>Made by</div>
                <div className={styles.footerSubMaker}>
                    {developers.map((el, i) => (
                        <a
                            href={"https://github.com/" + el}
                            className={styles.footerLink}
                            rel="noopener noreferrer"
                            key={"footer-developer-" + i}
                        >
                            {el}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
