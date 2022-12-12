import styles from "./Order.module.scss";

type menuList = {
    name: string;
    price: number;
    desc: string;
    image: string;
    soldout: boolean;
};

// Label 클릭 시 처리했다는 표시를 나타내기 위해 색깔과 삭선 표시
function changeLabelColor(e: any) {
    if (e.target.classList.length >= 2) {
        e.target.classList.remove(styles.orderCardLabelActive);
        e.target.parentNode.classList.remove(styles.orderCardMenuActive);
    } else {
        e.target.classList.add(styles.orderCardLabelActive);
        e.target.parentNode.classList.add(styles.orderCardMenuActive);
    }
}

// 랜덤한 order 중 랜덤한 메뉴 생성
export function printRandomMenu(index: number, menuList: Array<Array<menuList>>, count: Array<Array<number>>) {
    let result = [
        <div className={styles.orderCardMenu} key={"order-random-menu-title"}>
            <p className={styles.orderCardMenuTitle}>이름</p>
            <p className={styles.orderCardMenuTitle}>수량</p>
            <p className={styles.orderCardMenuTitle}>상태</p>
        </div>,
    ];
    for (let i = 0; i < menuList[index].length; i++)
        result.push(
            <div className={styles.orderCardMenu} key={"order-random-menu-" + i}>
                <p>{menuList![index][i].name}</p>
                <p>{count![index][i]}개</p>
                <label
                    htmlFor={"checkbox-" + index + "-" + i}
                    onClick={(e) => changeLabelColor(e)}
                    className={styles.orderCardLabel}
                >
                    <input type="checkbox" id={"checkbox-" + index + "-" + i} className={styles.orderCardCheckbox} />
                </label>
            </div>
        );
    return result;
}
