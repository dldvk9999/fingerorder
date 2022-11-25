import styles from "../styles/Home.module.scss";

export default function Footer() {
    function makerPrint() {
        let github = "https://github.com/";
        let developer = [
            "dldvk9999",
            "GaJaMy",
            "hossi97",
            "jys9049",
            "seongyeong826",
            "suzhanlee",
        ];
        let result = [];

        for (let i = 0; i < developer.length; i++) {
            result.push(
                <a
                    href={github + developer[i]}
                    className={styles.footerLink}
                    rel="noopener noreferrer"
                    key={"footer-developer-" + i}
                >
                    {developer[i]}
                </a>
            );
        }
        return result;
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.footerSub}>
                <div>Powered by</div>
                <a
                    href="https://zero-base.co.kr/"
                    className={styles.footerLink}
                    rel="noopener noreferrer"
                >
                    zerobase
                </a>
            </div>
            <div className={styles.footerSub}>
                <div>Made by</div>
                <div className={styles.footerSubMaker}>{makerPrint()}</div>
            </div>
        </footer>
    );
}
