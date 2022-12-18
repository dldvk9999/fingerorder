import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import Img from "../common/Img";
import data from "../../data/data";
import styles from "./styles/Home_Section3.module.scss";

export default function Home_Section3() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);

    return (
        <section id="compare" className={styles.homeCompare}>
            <div className={styles.homeCompareBackground}>
                {/* // carousel에서 background에 있는 카드 생성 */}
                {data.map((el, i) => (
                    <div className={styles.homeCompareBackItem} key={"home-compare-" + i}>
                        <div>{el.name}</div>
                        <div>?</div>
                        <div>{el.price}</div>
                    </div>
                ))}
            </div>
            <div className={styles.homeCompareFront}>
                <div>핑거오더</div>
                <div>
                    {Img(
                        "fingerorder",
                        200,
                        200,
                        `${styles.homeCompareFrontImage} ${darkmode ? styles.homeCompareFrontImageInvert : ""}`
                    )}
                </div>
                <div>무료</div>
            </div>
            <p>사장님을 위한 현명한 선택!</p>
        </section>
    );
}
