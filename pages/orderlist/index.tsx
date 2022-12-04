import { useEffect, useState } from "react";
import orderlist from "../../data/orderlist";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/OrderList.module.scss";

type menu = {
    name: string;
    price: number;
    count: number;
};

export default function OrderList() {
    const [myOrderList, setOrderList] = useState<any>([]);
    const [showTableRow, setTableRow] = useState<Array<boolean>>([]);
    const [width, setWidth] = useState(0);

    // Row를 클릭했을 때 해당 Row 펼치기
    function showRow(index: number) {
        setTableRow(
            showTableRow
                .slice(0, index)
                .concat(!showTableRow[index])
                .concat(showTableRow.slice(index + 1, showTableRow.length))
        );
    }

    // 주문 목록 - 메뉴 출력
    function printOrderListMenu(menu: Array<menu>) {
        let result = [];
        for (let i = 0; i < menu.length; i++) {
            result.push(
                <p key={"orderlist-menu-item-" + i}>
                    {menu[i].name} * {menu[i].count} = {(menu[i].price * menu[i].count).toLocaleString()}원
                </p>
            );
        }
        return result;
    }

    // 주문 목록 출력
    function printOrderList() {
        let result = [];
        for (let i = 0; i < myOrderList.length; i++) {
            result.push(
                <div
                    className={`${styles.orderlistGridBody} ${showTableRow[i] && styles.orderlistGridShow}`}
                    onClick={() => showRow(i)}
                    key={"orderlist-menu-" + i}
                >
                    <p>{myOrderList[i].name}</p>
                    <p>{myOrderList[i].type}</p>
                    <p>{myOrderList[i].number}번</p>
                    <p>{myOrderList[i].total.toLocaleString()}원</p>
                    <p>{myOrderList[i].time}</p>
                    <p className={styles.orderlistGridBlank}></p>
                    <p className={styles.orderlistGridBlank}></p>
                    <p className={styles.orderlistGridBlank}></p>
                    <div>{printOrderListMenu(myOrderList[i].menu)}</div>
                    <p className={styles.orderlistGridBlank}></p>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        setOrderList(orderlist);
        setTableRow(Array.from({ length: orderlist.length }, () => false));

        setWidth(window.innerWidth);
        window.onresize = () => {
            setWidth(window.innerWidth);
        };
    }, []);

    return LoginCheck() ? (
        <main>
            <section className={styles.orderlist}>
                <h1>주문 내역 조회</h1>
                <div className={styles.orderlistGrid}>
                    <h2>매장 이름</h2>
                    <h2>구분</h2>
                    <h2>번호</h2>
                    <h2>총합</h2>
                    <h2>주문 시간</h2>
                </div>

                {printOrderList()}
            </section>
        </main>
    ) : null;
}
