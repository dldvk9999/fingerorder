import styles from "./Sales.module.scss";

// 매출 목록 출력
export default function PrintSalesList(selectDate: Date) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let allSum = 0;
    let result = [];

    if (selectDate) {
        for (let i = 0; i < days[selectDate.getMonth()]; i++) {
            const sales = Math.floor(Math.random() * 2001 + 500) * 1000;
            allSum += sales;
            result.push(
                <tr className={styles.salesTableRow} key={"sales-date-" + i}>
                    <td>
                        {selectDate.getFullYear()}년 {("0" + (selectDate.getMonth() + 1)).slice(-2)}월{" "}
                        {("0" + (i + 1)).slice(-2)}일
                    </td>
                    <td>{sales.toLocaleString()}원</td>
                </tr>
            );
        }
    }

    return (
        <>
            <tbody>{result}</tbody>
            <tfoot>
                <tr className={styles.salesTableTotal}>
                    <td>합계</td>
                    <td>{allSum.toLocaleString()}원</td>
                </tr>
            </tfoot>
        </>
    );
}