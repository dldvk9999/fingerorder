import { useState } from "react";
import styles from "../styles/pages/Modal.module.scss";

type modal = {
    h1: string;
    h2: string;
    isCheckbox: boolean;
    cancel: string;
    accept: string;
    children: string;
    onClose: Function;
    subChildren: string;
    checkboxList: Array<string>;
};

export default function Modal({
    h1,
    h2,
    isCheckbox,
    cancel,
    accept,
    children,
    onClose,
    subChildren = "",
    checkboxList = [],
}: modal) {
    const [questClick, setQuestClick] = useState(
        Array.from({ length: checkboxList.length }, () => false)
    );
    const [ect, setEct] = useState("");

    // useState Array update
    function updateQuestClick(index: number) {
        let tmp = [...questClick];
        tmp[index] = !tmp[index];
        setQuestClick(tmp);
    }

    // 체크박스 출력
    function printCheckbox() {
        let result = [];
        for (let i = 0; i < checkboxList.length; i++) {
            result.push(
                <div
                    className={styles.modalCheckboxRow}
                    key={"modal-checkbox-" + i}
                >
                    <input
                        id={"checkbox-" + i}
                        className={styles.modalCheckbox}
                        type="checkbox"
                    />
                    <label
                        htmlFor={"checkbox-" + i}
                        className={styles.modalLabel}
                        onClick={() => updateQuestClick(i)}
                    >
                        {questClick[i] ? "✔" : ""}
                    </label>
                    {checkboxList[i]}
                </div>
            );
        }
        return result;
    }

    // modal close handler
    const handleCloseClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        onClose();
    };

    // modal accept handler
    const handleAcceptClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        let selected = "";
        for (let i = 0; i < checkboxList.length; i++) {
            if (questClick[i] && i === checkboxList.length - 1)
                selected += ect + "\n";
            else if (questClick[i]) selected += checkboxList[i] + "\n";
        }
        alert(selected);
        alert("탈퇴가 완료되었습니다.");
        onClose();
    };

    return (
        <main className={styles.modalBackground}>
            <section className={styles.modal}>
                <h1>{h1}</h1>
                <div className={styles.modalBody}>
                    <h2>{h2}</h2>
                    <p>{children}</p>
                    <p>{subChildren}</p>
                    <div>{isCheckbox && printCheckbox()}</div>
                    <textarea
                        className={styles.modalTextarea}
                        onChange={(e) => setEct(e.target.value)}
                        disabled={!questClick[questClick.length - 1]}
                    ></textarea>
                </div>
                <div className={styles.modalBtn}>
                    <button onClick={handleCloseClick}>{cancel}</button>
                    <button onClick={handleAcceptClick}>{accept}</button>
                </div>
            </section>
        </main>
    );
}
