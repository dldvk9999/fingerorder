import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import orderlist from "../../data/orderlist";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/OrderList.module.scss";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

type menu = {
    name: string;
    price: number;
    count: number;
};

export default function OrderList() {
    const [myOrderList, setOrderList] = useState<any>([]);
    const [showTableRow, setTableRow] = useState<Array<boolean>>([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const tableRef = useRef(null);

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
        const sDate = startDate ? startDate : new Date();
        const eDate = endDate ? endDate : new Date();
        let result = [];
        for (let i = 0; i < myOrderList.length; i++) {
            if (sDate <= new Date(myOrderList[i].time) && new Date(myOrderList[i].time) <= eDate)
                result.push(
                    <tr
                        className={`${styles.orderlistGridBody} ${showTableRow[i] && styles.orderlistGridShow}`}
                        onClick={() => showRow(i)}
                        key={"orderlist-menu-" + i}
                    >
                        <td>{myOrderList[i].type}</td>
                        <td>{myOrderList[i].name}</td>
                        <td>{myOrderList[i].number}번</td>
                        <td>{myOrderList[i].total.toLocaleString()}원</td>
                        <td>{myOrderList[i].time}</td>
                        <td className={styles.orderlistGridBlank}></td>
                        <td className={styles.orderlistGridBlank}></td>
                        <td className={styles.orderlistGridBlank}></td>
                        <td className={styles.orderlistGridInnerBody}>{printOrderListMenu(myOrderList[i].menu)}</td>
                        <td className={styles.orderlistGridBlank}></td>
                    </tr>
                );
        }
        return result;
    }

    useEffect(() => {
        setOrderList(orderlist);
        setTableRow(Array.from({ length: orderlist.length }, () => false));
    }, []);

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
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => (date ? setStartDate(date!) : setStartDate(new Date()))}
                            locale={"ko"}
                            dateFormat={"yyyy-MM-dd(eee) hh:mm"}
                            isClearable={false}
                            timeCaption={"시간"}
                            maxDate={endDate}
                            value={startDate.toLocaleString("ko", {
                                hour12: false,
                                dateStyle: "long",
                                timeStyle: "short",
                            })}
                            className={styles.orderlistSelectDate}
                            showTimeSelect
                            required
                        />
                        ~
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => (date ? setEndDate(date!) : setEndDate(new Date()))}
                            locale={"ko"}
                            dateFormat={"yyyy-MM-dd(eee) hh:mm"}
                            isClearable={false}
                            timeCaption={"시간"}
                            minDate={startDate}
                            maxDate={new Date()}
                            value={endDate.toLocaleString("ko", {
                                hour12: false,
                                dateStyle: "long",
                                timeStyle: "short",
                            })}
                            className={styles.orderlistSelectDate}
                            showTimeSelect
                            required
                        />
                    </div>
                </div>
                <div className={styles.orderlistBody}>
                    <table className={styles.orderlistTable} ref={tableRef}>
                        <thead>
                            <tr className={styles.orderlistGrid}>
                                <th>매장 이름</th>
                                <th>구분</th>
                                <th>번호</th>
                                <th>총합</th>
                                <th>주문 시간</th>
                            </tr>
                        </thead>

                        <tbody>{printOrderList()}</tbody>
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
