import { useState } from "react";
import { modal } from "../../types/type";
import styles from "./Modal.module.scss";

export default function Modal(props: modal) {
    const [ect, setEct] = useState("");
    const [questClick, setQuestClick] = useState(Array.from({ length: props.checkboxList.length }, () => false));
    const [pass, setPass] = useState("");

    // useState Array update
    function updateQuestClick(index: number) {
        setQuestClick(questClick.map((el, i) => (i !== index ? el : !el)));
    }

    // modal close handler
    const handleCloseClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        props.onClose();
    };

    // modal accept handler
    const handleAcceptClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (props.isCheckbox) {
            let selected = "";
            for (let i = 0; i < props.checkboxList.length; i++) {
                if (questClick[i] && i === props.checkboxList.length - 1) selected += ect + "\n";
                else if (questClick[i]) selected += props.checkboxList[i] + "\n";
            }

            if (selected === "") alert("체크 사항에 하나라도 기재 부탁드립니다.");
            else if (questClick[questClick.length - 1] && ect === "") alert("기타 사항에 입력 부탁드립니다.");
            else {
                alert(selected);
                alert(props.accept + "가 완료되었습니다.");
                props.onAccept(pass);
            }
        }
    };

    return (
        <main className={styles.modalBackground}>
            <section className={styles.modal}>
                <h1>{props.h1}</h1>
                <div className={styles.modalBody}>
                    <h2>{props.h2}</h2>
                    <p>{props.children}</p>
                    <p>{props.subChildren}</p>
                    <div>
                        {props.isCheckbox &&
                            props.checkboxList.map((_, i) => (
                                <div className={styles.modalCheckboxRow} key={"modal-checkbox-" + i}>
                                    <input id={"checkbox-" + i} className={styles.modalCheckbox} type="checkbox" />
                                    <label
                                        htmlFor={"checkbox-" + i}
                                        className={styles.modalLabel}
                                        onClick={() => updateQuestClick(i)}
                                    >
                                        {questClick[i] ? "✔" : ""}
                                    </label>
                                    {props.checkboxList[i]}
                                </div>
                            ))}
                    </div>
                    <textarea
                        className={styles.modalTextarea}
                        onChange={(e) => setEct(e.target.value)}
                        disabled={!questClick[questClick.length - 1]}
                    ></textarea>
                </div>
                <div className={styles.modalPassword}>
                    <p>비밀번호 확인</p>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <div className={styles.modalBtn}>
                    <button onClick={handleCloseClick}>{props.cancel}</button>
                    <button onClick={handleAcceptClick}>{props.accept}</button>
                </div>
            </section>
        </main>
    );
}
