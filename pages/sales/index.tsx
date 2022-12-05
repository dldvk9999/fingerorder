import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Sales.module.scss";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export default function Sales() {
    const [selectDate, setSelectDate] = useState<Date>();
    const tableRef = useRef(null);
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let allSum = 0;

    // 매출 목록 출력
    function printSalesList() {
        allSum = 0;
        let result = [];
        if (selectDate) {
            for (let i = 0; i < days[selectDate.getMonth()]; i++) {
                const sales = Math.floor(Math.random() * 2001 + 500) * 1000;
                allSum += sales;
                result.push(
                    <tr key={"sales-date-" + i}>
                        <td>
                            {selectDate.getFullYear()}년 {("0" + (selectDate.getMonth() + 1)).slice(-2)}월{" "}
                            {("0" + (i + 1)).slice(-2)}일
                        </td>
                        <td>{sales.toLocaleString()}원</td>
                    </tr>
                );
            }
        }
        return result;
    }

    useEffect(() => {
        setSelectDate(new Date());
    }, []);

    return LoginCheck() ? (
        <main>
            <section className={styles.sales}>
                <div>
                    <h1>
                        매출 내역 조회
                        <DownloadTableExcel
                            filename={"매출내역목록_" + new Date().getTime()}
                            sheet="sales"
                            currentTableRef={tableRef.current}
                        >
                            <button className={styles.salesExportExcel}>내보내기</button>
                        </DownloadTableExcel>
                    </h1>
                    <div className={styles.salesSearch}>
                        <DatePicker
                            selected={selectDate}
                            onChange={(date) => (date ? setSelectDate(date!) : setSelectDate(new Date()))}
                            locale={"ko"}
                            isClearable={false}
                            maxDate={new Date()}
                            value={
                                selectDate &&
                                selectDate.toLocaleString("ko", {
                                    year: "numeric",
                                    month: "long",
                                })
                            }
                            className={styles.salesSelectDate}
                            showMonthYearPicker
                            required
                        />
                    </div>
                </div>
                <div className={styles.salesBody}>
                    <table className={styles.salesTable} ref={tableRef}>
                        <caption>
                            {selectDate && selectDate.getFullYear()}년{" "}
                            {selectDate && ("0" + (selectDate.getMonth() + 1)).slice(-2)}월 매출내역
                        </caption>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>매출</th>
                            </tr>
                        </thead>
                        <tbody>{printSalesList()}</tbody>
                        <tfoot>
                            <tr className={styles.salesTableTotal}>
                                <td>합계</td>
                                <td>{allSum.toLocaleString()}원</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
