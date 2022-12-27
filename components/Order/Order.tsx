import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { soundPlay, editNumber } from "../../states";
import { PrintRandomMenu } from "./OrderMenu";
import LoginCheck from "../common/Login_Check";
import { deleteOrder, getOrder } from "./OrderAPI";
import styles from "./Order.module.scss";

export default function Order() {
    const [isSoundPlay, setSoundPlay] = useRecoilState(soundPlay);
    const [editPage, setEditPage] = useRecoilState(editNumber);
    const [menuList, setMenuList] = useState<Array<Array<string>>>([]);
    const [count, setCount] = useState<Array<Array<number>>>([]);
    const [locate, setLocate] = useState<Array<string>>([]);
    const [table, setTable] = useState<Array<number>>([]);
    const [sum, setSum] = useState<Array<number>>([]);
    const [date, setDate] = useState<Array<Date>>([]);
    const [result, setResult] = useState<Array<any>>([]);
    const [notiId, setNotiId] = useState<Array<number>>([]);
    const [notiAudio, setAudio] = useState<any>();
    const [isClickNew, setClickNew] = useState(false);

    // 주문 내역 삭제
    function delOrder(index: number) {
        if (confirm("삭제하시겠습니까?")) {
            let del = [setResult, setMenuList, setCount, setLocate, setSum, setTable, setDate];
            let delValue = [result, menuList, count, locate, sum, table, date];
            del.map((func, i) => func(delValue[i].filter((_: any, i: number) => i !== index)));
            deleteOrder(index);
        }
    }

    // order 생성
    function printRandomOrder() {
        if (localStorage["soundplay"] == "true") notiAudio && notiAudio.play();
        setResult(
            menuList.map((_, i) => (
                <div
                    className={`${styles.orderCard} ${
                        i === menuList.length - 1 && isClickNew && styles.orderCardSlideIn
                    }`}
                    key={"order-random-" + i}
                >
                    <h2>{menuList[i]}</h2>
                    <div className={styles.orderCardMenu}>{date[i].toLocaleString()}</div>
                    <div className={styles.orderCardLocate}>
                        {locate[i]}
                        <div>{table[i] + 1}번</div>
                    </div>
                    {PrintRandomMenu(i, menuList, count)}
                    <p className={styles.orderCardTotal}>{sum[i].toLocaleString()}원</p>
                    <button
                        className={styles.orderCardClose}
                        onClick={() => {
                            setClickNew(false);
                            delOrder(notiId[i]);
                        }}
                    >
                        삭제
                    </button>
                </div>
            ))
        );
    }

    useEffect(() => {
        setAudio(new Audio("/noti.mp3"));
        localStorage["soundplay"] = false;
        setSoundPlay(false);

        async function initOrders() {
            const result = await getOrder(editPage);

            let ids: number[] = [];
            let tables: number[] = [];
            let sums: number[] = [];
            let dates: Date[] = [];
            let name: string[][] = [];
            let count: number[][] = [];

            result.data.map((order: any) => {
                ids.push(order.id);
                tables.push(order.tableNum);
                sums.push(order.totalPrice);
                dates.push(new Date(order.createdAt));

                let tmpName: string[] = [];
                let tmpCount: number[] = [];
                order.orderMenus.map((el: { name: string; count: number }) => {
                    tmpName.push(el.name);
                    tmpCount.push(el.count);
                });
                name.push(tmpName);
                count.push(tmpCount);
            });
            setNotiId(ids);
            setTable(tables);
            setSum(sums);
            setDate(dates);
            setMenuList(name);
            setCount(count);
        }

        let interval = setInterval(() => {
            initOrders();
        }, 3000);

        return () => {
            localStorage.removeItem("soundplay");
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        printRandomOrder();
    }, [notiId, menuList, locate, count, sum, table]);

    return LoginCheck() ? (
        <main className={styles.order}>
            <div>
                <h1>
                    주문 목록
                    <button
                        onClick={() => {
                            localStorage["soundplay"] = localStorage["soundplay"] !== "true";
                            setSoundPlay(!isSoundPlay);
                        }}
                        className={`${isSoundPlay && styles.orderSoundActive}`}
                    >
                        {isSoundPlay ? "sound ON" : "sound OFF"}
                    </button>
                    <select
                        value={editPage}
                        onChange={(e) => setEditPage(Number(e.target.value))}
                        className={styles.orderSelect}
                    >
                        <option value="1">1번 매장</option>
                        <option value="2">2번 매장</option>
                    </select>
                </h1>
            </div>
            <p className={styles.orderSubText}>* 상태를 클릭하여 준비 완료 표시로 변경할 수 있습니다.</p>
            <section className={styles.orderSection}>{result}</section>
        </main>
    ) : null;
}
