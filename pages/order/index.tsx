import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { soundPlay } from "../../states";
import LoginCheck from "../login_check";
import store from "../../data/store";
import styles from "../../styles/pages/Order.module.scss";
import Link from "next/link";

type menuList = {
    name: string;
    price: number;
    desc: string;
    image: string;
    soldout: boolean;
};
type menu = {
    [key: string]: Array<Object>;
};

export default function Order() {
    let storeID = Math.floor(Math.random() * 3);
    let category = "";
    let menu: menuList = {
        name: "",
        price: 0,
        desc: "",
        image: "",
        soldout: false,
    };
    const [menuList, setMenuList] = useState<Array<Array<menuList>>>([]);
    const [count, setCount] = useState<Array<Array<number>>>([]);
    const [locate, setLocate] = useState<Array<string>>([]);
    const [table, setTable] = useState<Array<number>>([]);
    const [sum, setSum] = useState<Array<number>>([]);
    const [isSoundPlay, setSoundPlay] = useRecoilState(soundPlay);
    const [result, setResult] = useState<JSX.Element[]>([]);
    const [notiAudio, setAudio] = useState<any>();
    const [isClickNew, setClickNew] = useState(false);

    // 주문 내역 삭제
    function deleteOrder(index: number) {
        if (confirm("삭제하시겠습니까?")) {
            let del = [setResult, setMenuList, setCount, setLocate, setSum, setTable];
            let delValue = [result, menuList, count, locate, sum, table];
            for (let i = 0; i < del.length; i++)
                del[i]((delValue[i].slice(0, index) as any).concat(delValue[i].slice(index + 1, delValue[i].length)));
        }
    }

    // 주문을 랜덤하게 만드는 함수
    function makeRandomOrder() {
        storeID = Math.floor(Math.random() * 3);
        let tmpCount: number[] = [];
        let tmpMenuList: Array<menuList> = [];
        let tmpLocate = "";
        let tmpSum = 0;
        let tmpTable = 0;

        // 주문 중 메뉴의 개수 랜덤
        for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
            const categoryLength = store[storeID].category.length;
            category = store[storeID].category[Math.floor(Math.random() * categoryLength)];
            const storeMenu = store[storeID].menu as unknown as menu;
            const menuLength = storeMenu[category].length;
            let tm = Math.floor(Math.random() * menuLength);
            menu = storeMenu[category][tm] as menuList;

            tmpTable = Math.floor(Math.random() * store[storeID].table);
            tmpLocate = store[storeID].locate;
            tmpCount.push(Math.floor(Math.random() * 10) + 1);
            tmpMenuList = [...tmpMenuList, menu];
            tmpSum += tmpCount[tmpCount.length - 1] * menu.price;
        }

        setLocate([...locate, tmpLocate]);
        setCount([...count, tmpCount]);
        setMenuList([...menuList, tmpMenuList]);
        setSum([...sum, tmpSum]);
        setTable([...table, tmpTable]);

        if (localStorage["soundplay"] == "true") notiAudio && notiAudio.play();
    }

    // Label 클릭 시 처리했다는 표시를 나타내기 위해 색깔과 삭선 표시
    function changeLabelColor(e: any) {
        if (e.target.classList.length >= 2) {
            e.target.classList.remove(styles.orderCardLabelActive);
            e.target.parentNode.classList.remove(styles.orderCardMenuActive);
        } else {
            e.target.classList.add(styles.orderCardLabelActive);
            e.target.parentNode.classList.add(styles.orderCardMenuActive);
        }
    }

    // 랜덤한 order 중 랜덤한 메뉴 생성
    function printRandomMenu(index: number) {
        let result = [
            <div className={styles.orderCardMenu} key={"order-random-menu-title"}>
                <p className={styles.orderCardMenuTitle}>이름</p>
                <p className={styles.orderCardMenuTitle}>수량</p>
                <p className={styles.orderCardMenuTitle}>상태</p>
            </div>,
        ];
        for (let i = 0; i < menuList[index].length; i++)
            result.push(
                <div className={styles.orderCardMenu} key={"order-random-menu-" + i}>
                    <p>{menuList![index][i].name}</p>
                    <p>{count![index][i]}개</p>
                    <label
                        htmlFor={"checkbox-" + index + "-" + i}
                        onClick={(e) => changeLabelColor(e)}
                        className={styles.orderCardLabel}
                    >
                        <input
                            type="checkbox"
                            id={"checkbox-" + index + "-" + i}
                            className={styles.orderCardCheckbox}
                        />
                    </label>
                </div>
            );
        return result;
    }

    // 랜덤한 order 생성
    function printRandomOrder() {
        let tmp = [];
        for (let i = 0; i < menuList.length; i++)
            tmp.push(
                <div
                    className={`${styles.orderCard} ${
                        i === menuList.length - 1 && isClickNew && styles.orderCardSlideIn
                    }`}
                    key={"order-random-" + i}
                >
                    <h2>{store[storeID].name}</h2>
                    <div className={styles.orderCardMenu}>{new Date().toLocaleString()}</div>
                    <div className={styles.orderCardLocate}>
                        {locate[i]}
                        <div>{table[i] + 1}번</div>
                    </div>
                    {printRandomMenu(i)}
                    <p className={styles.orderCardTotal}>{sum[i].toLocaleString()}원</p>
                    <button
                        className={styles.orderCardClose}
                        onClick={() => {
                            setClickNew(false);
                            deleteOrder(i);
                        }}
                    >
                        삭제
                    </button>
                </div>
            );
        setResult(tmp);
    }

    useEffect(() => {
        setAudio(new Audio("/noti.mp3"));
        localStorage["soundplay"] = false;
        setSoundPlay(false);

        return () => {
            localStorage.removeItem("soundplay");
        };
    }, []);

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
                        className={isSoundPlay ? styles.orderSoundActive : ""}
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
                <div>
                    <Link href={"/orderlist"}>
                        <button>주문내역 조회</button>
                    </Link>
                    <Link href={"/sales"}>
                        <button>매출내역 조회</button>
                    </Link>
                </div>
            </div>
            <p className={styles.orderSubText}>* 상태를 클릭하여 준비 완료 표시로 변경할 수 있습니다.</p>
            <section className={styles.orderSection}>{result}</section>
        </main>
    ) : null;
}
