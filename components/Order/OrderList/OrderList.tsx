import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginCheck from "../../common/Login_Check";
import printOrderList from "./OrderListPrint";
import styles from "./OrderList.module.scss";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export default function OrderList() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
                                <th>매장 이름</th>
                                <th>구분</th>
                                <th>번호</th>
                                <th>총합</th>
                                <th>주문 시간</th>
                            </tr>
                        </thead>

                        <tbody>{printOrderList(startDate, endDate)}</tbody>
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
