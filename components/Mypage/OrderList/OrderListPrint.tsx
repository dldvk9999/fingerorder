import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber } from "../../../states";
import orderlist from "../../../data/orderlist";
import { menuOrder } from "../../../types/type";
import { getOrderList } from "./OrderListAPI";
import styles from "./OrderList.module.scss";

// 주문 목록 출력
export default function PrintOrderList(startDate: Date, endDate: Date) {
    const [editPage] = useRecoilState(editNumber);
    const [myOrderList, setOrderList] = useState<any>([]);
    const sDate = startDate ? startDate : new Date();
    const eDate = endDate ? endDate : new Date();

    // 주문 목록 - 메뉴 출력
    function printOrderListMenu(menuItem: Array<menuOrder>) {
        return menuItem.map((el, i) => (
            <p className={styles.orderlistGridItem} key={"orderlist-menu-item-" + i}>
                {el.name} * {el.count} = {(el.price * el.count).toLocaleString()}원
            </p>
        ));
    }

    useEffect(() => {
        const apiOrderList = getOrderList(editPage, sDate, eDate);
        setOrderList(Object.keys(apiOrderList).length ? apiOrderList : orderlist);
    }, [editPage]);

    let result = [];
    for (let i = 0; i < myOrderList.length; i++) {
        if (sDate <= new Date(myOrderList[i].time) && new Date(myOrderList[i].time) <= eDate)
            result.push(
                <tr className={styles.orderlistGridBody} key={"orderlist-menu-" + i}>
                    <td>{myOrderList[i].name}</td>
                    <td>{myOrderList[i].type}</td>
                    <td>{myOrderList[i].number}번</td>
                    <td>
                        <details className={styles.orderlistDetails}>
                            <summary>{myOrderList[i].total.toLocaleString()}원</summary>
                            <p className={styles.orderlistDetailsHeader}>
                                총합 : {myOrderList[i].total.toLocaleString()}원
                            </p>
                            {printOrderListMenu(myOrderList[i].menu)}
                        </details>
                    </td>
                    <td>{myOrderList[i].time}</td>
                </tr>
            );
    }
    return result;
}
