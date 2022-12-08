import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { registrationIndex } from "../../states";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Store.module.scss";

export default function Store(props: {
    auth: boolean;
    name: SetStateAction<string>;
    tableCount: SetStateAction<number>;
    tmpTableCount: SetStateAction<number>;
    location: SetStateAction<string>;
    type: string;
}) {
    const [_, setRegiIndex] = useRecoilState(registrationIndex);
    const [storeName, setStoreName] = useState(""); // 매장 이름
    const [tableCount, setTableCount] = useState(0); // 매장 테이블 수
    const [tmpTableCount, setTmpTableCount] = useState(0); // 입력중인 매장 테이블 수
    const [storeLocation, setStoreLocation] = useState(""); // 매장 위치
    const [inputList, setStatusInput] = useState<NodeListOf<HTMLElement>>(); // input 리스트
    const [isSubmitDisable, setSubmitDisable] = useState(false); // Submit 버튼 disable 유뮤 (Require 미 입력으로 Submit시 4초 disable)
    const [storeType, setStoreType] = useState(""); // 매장의 QR코드 타입, "OrderNumber": 주문번호 운영, "TableNumber": 테이블번호 운영

    // QR코드 타입 설정 함수
    function selectQRType(index: number, type: string) {
        setStoreType(type);
        let buttons = document.querySelector("." + styles.storeType)!.children;
        for (let i = 0; i < buttons.length; i++) {
            if (i === index) buttons[i].classList.add(styles.storeTypeActive);
            else buttons[i].classList.remove(styles.storeTypeActive);
        }
    }

    // 입력받는 데이터 체크
    function inputDataCheck(data: any, index: number, type: string = "") {
        let result = [true, ""];

        // 카테고리나 매장 명, 매장 위치
        if (type === "" && data === "") result = [false, "공백은 입력 할 수 없습니다."];
        // 매장 테이블
        else if (type === "table" && !tmpTableCount) result = [false, "테이블 수를 입력하여 주세요."];
        // type 버튼
        else if (type === "type" && data === "") result = [false, "QR코드 타입을 선택해주세요."];

        // type 버튼 테두리 빨간색으로 지정
        if (type === "type" && !result[0]) {
            setSubmitDisable(true);
            let b = document.querySelector<HTMLElement>("." + styles.storeType);
            b?.classList.add(styles.storeRequire);
            setTimeout(() => {
                b?.classList.remove(styles.storeRequire);
                setSubmitDisable(false);
            }, 4000);
        }
        // 해당 input 테두리 빨간색으로 지정
        else if (!result[0]) {
            setSubmitDisable(true);
            inputList![index].classList.add(styles.storeRequire);
            setTimeout(() => {
                inputList![index].classList.remove(styles.storeRequire);
                setSubmitDisable(false);
            }, 4000);
        }
        return result;
    }

    // 매장 등록 함수
    function storeInput() {
        for (let i = 0; i < inputList!.length; i++) inputList![i].style.border = "1px solid #eaeaea";

        let name = inputDataCheck(storeName.trim(), 0);
        let location = inputDataCheck(storeLocation.trim(), 1);
        let table = inputDataCheck(tmpTableCount, 2, "table");
        let btn = inputDataCheck(storeType.trim(), -1, "type");
        if (!name[0] || !location[0] || !table[0] || !btn[0]) {
            alert(name[1] || location[1] || table[1] || !btn[0]);
            return;
        }

        setTableCount(tmpTableCount);

        //서비스 등록 화면 슬라이드
        setRegiIndex(1);
    }

    useEffect(() => {
        // 접근 경로 체크
        if (!props.auth) {
            alert("서비스 등록을 통해 접근해주세요.");
            location.href = "/registration";
        }

        // input 영역 변수로 저장
        setStatusInput(document.querySelectorAll<HTMLElement>("." + styles.storeInput));
    }, []);

    useEffect(() => {
        // Data init
        setStoreName(props.name ? props.name : "");
        setTableCount(props.tableCount ? props.tableCount : 0);
        setTmpTableCount(props.tmpTableCount ? props.tmpTableCount : 0);
        setStoreLocation(props.location ? props.location : "");
        setStoreType(props.type ? props.type : "");

        if (props.type) selectQRType(props.type === "TableNumber" ? 0 : 1, props.type);
    }, [props.name, props.tableCount, props.tmpTableCount, props.location, props.type]);

    return LoginCheck() && props.auth ? (
        <main className={styles.store}>
            <section className={styles.storeInfo}>
                <h1>{props.name ? "매장 수정" : "매장 등록"}</h1>
                <input
                    type="text"
                    placeholder="매장 명을 입력해주세요."
                    onChange={(e) => setStoreName(e.target.value)}
                    value={storeName}
                    minLength={1}
                    maxLength={40}
                    className={styles.storeInput}
                />
                <input
                    type="text"
                    placeholder="매장 위치를 입력해주세요."
                    onChange={(e) => setStoreLocation(e.target.value)}
                    value={storeLocation}
                    minLength={1}
                    maxLength={40}
                    className={styles.storeInput}
                />
                <div className={styles.storeUseButton}>
                    <input
                        type="number"
                        placeholder="테이블 수를 입력해주세요."
                        onChange={(e) => setTmpTableCount(Number(e.target.value))}
                        value={tmpTableCount}
                        className={styles.storeInput}
                    />
                    <p>* QR 코드를 출력하여 각 테이블마다 붙여 사용하세요!</p>
                </div>
                <div className={styles.storeType}>
                    <button onClick={() => selectQRType(0, "TableNumber")} disabled={isSubmitDisable}>
                        <p>
                            테이블번호로
                            <br />
                            운영되는
                        </p>
                        <p>QR코드</p>
                    </button>
                    <button onClick={() => selectQRType(1, "OrderNumber")} disabled={isSubmitDisable}>
                        <p>
                            주문번호로
                            <br />
                            운영되는
                        </p>
                        <p>QR코드</p>
                    </button>
                </div>
                <button className={styles.storeButton} onClick={storeInput} disabled={isSubmitDisable}>
                    다음
                </button>
            </section>
        </main>
    ) : null;
}
