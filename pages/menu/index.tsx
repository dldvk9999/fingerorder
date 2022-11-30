import Image from "next/image";
import store from "../../data/store";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Menu.module.scss";
import { useEffect, useState } from "react";

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

export default function Menu() {
    const [storeID, setStoreID] = useState(-1);
    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDesc, setItemDesc] = useState("");
    const [itemImage, setItemImage] = useState<any>();
    const [isMobile, setMobile] = useState(false);
    const [isDisableBtn, setDisableBtn] = useState(false);
    const [searchName, setSearchName] = useState("");

    // 왼쪽에 선택한 아이템이나 입력한 아이템 모두 리셋
    function editReset() {
        setCategory("");
        setItemName("");
        setItemPrice(0);
        setItemDesc("");
        setItemImage("");
    }

    // 수정 버튼 클릭 시 해당 아이템 정보 가져옴
    function menuEdit(categoryIndex: string, name: string, price: number, desc: string, image: string) {
        setCategory(categoryIndex);
        setItemName(name);
        setItemPrice(price);
        setItemDesc(desc);
        setItemImage("/sample_menu/" + image);
    }

    // 메뉴 추가 함수
    function addMenu() {
        // 정규식으로 이름만 체크함
        const naming = /[^a-zA-Z가-힣0-9 ()]/;
        if (naming.exec(itemName)) {
            alert("이름은 알파벳, 숫자, 한글, 공백, 소괄호로만 지을 수 있습니다.");
            setItemName("");

            setDisableBtn(true);
            let name = document.querySelector("#menuName");
            name?.classList.add(styles.menuInputRequire);
            setTimeout(() => {
                setDisableBtn(false);
                let name = document.querySelector("#menuName");
                name?.classList.remove(styles.menuInputRequire);
            }, 4000);
            return;
        } else {
            editReset();
            alert("메뉴 추가 완료하였습니다.");
        }
    }

    // 매장에 있는 메뉴 - 세부 아이템 출력
    function printStoreMenuListItem(category: string) {
        let result = [];
        if (storeID !== -1) {
            const menu = store[storeID - 1].menu as unknown as menu;
            if (menu[category].length) {
                let tmp = Array.from({ length: menu[category].length }, () => false);
                for (let i = 0; i < menu[category].length; i++) {
                    const menuCategory = menu[category][i] as menuList;
                    if (menuCategory.name.includes(searchName)) {
                        tmp[i] = menuCategory.soldout;
                        result.push(
                            <div className={styles.menuItem} key={"menu-list-" + i}>
                                <Image
                                    src={"/sample_menu/" + menuCategory.image}
                                    alt={menuCategory.name}
                                    width={75}
                                    height={75}
                                    className={styles.menuItemImage}
                                    priority
                                />
                                <div className={styles.menuItemNamePrice}>
                                    <p>
                                        {menuCategory.name}
                                        {menuCategory.soldout && <span className={styles.menuItemSoldout}>품절</span>}
                                    </p>
                                    <p>{menuCategory.desc}</p>
                                    <p>{menuCategory.price}원</p>
                                </div>
                                <div className={styles.menuItemBtns}>
                                    <button
                                        className={styles.menuItemBtn}
                                        onClick={() =>
                                            menuEdit(
                                                category,
                                                menuCategory.name,
                                                menuCategory.price,
                                                menuCategory.desc,
                                                menuCategory.image
                                            )
                                        }
                                    >
                                        수정
                                    </button>
                                    <button
                                        className={styles.menuItemBtn}
                                        onClick={() => {
                                            if (confirm("삭제하시겠습니까?")) alert("삭제 완료하였습니다.");
                                        }}
                                    >
                                        삭제
                                    </button>
                                    <button
                                        className={styles.menuItemBtn}
                                        onClick={() => alert("품절처리 완료하였습니다.")}
                                    >
                                        품절
                                    </button>
                                </div>
                            </div>
                        );
                    }
                }
            } else {
                result.push(
                    <div className={styles.menuItemNoExist} key={"menu-list-no-exist"}>
                        상품이 없습니다.
                    </div>
                );
            }
        }
        return result;
    }

    // 매장에 있는 메뉴 목록 출력
    function printStoreMenuList() {
        let result = [];
        if (storeID !== -1) {
            for (let i = 0; i < store[storeID - 1].category.length; i++) {
                result.push(
                    <div className={styles.menuItemHeader} key={"menu-list-header-" + i}>
                        {i !== 0 && <hr />}
                        <h3>{store[storeID - 1].category[i]}</h3>
                        {printStoreMenuListItem(store[storeID - 1].category[i])}
                    </div>
                );
            }
        } else {
            result.push(
                <h3 key={"menu-list-no-select-store"}>
                    {isMobile ? "상단에서 매장을 선택해주세요." : "왼쪽에서 매장을 선택해주세요."}
                </h3>
            );
        }
        return result;
    }

    // 선택한 매장 ID의 카테고리를 드롭다운 선택
    function printStoreCategory() {
        let result = [];
        result.push(
            <option value={""} hidden key={"menu-storeCategory-default"}>
                카테고리를 선택해주세요.
            </option>
        );
        if (storeID !== -1) {
            for (let i = 0; i < store[storeID - 1].category.length; i++) {
                result.push(
                    <option value={store[storeID - 1].category[i]} key={"menu-storeCategory-" + i}>
                        {i + 1}. {store[storeID - 1].category[i]}
                    </option>
                );
            }
        }
        return result;
    }

    // 매장 ID 검색 후 드롭다운 선택
    function printStoreID() {
        let result = [];
        result.push(
            <option value={-1} hidden key={"menu-storeID-default"}>
                매장 ID를 선택해주세요.
            </option>
        );
        for (let i = 0; i < store.length; i++) {
            result.push(
                <option value={store[i].id} key={"menu-storeID-" + i}>
                    {store[i].id}. {store[i].name}
                </option>
            );
        }
        return result;
    }

    // 이미지 파일 업로드 시 미리보기 함수
    function readImage(input: any) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setItemImage(e.target!.result);
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            setItemImage("");
        }
    }

    useEffect(() => {
        // 모바일 인지 아닌지 (width 800px 기준)
        setMobile(window.innerWidth < 800);
        window.onresize = () => {
            setMobile(window.innerWidth < 800);
        };
    }, []);

    return LoginCheck() ? (
        <main>
            <div className={styles.menu}>
                <section className={styles.menuInfo}>
                    <h1>
                        메뉴 등록
                        <span>
                            <button onClick={editReset}>
                                <Image src={"/reload.webp"} alt={"reload"} width={25} height={25} />
                            </button>
                        </span>
                    </h1>
                    <div className={styles.menuInputImageP}>
                        <Image
                            id="preview-image"
                            src={itemImage ? itemImage : "/sample_menu/이미지추가.png"}
                            alt={"preview image"}
                            width={150}
                            height={150}
                            className={`${styles.menuInputImage} ${!itemImage && styles.menuInputHide}`}
                            priority
                        />
                        <div className={styles.menuInputImageInput}>
                            <input
                                id="files"
                                type="file"
                                accept="image/*"
                                onChange={(e) => readImage(e.target)}
                                className={`${styles.menuInputImage} ${styles.menuInputHideDisplay}`}
                            />
                            <label
                                htmlFor="files"
                                className={`${styles.menuInputImage} ${itemImage && styles.menuInputHide}`}
                            ></label>
                            <p className={itemImage && styles.menuInputHideDisplay}>이미지 추가</p>
                        </div>
                    </div>
                    <select
                        value={storeID}
                        onChange={(e) => setStoreID(Number(e.target.value))}
                        className={`${styles.menuInput} ${styles.menuInputSelect} ${
                            storeID === -1 && styles.menuInputFirstSelect
                        }`}
                    >
                        {printStoreID()}
                    </select>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`${styles.menuInput} ${styles.menuInputSelect}`}
                        disabled={storeID === -1}
                    >
                        {printStoreCategory()}
                    </select>
                    <input
                        id="menuName"
                        type="text"
                        placeholder="메뉴 이름"
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                        disabled={storeID === -1 || category === ""}
                        className={styles.menuInput}
                    />
                    <input
                        type="number"
                        placeholder="가격"
                        onChange={(e) => setItemPrice(Number(e.target.value))}
                        value={itemPrice}
                        disabled={storeID === -1 || category === ""}
                        className={styles.menuInput}
                    />
                    <textarea
                        placeholder="메뉴 설명"
                        onChange={(e) => setItemDesc(e.target.value)}
                        value={itemDesc}
                        disabled={storeID === -1 || category === ""}
                        className={`${styles.menuInput} ${styles.menuInputTextarea}`}
                    />
                    <button className={styles.menuAddBtn} onClick={() => addMenu()} disabled={isDisableBtn}>
                        메뉴 추가
                    </button>
                </section>

                <section className={styles.menuList}>
                    <h2>메뉴 리스트</h2>
                    <div className={styles.menuItemCategory}>
                        <input
                            type="text"
                            placeholder="메뉴 이름 검색"
                            onChange={(e) => setSearchName(e.target.value)}
                            className={styles.menuItemSearch}
                        />
                        <div>{printStoreMenuList()}</div>
                    </div>
                </section>
            </div>
        </main>
    ) : null;
}
