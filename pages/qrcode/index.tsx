import { useEffect, useRef, useState } from "react";
import { useQRCode } from "next-qrcode";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import store from "../../data/store";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Qrcode.module.scss";

export default function QRCode(props: { tableCount: number; type: string }) {
    const [editPage, _] = useRecoilState(editNumber);
    const { Image } = useQRCode();
    const [isStoreManager, setStoreManager] = useState(true);
    const [isMobile, setMobile] = useState(true);
    const [tableCount, setTableCount] = useState(0);
    const [storeType, setStoreType] = useState("");
    const [STORE_ID, setStoreID] = useState(0);
    const storeQRDownload = useRef<HTMLButtonElement>(null);
    const STORE_MANAGER_ID = useRef(0);

    // QR 리스트 다운로드
    function downloadQR() {
        let qr = document.getElementById("QR");
        storeQRDownload.current!.style.display = "none";
        window.onbeforeprint = () => {
            document.body.innerHTML = qr!.innerHTML;
        };
        window.onafterprint = () => {
            location.href = "/mypage";
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
        const orderURL = "https://fingeroreder-order.netlify.app/";
        // const orderURL = "https://fingerorder.vercel.app/qrcode/test/";

        let result = [];
        const limit = index * 16 + 16;
        for (let i = index * 16; i < Math.min(limit, tableCount); i++) {
            let url = "";
            if (storeType === "TableNumber")
                url = orderURL + STORE_MANAGER_ID.current + "/" + STORE_ID + "/" + Number(i + 1);
            else url = orderURL + STORE_MANAGER_ID.current + "/" + STORE_ID + "/";

            result.push(
                <div className={styles.storeQRItem} key={"store-QR-" + i}>
                    <Image
                        text={url}
                        options={{
                            width: 100,
                        }}
                    />
                    <p>TABLE - {i + 1}</p>
                    <p className={styles.storeQRItemText}>QR코드를 스캔하여 자리에서 메뉴를 주문하세요!</p>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        // 모바일인지 체크
        setMobile(window.innerWidth >= 1200);
    }, []);

    useEffect(() => {
        setStoreID(editPage !== -1 ? store[editPage]?.id : 0);
    }, [editPage]);

    useEffect(() => {
        // 마이페이지를 통해 접근했는지 확인
        if (!props.tableCount && editPage === -1) {
            alert("마이페이지를 통해 접근해주세요.");
            location.href = "/mypage";
        } else {
            setTableCount(!props.tableCount ? store[editPage].table : props.tableCount);
            setStoreType(!props.type ? store[editPage].type : props.type);
        }
    }, [props.tableCount, props.type, editPage]);

    return LoginCheck() && isStoreManager ? (
        <main>
            <section id="QR" className={`${styles.storeQR} ${styles.storeQRActive}`}>
                {isMobile ? (
                    <>
                        {printQRList()}
                        <button className={styles.storeQRDownload} onClick={downloadQR}>
                            QR 다운로드
                        </button>
                    </>
                ) : (
                    <div className={styles.storeIsNotPCDiv}>
                        <h2 className={styles.storeIsNotPC}>QR 코드 리스트는 PC에서만 가능합니다.</h2>
                    </div>
                )}
            </section>
        </main>
    ) : null;
}
