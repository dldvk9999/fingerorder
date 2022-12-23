import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { soundPlay } from "../../states";
import { PrintRandomMenu } from "./OrderMenu";
import LoginCheck from "../common/Login_Check";
import store from "../../data/store";
import { menuList, menu } from "../../types/type";
import { deleteOrder } from "./OrderAPI";
import { isAPI } from "../../states";
import styles from "./Order.module.scss";

export default function Order() {
    const [isSoundPlay, setSoundPlay] = useRecoilState(soundPlay);
    const [menuList, setMenuList] = useState<Array<Array<menuList>>>([]);
    const [count, setCount] = useState<Array<Array<number>>>([]);
    const [locate, setLocate] = useState<Array<string>>([]);
    const [table, setTable] = useState<Array<number>>([]);
    const [sum, setSum] = useState<Array<number>>([]);
    const [date, setDate] = useState<Array<Date>>([]);
    const [result, setResult] = useState<Array<any>>([]);
    const [notiAudio, setAudio] = useState<any>();
    const [isClickNew, setClickNew] = useState(false);
    let storeID = Math.floor(Math.random() * 3);

    // useQuery를 통해 Interval하게 query를 요청하여 실시간 주문 목록 호출
    const { isLoading, error, data, isFetching } = useQuery(
        "getOrder",
        async () => {
            await axios
                .get("/api/store/" + storeID + "/order")
                .then((res) => res)
                .catch((e) => console.log(e));
        },
        {
            enabled: isAPI,
            refetchInterval: 10000, // 1000 = 1초
            retry: 0, // 재시도 횟수
        }
    );

    // 주문 내역 삭제
    function delOrder(index: number) {
        if (confirm("삭제하시겠습니까?")) {
            let del = [setResult, setMenuList, setCount, setLocate, setSum, setTable, setDate];
            let delValue = [result, menuList, count, locate, sum, table, date];
            del.map((func, i) => func(delValue[i].filter((_: any, i: number) => i !== index)));
            deleteOrder(storeID);
        }
    }

    // 주문을 랜덤하게 만드는 함수
    function makeRandomOrder() {
        storeID = Math.floor(Math.random() * 3);
        let funcList = [setDate, setLocate, setTable, setMenuList, setCount, setSum];
        let valList = [new Date(), "", 0, [] as any, [], 0];

        // 주문 중 메뉴의 개수 랜덤
        for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
            const tmpStore = store[storeID];
            let category = tmpStore.category[Math.floor(Math.random() * tmpStore.category.length)];
            const storeMenu = (tmpStore.menu as unknown as menu)[category];
            let menu = storeMenu[Math.floor(Math.random() * storeMenu.length)] as menuList;

            valList[1] = tmpStore.locate;
            valList[2] = Math.floor(Math.random() * tmpStore.table);
            valList[3].push(menu);
            valList[4].push(Math.floor(Math.random() * 10) + 1);
            valList[5] += valList[4][valList[4].length - 1] * menu.price;
        }

        funcList.map((func, i) => func((el: any) => [...el, valList[i]]));

        if (localStorage["soundplay"] == "true") notiAudio && notiAudio.play();
    }

    // 랜덤한 order 생성
    function printRandomOrder() {
        setResult(
            menuList.map((_, i) => (
                <div
                    className={`${styles.orderCard} ${
                        i === menuList.length - 1 && isClickNew && styles.orderCardSlideIn
                    }`}
                    key={"order-random-" + i}
                >
                    <h2>{store[storeID].name}</h2>
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
                            delOrder(i);
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

        return () => {
            localStorage.removeItem("soundplay");
        };
    }, [isSoundPlay]);

    useEffect(() => {
        // 주문 목록 호출
        setResult(isLoading || error || isFetching ? [] : data ? data : []);
    }, [isLoading, error, isFetching, data]);

    useEffect(() => {
        printRandomOrder();
    }, [menuList, locate, count, sum, table]);

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
                    <button
                        onClick={() => {
                            setClickNew(true);
                            makeRandomOrder();
                        }}
                    >
                        TestOrder
                    </button>
                </h1>
            </div>
            <p className={styles.orderSubText}>* 상태를 클릭하여 준비 완료 표시로 변경할 수 있습니다.</p>
            <section className={styles.orderSection}>{result}</section>
        </main>
    ) : null;
}
