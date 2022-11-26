import { SetStateAction, useEffect, useState } from "react";
import QRCode from "../qrcode";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Store.module.scss";

export default function Store(props: {
    name: SetStateAction<string>;
    tableCount: SetStateAction<number>;
    tmpTableCount: SetStateAction<number>;
    location: SetStateAction<string>;
    category: SetStateAction<string[]>;
}) {
    const [storeName, setStoreName] = useState(""); // 매장 이름
    const [tableCount, setTableCount] = useState(0); // 매장 테이블 수
    const [tmpTableCount, setTmpTableCount] = useState(0); // 입력중인 매장 테이블 수
    const [storeLocation, setStoreLocation] = useState(""); // 매장 위치
    const [category, setCategory] = useState<Array<string>>([]); // 매장의 메뉴 카테고리
    const [tmpCategory, setTmpCategory] = useState(""); // 입력중인 매장의 메뉴 카테고리
    const [isShowQR, setShowQR] = useState(false); // QR 레이아웃을 보여줄 것인지
    const [isSubmit, setSubmit] = useState(false); // 매장 등록 or 수정 버튼을 클릭했는지
    const [inputList, setStatusInput] = useState<NodeListOf<HTMLElement>>(); // input 리스트
    const [addBtn, setAddBtn] = useState<HTMLElement>(); // category add button
    const [isSubmitDisable, setSubmitDisable] = useState(false); // Submit 버튼 disable 유뮤 (Require 미 입력으로 Submit시 4초 disable)

    // QR 코드 생성 시 레이아웃 변경 후 QR 생성
    function QRLayout() {
        setTableCount(tmpTableCount);
        setShowQR(true);
    }

    // 추가한 카테고리에서 삭제
    function deleteCategory(index: number) {
        if (
            confirm(
                "선택하신 " + category[index] + " 카테고리를 삭제하시겠습니까?"
            )
        ) {
            let result = [];
            for (let i = 0; i < category.length; i++) {
                if (i !== index) {
                    result.push(category[i]);
                }
            }
            setCategory(result);
        }
    }

    // 추가한 카테고리를 보여주는 블록 출력 함수
    function blockCategory() {
        let result = [];
        for (let i = 0; i < category.length; i++) {
            result.push(
                <button
                    className={styles.storeCategoryBlock}
                    onClick={() => deleteCategory(i)}
                    disabled={isSubmit}
                    key={"store-category-block-" + i}
                >
                    {category[i]}
                </button>
            );
        }
        return result;
    }

    // 입력받는 데이터 체크
    function inputDataCheck(data: any, index: number, type: string = "") {
        const naming = /[^a-zA-Z가-힣0-9 ()]/;
        let result = [true, ""];

        // 카테고리나 매장 명, 매장 위치
        if (type === "category" || type === "") {
            if (type === "category" && category.indexOf(data) > -1) {
                result = [false, "중복해서 생성할 수 없습니다."];
            } else if (naming.exec(data)) {
                result = [
                    false,
                    "이름은 알파벳, 숫자, 한글, 공백, 소괄호로만 지을 수 있습니다.",
                ];
            } else if (data === "") {
                result = [false, "공백은 입력 할 수 없습니다."];
            } else if (data.length > 40) {
                result = [false, "40자 이내로 입력해야 합니다."];
            }
        }
        // 매장 테이블
        else if (type === "table" && !tmpTableCount) {
            result = [false, "테이블 수를 입력하여 주세요."];
        }

        // 해당 input 테두리 빨간색으로 지정
        if (!result[0]) {
            setSubmitDisable(true);
            inputList![index].classList.add(styles.storeRequire);
            setTimeout(() => {
                inputList![index].classList.remove(styles.storeRequire);
                setSubmitDisable(false);
            }, 4000);
        }
        // 카테고리에 추가 버튼 테두리 지정
        if (index === 3 && !result[0]) {
            let addBtn = document.querySelector<HTMLElement>(
                "." + styles.storeInputButton
            );
            setSubmitDisable(true);
            addBtn?.classList.add(styles.storeRequireAddBtn);
            setTimeout(() => {
                addBtn?.classList.remove(styles.storeRequireAddBtn);
                setSubmitDisable(false);
            }, 4000);
        }
        return result;
    }

    // 카테고리 추가 함수 - 알파벳, 한글, 숫자, 공백, 소괄호만 가능
    function addCategory() {
        const data = tmpCategory.trim();
        const result = inputDataCheck(data, 3, "category");

        if (!result[0]) {
            alert(result[1]);
        } else {
            setCategory([...category, data]);
        }
        setTmpCategory("");
    }

    // 매장 등록 함수
    function storeInput() {
        for (let i = 0; i < inputList!.length; i++) {
            inputList![i].style.border = "1px solid #eaeaea";
        }
        addBtn!.style.borderTopColor = "#eaeaea";
        addBtn!.style.borderRightColor = "#eaeaea";
        addBtn!.style.borderBottomColor = "#eaeaea";

        let name = inputDataCheck(storeName, 0);
        let table = inputDataCheck(tmpTableCount, 1, "table");
        let location = inputDataCheck(storeLocation, 2);
        if (!name[0] || !location[0] || !table[0]) {
            alert(name[1] || location[1] || table[1]);
            return;
        } else if (category.length < 1) {
            alert("카테고리를 입력하여 주세요.");
            return;
        }

        setTmpCategory("");

        setSubmit(true);

        // QR 코드 생성
        QRLayout();
        alert("store input complete");
    }

    // 카테고리 input 창에서 엔터키 입력으로 추가 가능하게 하는 함수
    const onKeyPress = (e: { key: string }) => {
        if (e.key === "Enter") {
            addCategory();
        }
    };

    useEffect(() => {
        // input 영역 변수로 저장
        setStatusInput(
            document.querySelectorAll<HTMLElement>("." + styles.storeInput)
        );
        // Category Add Btn
        setAddBtn(
            document.querySelector<HTMLElement>("." + styles.storeInputButton)!
        );

        // Data init
        setStoreName(props.name ? props.name : "");
        setTableCount(props.tableCount ? props.tableCount : 0);
        setTmpTableCount(props.tmpTableCount ? props.tmpTableCount : 0);
        setStoreLocation(props.location ? props.location : "");
        setCategory(props.category ? props.category : []);
    }, []);

    return LoginCheck() ? (
        <main className={styles.store}>
            {/* Section 1. Store Info & Input */}
            <section className={styles.storeInfo}>
                <h1>매장 등록</h1>
                <input
                    type="text"
                    placeholder="매장 명"
                    onChange={(e) => setStoreName(e.target.value)}
                    value={storeName}
                    className={styles.storeInput}
                />
                <div className={styles.storeUseButton}>
                    <input
                        type="number"
                        placeholder="테이블 수"
                        onChange={(e) =>
                            setTmpTableCount(Number(e.target.value))
                        }
                        value={tmpTableCount}
                        className={styles.storeInput}
                    />
                    <p>* QR 코드를 출력하여 각 테이블마다 붙여 사용하세요!</p>
                </div>
                <input
                    type="text"
                    placeholder="매장 위치"
                    onChange={(e) => setStoreLocation(e.target.value)}
                    value={storeLocation}
                    className={styles.storeInput}
                />
                <div className={styles.storeUseButton}>
                    <input
                        type="text"
                        placeholder="카테고리"
                        onKeyPress={onKeyPress}
                        onChange={(e) => setTmpCategory(e.target.value)}
                        value={tmpCategory}
                        className={styles.storeInput}
                    />
                    <p>
                        * 매장 메뉴의 카테고리를 입력해주세요 (ex. 찌개류,
                        고기류, 음료 등)
                    </p>
                    <button
                        className={styles.storeInputButton}
                        onClick={addCategory}
                        disabled={isSubmitDisable}
                    >
                        추가
                    </button>
                </div>
                <div className={styles.storeCategoryBlocks}>
                    {blockCategory()}
                </div>
                {!isSubmit && (
                    <button
                        className={styles.storeButton}
                        onClick={storeInput}
                        disabled={isSubmitDisable}
                    >
                        매장 등록
                    </button>
                )}
            </section>

            {/* Section 2. QR */}
            {isShowQR && <QRCode tableCount={tableCount} />}
        </main>
    ) : null;
}
