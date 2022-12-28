import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginCheck from "../../common/Login_Check";
import styles from "./Sales.module.scss";
import ko from "date-fns/locale/ko";
import { useRecoilState } from "recoil";
import { editNumber } from "../../../states";
import { getSales } from "./SalesAPI";
import { salesType } from "../../../types/type";
registerLocale("ko", ko);

export default function Sales() {
    const [editPage, _] = useRecoilState(editNumber);
    const tableRef = useRef(null);
    const [selectDate, setSelectDate] = useState<Date>(new Date());
    const [sales, setSales] = useState<Array<salesType>>([]);
    const [sum, setSum] = useState(0);
    const [result, setResult] = useState<any>();

    useEffect(() => {
        async function initSales() {
            const apiSales = await getSales(
                editPage,
                selectDate.getFullYear().toString(),
                ("0" + Number(selectDate.getMonth() + 1)).slice(-2)
            );
            setSales(apiSales.data);
        }
        initSales();
    }, [selectDate]);

    useEffect(() => {
        let tmpSum = 0;
        let tmpResult = [];
        for (let i = 0; i < sales.length; i++) {
            tmpSum += sales[i].salesSum;
            tmpResult.push(
                <tr className={styles.salesTableRow} key={"sales-date-" + i}>
                    <td>
                        {new Date(sales[i].yyyymmdd.toString()).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </td>
                    <td>{sales[i].salesSum}원</td>
                </tr>
            );
        }
        setSum(tmpSum);
        setResult(tmpResult);
    }, [sales]);

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
                        <tbody>{result}</tbody>
                        <tfoot>
                            <tr className={styles.salesTableTotal}>
                                <td>합계</td>
                                <td>{sum.toLocaleString()}원</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </main>
    ) : null;
}
