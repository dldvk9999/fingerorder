import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import Img from "../common/Img";
import styles from "./styles/Home_Section5.module.scss";

export default function Home_Section5() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);

    return (
        <section className={styles.homeStrongth}>
            <div className={styles.homeStrongthCard}>
                <div className={styles.homeStrongthSub}>
                    {Img(
                        "fingerorder",
                        200,
                        200,
                        `${styles.homeStrongthLogo} ${darkmode ? styles.homeStrongthInvert : ""}`
                    )}
                    <h2>핑거오더의 장점</h2>
                </div>
                <ul className={styles.homeStrongthSub}>
                    <li>
                        <h3>1. 키오스크를 대체 할 수 있습니다.</h3>
                        <p>테이블에 앉아서 키오스크를 대신해 메뉴를 주문할 수 있어 기다림이 없고 간편합니다.</p>
                    </li>
                    <li>
                        <h3>2. POS기를 대체 할 수 있습니다.</h3>
                        <p>
                            핑거오더의 결제 시스템을 이용해 테이블에서 메뉴를 고르고 선결제를 통해 주문하기 때문에 후불
                            결제를 하지 않아도 됩니다.
                        </p>
                    </li>
                    <li>
                        <h3>3. 비용을 아낄 수 있습니다.</h3>
                        <p>
                            키오스크 비용 최소 100만원과 POS기 비용 최소 30만원을 아낄 수 있고 무료로 이용 가능합니다.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
