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
    const [nowStore, setStore] = useState(store);
    const [storeID, setStoreID] = useState(-1); // 매장 ID
    const [category, setCategory] = useState(""); // 매장의 카테고리
    const [itemName, setItemName] = useState(""); // 메뉴 이름
    const [itemPrice, setItemPrice] = useState(0); // 메뉴 가격
    const [itemDesc, setItemDesc] = useState(""); // 메뉴 설명
    const [itemImage, setItemImage] = useState(""); // 메뉴 이미지
    const [isMobile, setMobile] = useState(0); // 모바일 인지 아닌지 (width 800px 기준)
    const [isDisableBtn, setDisableBtn] = useState(false); // Input 값이 유효하지 않을 때 잠시 Btn을 disable 시킴 (4초)
    const [searchName, setSearchName] = useState(""); // 검색할 텍스트

    // 메뉴 삭제 함수
    function deleteMenu(index: number, cate: string) {
        let storeInfo = nowStore[storeID - 1];
        let menu = storeInfo.menu as unknown as menu;
        let menuCategory = menu[cate] as Array<menuList>;
        if (confirm(menuCategory[index].name + " 메뉴를 삭제하시겠습니까?")) {
            menuCategory = menuCategory.slice(0, index).concat(menuCategory.slice(index + 1, menuCategory.length));
            menu[cate] = menuCategory;
            storeInfo.menu = menu as any;
            setStore(
                nowStore
                    .slice(0, storeID - 1)
                    .concat(storeInfo)
                    .concat(nowStore.slice(storeID, nowStore.length))
            );
            alert("메뉴를 삭제하였습니다.");
        }
    }

    // 수정 버튼 클릭 시 해당 아이템 정보 가져옴
    function menuEdit(categoryIndex: string, name: string, price: number, desc: string, image: string) {
        setCategory(categoryIndex);
        setItemName(name);
        setItemPrice(price);
        setItemDesc(desc);
        setItemImage(image);
    }

    // 메뉴 추가 함수
    function addMenu(cate: string) {
        if (storeID !== -1 && category !== "" && confirm("메뉴를 추가하시겠습니까?")) {
            // 정규식으로 이름만 체크함
            const naming = /[^a-zA-Z가-힣0-9 ()]/;
            if (itemName.trim() === "" || naming.exec(itemName)) {
                alert("이름은 알파벳, 숫자, 한글, 공백, 소괄호로만 지을 수 있습니다.");
                setItemName("");

                // 메뉴 추가 버튼을 잠시 disable 시킨 뒤 이름 Input 박스에 빨간색 border animation
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
                let storeInfo = nowStore[storeID - 1];
                let menu = storeInfo.menu as unknown as menu;
                const imagePath =
                    itemImage.trim() === "" || itemImage.length > 100 ? "/sample_menu/fingerorder.webp" : itemImage;

                menu[cate] = [
                    ...menu[cate],
                    {
                        name: itemName,
                        price: itemPrice,
                        desc: itemDesc,
                        image: imagePath,
                        soldout: false,
                    },
                ];
                storeInfo.menu = menu as any;
                setStore(
                    nowStore
                        .slice(0, storeID - 1)
                        .concat(storeInfo)
                        .concat(nowStore.slice(storeID, nowStore.length))
                );

                menuEdit("", "", 0, "", "");
                setItemImage("");
                alert("메뉴 추가 완료하였습니다.");
            }
        } else {
            alert("매장 ID와 카테고리를 먼저 선택해주세요.");
        }
    }

    // 매장에 있는 메뉴 - 세부 아이템 출력
    function printStoreMenuListItem(category: string) {
        let result = [];
        const menu = nowStore[storeID - 1].menu as unknown as menu;

        // 만약 매장 - 카테고리 내 메뉴의 개수가 1이상일 경우(즉, 메뉴가 존재할 경우)
        if (menu[category].length) {
            let tmp = Array.from({ length: menu[category].length }, () => false);

            // 모든 메뉴를 for문으로 print
            for (let i = 0; i < menu[category].length; i++) {
                const menuCategory = menu[category][i] as menuList;

                // 만약 메뉴 이름에 검색하고자 하는 텍스트가 포함되어있을 경우(검색값이 ""일 경우 모두 출력됨)
                if (menuCategory.name.includes(searchName)) {
                    tmp[i] = menuCategory.soldout;
                    result.push(
                        <div className={styles.menuItem} key={"menu-list-" + i}>
                            {isMobile >= 500 && (
                                <Image
                                    src={menuCategory.image}
                                    alt={menuCategory.name}
                                    width={75}
                                    height={75}
                                    className={styles.menuItemImage}
                                    priority
                                />
                            )}
                            <div className={styles.menuItemNamePrice}>
                                <p>
                                    {menuCategory.name}
                                    {menuCategory.soldout && <span className={styles.menuItemSoldout}>품절</span>}
                                </p>
                                {isMobile >= 650 && <p>{menuCategory.desc}</p>}
                                <p>{menuCategory.price.toLocaleString()}원</p>
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
                                <button className={styles.menuItemBtn} onClick={() => deleteMenu(i, category)}>
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
        }
        // 매장 - 카테고리 내 매뉴의 개수가 0인 경우(즉, 메뉴가 존재하지 않을 경우(= 메뉴를 등록하지 않았을 경우))
        else
            result.push(
                <div className={styles.menuItemNoExist} key={"menu-list-no-exist"}>
                    상품이 없습니다.
                </div>
            );
        return result;
    }

    // 매장에 있는 메뉴 목록 출력
    function printStoreMenuList() {
        let result = [];

        // storeID의 값이 default 값인 -1이 아닐 때(즉, 매장 ID가 선택되었을 때)
        if (storeID !== -1)
            for (let i = 0; i < nowStore[storeID - 1].category.length; i++)
                result.push(
                    <div className={styles.menuItemHeader} key={"menu-list-header-" + i}>
                        {i !== 0 && <hr />}
                        <h3>{nowStore[storeID - 1].category[i]}</h3>
                        {printStoreMenuListItem(nowStore[storeID - 1].category[i])}
                    </div>
                );
        // 매장이 선택되지 않았을 때
        else
            result.push(
                <h3 key={"menu-list-no-select-store"}>
                    {isMobile < 800 ? "상단에서 매장을 선택해주세요." : "왼쪽에서 매장을 선택해주세요."}
                </h3>
            );
        return result;
    }

    // 선택한 매장 ID의 카테고리를 드롭다운 선택
    function printStoreCategory() {
        let result = [
            <option value={""} hidden key={"menu-storeCategory-default"}>
                카테고리를 선택해주세요.
            </option>,
        ];
        if (storeID !== -1)
            for (let i = 0; i < nowStore[storeID - 1].category.length; i++)
                result.push(
                    <option value={nowStore[storeID - 1].category[i]} key={"menu-storeCategory-" + i}>
                        {i + 1}. {nowStore[storeID - 1].category[i]}
                    </option>
                );
        return result;
    }

    // 매장 ID 검색 후 드롭다운 선택
    function printStoreID() {
        let result = [
            <option value={-1} hidden key={"menu-storeID-default"}>
                매장 ID를 선택해주세요.
            </option>,
        ];
        for (let i = 0; i < nowStore.length; i++)
            result.push(
                <option value={nowStore[i].id} key={"menu-storeID-" + i}>
                    {nowStore[i].id}. {nowStore[i].name}
                </option>
            );
        return result;
    }

    // 이미지 파일 업로드 시 미리보기 함수
    function readImage(input: any) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = (e) => {
                setItemImage(e.target!.result as string);
                input.value = "";
            };
        } else setItemImage("");
    }

    useEffect(() => {
        // 모바일 인지 아닌지 (width 800px 기준)
        setMobile(window.innerWidth);
        window.onresize = () => {
            setMobile(window.innerWidth);
        };
    }, []);

    return LoginCheck() ? (
        <main>
            <div className={styles.menu}>
                <section className={styles.menuInfo}>
                    <h1>
                        메뉴 등록
                        <span>
                            <button onClick={() => menuEdit("", "", 0, "", "")}>
                                <Image src={"/reload.webp"} alt={"reload"} width={25} height={25} priority />
                            </button>
                        </span>
                    </h1>
                    <div className={styles.menuInputImageP}>
                        {itemImage !== "" ? (
                            <Image
                                id="preview-image"
                                src={itemImage}
                                alt={"preview image"}
                                width={150}
                                height={150}
                                className={`${styles.menuInputImage} ${!itemImage && styles.menuInputHide}`}
                                loading="lazy"
                            />
                        ) : (
                            <p className={styles.menuInputNoImage}>이미지 추가</p>
                        )}
                        <div className={styles.menuInputImageInput}>
                            <input
                                id="files"
                                type="file"
                                accept="image/*"
                                onChange={(e) => readImage(e.target)}
                                className={styles.menuInputHideDisplay}
                            />
                            <label htmlFor="files" className={styles.menuInputLabel}></label>
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
                    <button className={styles.menuAddBtn} onClick={() => addMenu(category)} disabled={isDisableBtn}>
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
