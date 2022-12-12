import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { registrationIndex } from "../../../states";
import styles from "./Category.module.scss";

export default function Category(props: { category: Array<string>; auth: boolean }) {
    const [_, setRegiIndex] = useRecoilState(registrationIndex);
    const [category, setCategory] = useState<Array<string>>([]); // 매장의 메뉴 카테고리
    const [tmpCategory, setTmpCategory] = useState(""); // 입력중인 매장의 메뉴 카테고리
    const [isSubmitDisable, setSubmitDisable] = useState(false);
    const [isEditIndex, setIsEditIndex] = useState(-1); // 수정 중인 카테고리의 Index
    const [isEdit, setIsEdit] = useState(false); // 현재 수정 중인지
    const inputList = useRef<HTMLInputElement>(null);
    const addBtn = useRef<HTMLButtonElement>(null);

    // 카테고리 입력했는지 체크 & 데이터 전송
    function submitCategory() {
        if (!category.length) alert("카테고리를 입력해주세요.");
        else setRegiIndex(2);
    }

    // 추가한 카테고리에서 삭제
    function deleteCategory(index: number) {
        if (confirm("선택하신 " + category[index] + " 카테고리를 삭제하시겠습니까?")) {
            let result = [];
            for (let i = 0; i < category.length; i++) if (i !== index) result.push(category[i]);
            setCategory(result);
        }
    }

    // 추가한 카테고리 수정
    function editCategory() {
        let tmp = category;
        tmp[isEditIndex] = tmpCategory;
        setCategory(tmp);
        setTmpCategory("");
        setIsEdit(false);
    }

    // 현재 상태 일반 <-> 수정 변환
    function changeEditStatus(index: number = -1) {
        setTmpCategory(index !== -1 ? category[index] : "");
        setIsEditIndex(index);
        setIsEdit(index !== -1 ? true : false);
    }

    // 카테고리 리스트 출력
    function printCategory() {
        let result = [];
        if (category.length) {
            for (let i = 0; i < category.length; i++) {
                result.push(
                    <div className={styles.categoryMenuListItem} key={"category-item-" + i}>
                        <h2>{category[i]}</h2>
                        <div>
                            <button onClick={() => changeEditStatus(!isEdit ? i : undefined)}>
                                {isEdit ? "취소" : "수정"}
                            </button>
                            <button onClick={() => deleteCategory(i)}>삭제</button>
                        </div>
                        {i !== category.length - 1 && <hr />}
                    </div>
                );
            }
        } else {
            result.push(
                <div className={styles.categoryMenuListItem} key={"category-item-no-exist"}>
                    <h2>카테고리를 추가해주세요.</h2>
                </div>
            );
        }
        return result;
    }

    // 입력받는 데이터 체크
    function inputDataCheck(data: any) {
        const naming = /[^a-zA-Z가-힣0-9 ()]/;
        let result = [true, ""];

        if (data === "") {
            result = [false, "공백은 입력 할 수 없습니다."];
        } else if (naming.exec(data)) {
            result = [false, "이름은 알파벳, 숫자, 한글, 공백, 소괄호로만 지을 수 있습니다."];
        } else if (data.length > 40) {
            result = [false, "40자 이내로 입력해야 합니다."];
        } else if (category.indexOf(data) > -1) {
            result = [false, "중복해서 생성할 수 없습니다."];
        }

        // 해당 input 테두리 및 추가 버튼 테두리 빨간색으로 지정
        if (!result[0]) {
            setSubmitDisable(true);
            addBtn.current!.classList.add(styles.categoryRequireAddBtn);
            inputList.current!.classList.add(styles.categoryRequire);
            setTimeout(() => {
                addBtn.current!.classList.remove(styles.categoryRequireAddBtn);
                inputList.current!.classList.remove(styles.categoryRequire);
                setSubmitDisable(false);
            }, 4000);
        }
        return result;
    }

    // 카테고리 추가 함수 - 알파벳, 한글, 숫자, 공백, 소괄호만 가능
    function addCategory() {
        const data = tmpCategory.trim();
        const result = inputDataCheck(data);

        !result[0] ? alert(result[1]) : setCategory([...category, data]);
        setTmpCategory("");
    }

    // 카테고리 input 창에서 엔터키 입력으로 추가 가능하게 하는 함수
    const onKeyPress = (e: { key: string }) => {
        if (e.key === "Enter" && !isSubmitDisable) addCategory();
    };

    useEffect(() => {
        // 접근 경로 체크
        if (!props.auth) {
            alert("서비스 등록을 통해 접근해주세요.");
            location.href = "/registration";
        }

        // category init
        setCategory(props.category ? props.category : []);
    }, []);

    return props.auth ? (
        <article className={styles.categoryMain}>
            <section className={styles.category}>
                <h1>카테고리 추가</h1>
                <div className={styles.categoryUseButton}>
                    <input
                        type="text"
                        placeholder="매장 메뉴의 카테고리를 입력해주세요 (ex. 찌개류, 고기류, 음료 등)"
                        onKeyPress={onKeyPress}
                        onChange={(e) => setTmpCategory(e.target.value)}
                        value={tmpCategory}
                        minLength={1}
                        maxLength={40}
                        className={styles.categoryInput}
                        ref={inputList}
                    />
                    {isEdit ? (
                        <button
                            className={styles.categoryInputButton}
                            onClick={() => editCategory()}
                            disabled={isSubmitDisable}
                            ref={addBtn}
                        >
                            수정
                        </button>
                    ) : (
                        <button
                            className={styles.categoryInputButton}
                            onClick={addCategory}
                            disabled={isSubmitDisable}
                            ref={addBtn}
                        >
                            추가
                        </button>
                    )}
                </div>

                <div className={styles.categoryMenuList}>
                    <p>메뉴 추가는 다음 Step에서 진행합니다.</p>
                    <div className={styles.categoryMenuListInnerBox}>{printCategory()}</div>
                </div>

                <div className={styles.storeButtons}>
                    <button onClick={() => setRegiIndex(0)} className={styles.storeButton} disabled={isSubmitDisable}>
                        이전
                    </button>
                    <button onClick={submitCategory} className={styles.storeButton} disabled={isSubmitDisable}>
                        다음
                    </button>
                </div>
            </section>
        </article>
    ) : null;
}
