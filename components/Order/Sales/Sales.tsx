import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginCheck from "../../common/Login_Check";
import printSalesList from "./SalesPrint";
import styles from "./Sales.module.scss";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export default function Sales() {
    const [selectDate, setSelectDate] = useState<Date>();
    const tableRef = useRef(null);

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
                            filename={
                                "매출내역목록_" +
                                selectDate?.getFullYear() +
                                "년" +
                                (Number(selectDate?.getMonth()) + Number(1)) +
                                "월"
                            }
                            sheet={
                                selectDate?.getFullYear() + "년" + (Number(selectDate?.getMonth()) + Number(1)) + "월"
                            }
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
                        {printSalesList(selectDate ? selectDate : new Date())}
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
