import Img from "../common/Img";
import data from "../../data/data";
import styles from "./styles/Home_Section3.module.scss";

export default function Home_Section3() {
    // carousel에서 background에 있는 카드 생성
    function compareLayout() {
        let result = [];
        for (let i = 0; i < data.length; i++)
            result.push(
                <div className={styles.homeCompareBackItem} key={"home-compare-" + i}>
                    <div>{data[i].name}</div>
                    <div>?</div>
                    <div>{data[i].price}</div>
                </div>
            );
        return result;
    }

    return (
        <section id="compare" className={styles.homeCompare}>
            <div className={styles.homeCompareBackground}>{compareLayout()}</div>
            <div className={styles.homeCompareFront}>
                <div>핑거오더</div>
                <div>{Img("fingerorder", 200, 200, styles.homeCompareFrontImage)}</div>
                <div>무료</div>
            </div>
            <p>사장님을 위한 현명한 선택!</p>
        </section>
    );
}
