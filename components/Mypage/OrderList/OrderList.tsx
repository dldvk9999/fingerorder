import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginCheck from "../../common/Login_Check";
import { getOrderList } from "./OrderListAPI";
import styles from "./OrderList.module.scss";
import { menuOrder } from "../../../types/type";
import ko from "date-fns/locale/ko";
import { useRecoilState } from "recoil";
import { editNumber } from "../../../states";
registerLocale("ko", ko);

export default function OrderList() {
    const [editPage] = useRecoilState(editNumber);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [result, setResult] = useState<any>();
    const tableRef = useRef(null);

    function datepicker(type: "start" | "end", select: Date, max: Date, min: Date | undefined = undefined) {
        return (
            <DatePicker
                selected={select}
                onChange={(date) => {
                    if (date) type === "start" ? setStartDate(date!) : setEndDate(date!);
                    else type === "start" ? setStartDate(new Date()) : setEndDate(new Date());
                }}
                locale={"ko"}
                dateFormat={"yyyy-MM-dd(eee) hh:mm"}
                isClearable={false}
                timeCaption={"시간"}
                minDate={min}
                maxDate={max}
                value={select.toLocaleString("ko", {
                    hour12: false,
                    dateStyle: "long",
                    timeStyle: "short",
                })}
                className={styles.orderlistSelectDate}
                showTimeSelect
                required
            />
        );
    }

    async function initOrderList() {
        let result: JSX.Element[] = [];
        getOrderList(editPage, convertDate(startDate), convertDate(endDate)).then((res) => {
            res.data.map((el: any, i: number) => {
                result.push(
                    <tr className={styles.orderlistGridBody} key={"orderlist-menu-" + i}>
                        <td>{el.orderNum}번</td>
                        <td>
                            <details className={styles.orderlistDetails}>
                                <summary>{el.totalPrice.toLocaleString()}원</summary>
                                <p className={styles.orderlistDetailsHeader}>
                                    총합 : {el.totalPrice.toLocaleString()}원
                                </p>
                                {printOrderListMenu(el.orderMenus)}
                            </details>
                        </td>
                        <td>{new Date(el.orderTime).toLocaleString()}</td>
                    </tr>
                );
            });
            setResult(result);
        });
    }

    function convertDate(date: Date) {
        let result = "";
        result += date.getFullYear() + "-";
        result += ("0" + Number(date.getMonth() + 1)).slice(-2) + "-";
        result += ("0" + date.getDate()).slice(-2) + " ";
        result += ("0" + date.getHours()).slice(-2) + ":";
        result += ("0" + date.getMinutes()).slice(-2) + ":";
        result += ("0" + date.getSeconds()).slice(-2);
        return result;
    }

    // 주문 목록 - 메뉴 출력
    function printOrderListMenu(menuItem: Array<menuOrder>) {
        return menuItem.map((el, i) => (
            <p className={styles.orderlistGridItem} key={"orderlist-menu-item-" + i}>
                {el.name} * {el.count} = {(el.price * el.count).toLocaleString()}원
            </p>
        ));
    }

    useEffect(() => {
        initOrderList();
    }, [startDate, endDate]);

    return LoginCheck() ? (
        <main>
            <section className={styles.orderlist}>
                <div className={styles.orderlistHeader}>
                    <h1>
                        주문 내역 조회
                        <DownloadTableExcel
                            filename={"주문내역목록_" + new Date().getTime()}
                            sheet="orderlist"
                            currentTableRef={tableRef.current}
                        >
                            <button className={styles.orderlistExportExcel}>내보내기</button>
                        </DownloadTableExcel>
                    </h1>
                    <div className={styles.orderlistSearch}>
                        {datepicker("start", startDate, endDate)}~{datepicker("end", endDate, new Date(), startDate)}
                    </div>
                </div>
                <div className={styles.orderlistBody}>
                    <table className={styles.orderlistTable} ref={tableRef}>
                        <thead>
                            <tr className={styles.orderlistGrid}>
                                <th>주문번호</th>
                                <th>총합</th>
                                <th>주문 시간</th>
                            </tr>
                        </thead>

                        <tbody>{result}</tbody>
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
