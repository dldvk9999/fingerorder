import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber, registrationIndex } from "../../../states";
import LoginCheck from "../../common/Login_Check";
import styles from "./Store.module.scss";
import { createStore, editStore } from "./StoreAPI";

export default function Store(props: {
    name: SetStateAction<string>;
    tableCount: SetStateAction<number>;
    tmpTableCount: SetStateAction<number>;
    location: SetStateAction<string>;
    type: string;
}) {
    const [editPage, setEditPage] = useRecoilState(editNumber);
    const [_, setRegiIndex] = useRecoilState(registrationIndex);
    const [storeName, setStoreName] = useState(props.name ? props.name.toString() : ""); // 매장 이름
    const [tableCount, setTableCount] = useState(props.tableCount ? Number(props.tableCount) : 0); // 매장 테이블 수
    const [storeLocation, setStoreLocation] = useState(props.location ? props.location.toString() : ""); // 매장 위치
    const [isSubmitDisable, setSubmitDisable] = useState(false); // Submit 버튼 disable 유뮤 (Require 미 입력으로 Submit시 4초 disable)
    const [storeType, setStoreType] = useState(props.type ? props.type : ""); // 매장의 QR코드 타입, "OrderNumber": 주문번호 운영, "TableNumber": 테이블번호 운영
    const inputList = useRef<Array<HTMLInputElement | HTMLDivElement>>([]); // input 리스트 & button 타입

    // QR코드 타입 설정 함수
    function selectQRType(index: number, type: string) {
        setStoreType(type);
        let buttons = inputList.current[3].children;
        for (let i = 0; i < buttons.length; i++)
            i === index
                ? buttons[i].classList.add(styles.storeTypeActive)
                : buttons[i].classList.remove(styles.storeTypeActive);
    }

    // 입력받는 데이터 체크
    function inputDataCheck(data: any, index: number, type: string = "") {
        let result = [true, ""];
        if (type === "" && data === "") result = [false, "공백은 입력 할 수 없습니다."];
        else if (type === "table" && !tableCount) result = [false, "테이블 수를 입력하여 주세요."];
        else if (type === "type" && data === "") result = [false, "QR코드 타입을 선택해주세요."];

        // 해당 input 테두리 빨간색으로 지정
        if (!result[0]) {
            setSubmitDisable(true);
            inputList.current[index].classList.add(styles.storeRequire);
            setTimeout(() => {
                inputList.current[index].classList.remove(styles.storeRequire);
                setSubmitDisable(false);
            }, 4000);
        }
        return result;
    }

    // 매장 등록 함수
    function storeInput() {
        inputList.current.map((el) => (el.style.border = "1px solid #eaeaea"));

        let name = inputDataCheck(storeName.trim(), 0);
        let location = inputDataCheck(storeLocation.trim(), 1);
        let table = inputDataCheck(tableCount, 2, "table");
        let btn = inputDataCheck(storeType.trim(), 3, "type");

        !name[0] || !location[0] || !table[0] || !btn[0]
            ? alert(name[1] || location[1] || table[1] || btn[1])
            : setRegiIndex(1);

        // 매장 등록 or 수정
        props.name
            ? editStore(editPage, storeName, storeLocation, tableCount, storeType)
            : createStore(storeName, storeLocation, tableCount, storeType);
    }

    useEffect(() => {
        if (props.type) selectQRType(props.type === "TableNumber" ? 0 : 1, props.type);
    }, [props.type]);

    return LoginCheck() ? (
        <article className={styles.store}>
            <section className={styles.storeInfo}>
                <h1>{props.name ? "매장 수정" : "매장 등록"}</h1>
                {[
                    ["매장 명을 ", setStoreName, storeName],
                    ["매장 위치를 ", setStoreLocation, storeLocation],
                ].map((el, i) => (
                    <input
                        type="text"
                        placeholder={el[0] + "입력해주세요."}
                        onChange={(e) => (el[1] as Dispatch<SetStateAction<string>>)(e.target.value)}
                        value={el[2] as string}
                        minLength={1}
                        maxLength={40}
                        className={styles.storeInput}
                        ref={(el) => (inputList.current[i] = el!)}
                        key={"store-title-" + i}
                    />
                ))}
                <div className={styles.storeUseButton}>
                    <input
                        type="number"
                        placeholder="테이블 수를 입력해주세요."
                        onChange={(e) => setTableCount(Number(e.target.value))}
                        value={tableCount.toString()}
                        className={styles.storeInput}
                        ref={(el) => (inputList.current[2] = el!)}
                    />
                    <p>* QR 코드를 출력하여 각 테이블마다 붙여 사용하세요!</p>
                </div>
                <div className={styles.storeType} ref={(el) => (inputList.current[3] = el!)}>
                    {["TableNumber", "OrderNumber"].map((el, i) => (
                        <button onClick={() => selectQRType(i, el)} disabled={isSubmitDisable} key={"store-btns-" + i}>
                            <p>
                                {i ? "주문번호로" : "테이블번호로"}
                                <br />
                                운영되는
                            </p>
                            <p>QR코드</p>
                        </button>
                    ))}
                </div>
                <button className={styles.storeButton} onClick={storeInput} disabled={isSubmitDisable}>
                    다음
                </button>
            </section>
        </article>
    ) : null;
}
