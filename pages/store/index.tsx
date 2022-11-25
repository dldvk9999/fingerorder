import { useState } from "react";
import Image from "next/image";
import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Store() {
    const [storeName, setStoreName] = useState("");
    const [tableCount, setTableCount] = useState(0);
    const [tmpTableCount, setTmpTableCount] = useState(0);
    const [storeLocation, setStoreLocation] = useState("");
    const [category, setCategory] = useState<Array<string>>([]);
    const [tmpCategory, setTmpCategory] = useState("");
    const [isShowQR, setShowQR] = useState(false);
    const [isSubmit, setSubmit] = useState(false);

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

    // QR 리스트 출력
    function printQR() {
        let result = [];
        for (let i = 0; i < tableCount; i++) {
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
    function inputDataCheck(data: string, type: string = "") {
        const naming = /[^a-zA-Z가-힣0-9 ()]/;
        if (type === "category" && category.indexOf(data) > -1) {
            return [false, "중복해서 생성할 수 없습니다."];
        } else if (naming.exec(data)) {
            return [
                false,
                "이름은 알파벳, 숫자, 한글, 공백, 소괄호로만 지을 수 있습니다.",
            ];
        } else if (data === "") {
            return [false, "공백은 입력 할 수 없습니다."];
        } else if (data.length > 20) {
            return [false, "20자 이내로 입력해야 합니다."];
        } else {
            return [true, ""];
        }
    }

    // 카테고리 추가 함수 - 알파벳, 한글, 숫자, 공백, 소괄호만 가능
    function addCategory() {
        const data = tmpCategory.trim();
        const result = inputDataCheck(data, "category");

        if (!result[0]) {
            alert(result[1]);
        } else {
            setCategory([...category, data]);
        }
        setTmpCategory("");
    }

    // 매장 등록 함수
    function storeInput() {
        let name = inputDataCheck(storeName);
        let location = inputDataCheck(storeLocation);
        if (!name[0] || !location[0]) {
            alert(name[1] || location[1]);
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
                <h2>QR 코드 리스트</h2>
                <div className={styles.storeQRGrid}>{printQR()}</div>
                <button className={styles.storeQRDownload} onClick={downloadQR}>
                    QR 다운로드
                </button>
            </section>
        </main>
    ) : null;
}
