import Image from "next/image";
import store from "../../data/store";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Menu.module.scss";
import { useState } from "react";

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

    // 왼쪽에 선택한 아이템이나 입력한 아이템 모두 리셋
    function editReset() {
        setCategory("");
        setItemName("");
        setItemPrice(0);
        setItemDesc("");
        setItemImage("");
    }

    // 수정 버튼 클릭 시 해당 아이템 정보 가져옴
    function menuEdit(
        categoryIndex: string,
        name: string,
        price: number,
        desc: string,
        image: string
    ) {
        setCategory(categoryIndex);
        setItemName(name);
        setItemPrice(price);
        setItemDesc(desc);
        setItemImage("/sample_menu/" + image);
    }

    // 매장에 있는 메뉴 - 세부 아이템 출력
    function printStoreMenuListItem(category: string, index: number) {
        let result = [];
        if (storeID !== -1) {
            const menu = store[storeID - 1].menu as unknown as menu;
            if (menu[category].length) {
                let tmp = Array.from(
                    { length: menu[category].length },
                    () => false
                );
                for (let i = 0; i < menu[category].length; i++) {
                    tmp[i] = (menu[category][i] as menuList).soldout;
                    result.push(
                        <div className={styles.menuItem} key={"menu-list-" + i}>
                            <Image
                                src={
                                    "/sample_menu/" +
                                    (menu[category][i] as menuList).image
                                }
                                alt={(menu[category][i] as menuList).name}
                                width={75}
                                height={75}
                                className={styles.menuItemImage}
                                priority
                            />
                            <div className={styles.menuItemNamePrice}>
                                <p>
                                    {(menu[category][i] as menuList).name}
                                    {(menu[category][i] as menuList)
                                        .soldout && (
                                        <span
                                            className={styles.menuItemSoldout}
                                        >
                                            품절
                                        </span>
                                    )}
                                </p>
                                <p>{(menu[category][i] as menuList).desc}</p>
                                <p>{(menu[category][i] as menuList).price}원</p>
                            </div>
                            <button
                                className={styles.menuItemBtn}
                                onClick={() =>
                                    menuEdit(
                                        category,
                                        (menu[category][i] as menuList).name,
                                        (menu[category][i] as menuList).price,
                                        (menu[category][i] as menuList).desc,
                                        (menu[category][i] as menuList).image
                                    )
                                }
                            >
                                수정
                            </button>
                            <button
                                className={styles.menuItemBtn}
                                onClick={() => {
                                    if (confirm("삭제하시겠습니까?"))
                                        alert("삭제 완료하였습니다.");
                                }}
                            >
                                삭제
                            </button>
                            <button
                                className={styles.menuItemBtn}
                                onClick={() => {
                                    alert("품절처리 완료하였습니다.");
                                }}
                            >
                                품절
                            </button>
                        </div>
                    );
                }
            } else {
                result.push(
                    <div
                        className={styles.menuItemNoExist}
                        key={"menu-list-no-exist"}
                    >
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
                    <div
                        className={styles.menuItemHeader}
                        key={"menu-list-header-" + i}
                    >
                        <h3>{store[storeID - 1].category[i]}</h3>
                        {printStoreMenuListItem(
                            store[storeID - 1].category[i],
                            i
                        )}
                    </div>
                );
            }
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
                    <option
                        value={store[storeID - 1].category[i]}
                        key={"menu-storeCategory-" + i}
                    >
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

    return LoginCheck() ? (
        <main>
            <div className={styles.menu}>
                <section className={styles.menuInfo}>
                    <h1>
                        메뉴 등록
                        <span>
                            <button onClick={editReset}>
                                <Image
                                    src={"/reload.webp"}
                                    alt={"reload"}
                                    width={25}
                                    height={25}
                                />
                            </button>
                        </span>
                    </h1>
                    <div className={styles.menuInputImageP}>
                        <Image
                            id="preview-image"
                            src={
                                itemImage
                                    ? itemImage
                                    : "/sample_menu/이미지추가.png"
                            }
                            alt={"preview image"}
                            width={150}
                            height={150}
                            className={`${styles.menuInputImage} ${
                                !itemImage && styles.menuInputHide
                            }`}
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
                                className={`${styles.menuInputImage} ${
                                    itemImage && styles.menuInputHide
                                }`}
                            ></label>
                            <p
                                className={
                                    itemImage && styles.menuInputHideDisplay
                                }
                            >
                                이미지 추가
                            </p>
                        </div>
                    </div>
                    <select
                        value={storeID}
                        onChange={(e) => setStoreID(Number(e.target.value))}
                        className={`${styles.menuInput} ${styles.menuInputSelect}`}
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
                        type="text"
                        placeholder="이름"
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
                        placeholder="설명"
                        onChange={(e) => setItemDesc(e.target.value)}
                        value={itemDesc}
                        disabled={storeID === -1 || category === ""}
                        className={`${styles.menuInput} ${styles.menuInputTextarea}`}
                    />
                    <button className={styles.menuAddBtn}>메뉴 추가</button>
                </section>

                <section className={styles.menuList}>
                    <h2>메뉴 리스트</h2>
                    <div className={styles.menuItemCategory}>
                        <div>{printStoreMenuList()}</div>
                    </div>
                </section>
            </div>
        </main>
    ) : null;
}
