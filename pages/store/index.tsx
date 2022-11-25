import { useEffect, useState } from "react";
import Image from "next/image";
import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Store() {
    const [storeName, setStoreName] = useState(""); // 매장 이름
    const [tableCount, setTableCount] = useState(0); // 매장 테이블 수
    const [tmpTableCount, setTmpTableCount] = useState(0); // 입력중인 매장 테이블 수
    const [storeLocation, setStoreLocation] = useState(""); // 매장 위치
    const [category, setCategory] = useState<Array<string>>([]); // 매장의 메뉴 카테고리
    const [tmpCategory, setTmpCategory] = useState(""); // 입력중인 매장의 메뉴 카테고리
    const [isShowQR, setShowQR] = useState(false); // QR 레이아웃을 보여줄 것인지
    const [isSubmit, setSubmit] = useState(false); // 매장 등록 or 수정 버튼을 클릭했는지
    const [isMobile, setMobile] = useState(true); // 모바일인지 (가로길이 1200 이하)
    const [inputList, setStatusInput] = useState<NodeListOf<HTMLElement>>(); // input 리스트

    // QR 리스트 다운로드
    function downloadQR() {
        let qr = document.getElementById("QR");
        let btn = document.querySelector<HTMLElement>(
            "." + styles.storeQRDownload
        );
        btn!.style.display = "none";
        let printDiv = qr!.innerHTML;
        window.onbeforeprint = () => {
            document.body.innerHTML = printDiv;
        };
        window.onafterprint = () => {
            location.href = "/menu";
        };
        window.print();
    }

    // QR 리스트 출력 (헤더 포함)
    function printQRList() {
        let result = [];
        for (let i = 0; i < Number(tableCount / 16); i++) {
            result.push(
                <div key={"store-QR-list-" + i}>
                    <h2>QR 코드 리스트 - {i + 1}</h2>
                    <div className={styles.storeQRGrid}>{printQR(i)}</div>
                </div>
            );
        }
        return result;
    }

    // QR 리스트 출력
    function printQR(index: number) {
        let result = [];
        const limit = index * 16 + 16;
        for (let i = index * 16; i < Math.min(limit, tableCount); i++) {
            result.push(
                <div className={styles.storeQRItem} key={"store-QR-" + i}>
                    <Image
                        src={"/QR_sample.webp"}
                        alt={"QR_sample"}
                        width={100}
                        height={100}
                    />
                    <p>TABLE - {i + 1}</p>
                    <p className={styles.storeQRItemText}>
                        QR코드를 스캔하여 자리에서 메뉴를 주문하세요!
                    </p>
                </div>
            );
        }
        return result;
    }
    // QR 코드 생성 시 레이아웃 변경 후 QR 생성
    function QRLayout() {
        setShowQR(true);
        setTableCount(tmpTableCount);
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

        if (!result[0]) {
            inputList![index].style.border = "1px solid red";
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
        // 모바일인지 체크
        setMobile(window.innerWidth >= 1200);
        // input 영역 변수로 저장
        setStatusInput(
            document.querySelectorAll<HTMLElement>("." + styles.storeInput)
        );
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
                    className={styles.storeInput}
                />
                <div className={styles.storeUseButton}>
                    <input
                        type="number"
                        placeholder="테이블 수"
                        onChange={(e) =>
                            setTmpTableCount(Number(e.target.value))
                        }
                        className={styles.storeInput}
                    />
                    <p>* QR 코드를 출력하여 각 테이블마다 붙여 사용하세요!</p>
                </div>
                <input
                    type="text"
                    placeholder="매장 위치"
                    onChange={(e) => setStoreLocation(e.target.value)}
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
                    >
                        추가
                    </button>
                </div>
                <div className={styles.storeCategoryBlocks}>
                    {blockCategory()}
                </div>
                {!isSubmit && (
                    <button className={styles.storeButton} onClick={storeInput}>
                        매장 등록
                    </button>
                )}
            </section>

            {/* Section 2. QR */}
            <section
                id="QR"
                className={`${styles.storeQR} ${
                    isShowQR && styles.storeQRActive
                }`}
            >
                {isMobile ? (
                    <>
                        {printQRList()}
                        <button
                            className={styles.storeQRDownload}
                            onClick={downloadQR}
                        >
                            QR 다운로드
                        </button>
                    </>
                ) : (
                    <h2>QR 코드 리스트는 PC에서만 가능합니다.</h2>
                )}
            </section>
        </main>
    ) : null;
}
