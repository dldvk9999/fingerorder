import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { registrationIndex } from "../../../states";
import store from "../../../data/store";
import LoginCheck from "../../common/Login_Check";
import Img from "../../common/Img";
import styles from "./Menu.module.scss";

type menuList = {
    name: string;
    price: number;
    desc: string;
    image: string;
    rate: number;
    soldout: boolean;
};
type menu = {
    [key: string]: Array<Object>;
};

// custom한 mock data를 사용해서 상대적으로 코드가 긴 편인데 백엔드와 연동하면 코드가 약 3~50% 정도 감소될 것 같음
export default function Menu() {
    const [_, setRegiIndex] = useRecoilState(registrationIndex);
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
    const menuName = useRef<HTMLInputElement>(null);

    // 메뉴 별점에 맞는 별 이미지 스타일링
    function ratingStyle(rate: number) {
        if (rate === 5) return styles.menuItemRateImage1;
        else if (rate > 4) return styles.menuItemRateImage2;
        else if (rate > 3) return styles.menuItemRateImage3;
        else if (rate > 2) return styles.menuItemRateImage4;
        else return styles.menuItemRateImage5;
    }

    // 메뉴 Edit 함수 (추가, 삭제, 품절 처리)
    function editMenu(type: string, cate: string, index: number = 0) {
        let storeInfo = nowStore[storeID - 1];
        let menu = storeInfo.menu as unknown as menu;
        let menuCategory = menu[cate] as Array<menuList>;

        // 추가 처리
        if (type === "add") {
            const imagePath =
                itemImage.trim() === "" || itemImage.length > 100 ? "sample_menu/fingerorder.webp" : itemImage;

            menu[cate] = [
                ...menu[cate],
                { name: itemName, price: itemPrice, desc: itemDesc, image: imagePath, soldout: false },
            ];

            menuInfoLoad("", "", 0, "", "");
            setItemImage("");
            alert("메뉴 추가 완료하였습니다.");
        }

        // 삭제 처리
        else if (type === "delete") {
            if (confirm(menuCategory[index].name + " 메뉴를 삭제하시겠습니까?")) {
                menuCategory = menuCategory.slice(0, index).concat(menuCategory.slice(index + 1, menuCategory.length));
                menu[cate] = menuCategory;
                alert("메뉴를 삭제하였습니다.");
            }
        }

        // 품절 처리
        else {
            menuCategory[index].soldout = !menuCategory[index].soldout;
            menu[cate] = menuCategory;
        }
        storeInfo.menu = menu as any;
        setStore([...store, storeInfo]);
    }

    // 수정 버튼 클릭 시 해당 아이템 정보 가져옴
    function menuInfoLoad(categoryIndex: string, name: string, price: number, desc: string, image: string) {
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
                menuName.current!.classList.add(styles.menuInputRequire);
                setTimeout(() => {
                    setDisableBtn(false);
                    menuName.current!.classList.remove(styles.menuInputRequire);
                }, 4000);
            } else editMenu("add", cate);
        } else alert("매장 ID와 카테고리를 먼저 선택해주세요.");
    }

    // 매장에 있는 메뉴 - 세부 아이템 출력
    function printStoreMenuListItem(category: string) {
        let result = [];
        const menu = nowStore[storeID - 1].menu as unknown as menu;

        // 만약 매장 - 카테고리 내 메뉴의 개수가 1이상일 경우(즉, 메뉴가 존재할 경우)
        if (menu[category].length) {
            // 모든 메뉴를 for문으로 print
            for (let i = 0; i < menu[category].length; i++) {
                const mCate = menu[category][i] as menuList;

                // 만약 메뉴 이름에 검색하고자 하는 텍스트가 포함되어있을 경우(검색값이 ""일 경우 모두 출력됨)
                if (mCate.name.includes(searchName)) {
                    result.push(
                        <div className={styles.menuItem} key={"menu-list-" + i}>
                            {isMobile >= 500 && Img(mCate.image, 75, 75, styles.menuItemImage)}
                            <div className={styles.menuItemNamePrice}>
                                <p>
                                    {mCate.name}
                                    {mCate.soldout && <span className={styles.menuItemSoldout}>품절</span>}
                                </p>
                                {isMobile >= 650 && <p>{mCate.desc}</p>}
                                <div className={styles.menuItemPriceRate}>
                                    {mCate.price.toLocaleString()}원
                                    <div className={styles.menuItemRate}>
                                        {Img(
                                            "rating",
                                            isMobile < 600 ? 15 : 75,
                                            15,
                                            `${styles.menuItemRateImage} ${ratingStyle(mCate.rate)}`
                                        )}
                                        <p>{mCate.rate ? mCate.rate : 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.menuItemBtns}>
                                <button
                                    className={styles.menuItemBtn}
                                    onClick={() =>
                                        menuInfoLoad(category, mCate.name, mCate.price, mCate.desc, mCate.image)
                                    }
                                >
                                    수정
                                </button>
                                <button className={styles.menuItemBtn} onClick={() => editMenu("delete", category, i)}>
                                    삭제
                                </button>
                                <button className={styles.menuItemBtn} onClick={() => editMenu("soldout", category, i)}>
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

    // 매장 ID 및 카테고리 드롭다운 선택
    function printStoreIDCategory(type: "ID" | "category") {
        let result = [
            <option value={type === "ID" ? -1 : ""} hidden key={"menu-IDCategory-default"}>
                {type === "ID" ? "매장 ID를 선택해주세요." : "카테고리를 선택해주세요."}
            </option>,
        ];
        const data = type === "ID" ? nowStore : storeID !== -1 ? nowStore[storeID - 1].category : nowStore[0].category;
        for (let i = 0; i < data.length; i++)
            result.push(
                <option value={type === "ID" ? (data[i] as any).id : data[i]} key={"menu-storeCategory-" + i}>
                    {type === "ID" ? (data[i] as any).id : i + 1}. {type === "ID" ? (data[i] as any).name : data[i]}
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
        <article className={styles.menuMain}>
            <div className={styles.menu}>
                {/* 죄측 메뉴 추가 및 수정 부분 */}
                <section className={styles.menuInfo}>
                    <h1>메뉴 등록</h1>
                    <div className={styles.menuInputImageP}>
                        {itemImage !== "" ? (
                            Img(itemImage, 150, 150, `${styles.menuInputImage} ${!itemImage && styles.menuInputHide}`)
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
                        {printStoreIDCategory("ID")}
                    </select>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`${styles.menuInput} ${styles.menuInputSelect}`}
                        disabled={storeID === -1}
                    >
                        {printStoreIDCategory("category")}
                    </select>
                    <input
                        type="text"
                        placeholder="메뉴 이름을 입력해주세요."
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                        disabled={storeID === -1 || category === ""}
                        className={styles.menuInput}
                        ref={menuName}
                    />
                    <input
                        type="number"
                        placeholder="가격을 입력해주세요."
                        onChange={(e) => setItemPrice(Number(e.target.value))}
                        value={itemPrice.toString()}
                        disabled={storeID === -1 || category === ""}
                        className={styles.menuInput}
                    />
                    <textarea
                        placeholder="메뉴 설명을 입력해주세요."
                        onChange={(e) => setItemDesc(e.target.value)}
                        value={itemDesc}
                        disabled={storeID === -1 || category === ""}
                        className={`${styles.menuInput} ${styles.menuInputTextarea}`}
                    />
                    <div className={styles.menuBtnList}>
                        <button className={styles.menuAddBtn} onClick={() => addMenu(category)} disabled={isDisableBtn}>
                            메뉴 추가
                        </button>
                        <button className={styles.menuReset} onClick={() => menuInfoLoad("", "", 0, "", "")}>
                            <svg width="24pt" height="24pt" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
                                    <path d="M2675 4771 c-48 -22 -79 -54 -100 -103 -12 -30 -15 -79 -15 -238 l0 -200 -81 0 c-226 0 -528 -76 -774 -195 -534 -258 -934 -769 -1055 -1346 -58 -280 -53 -612 15 -879 87 -348 264 -658 517 -907 177 -174 304 -266 520 -373 456 -226 986 -263 1477 -104 131 43 358 153 470 229 439 295 732 732 836 1250 45 222 25 309 -82 357 -40 18 -64 19 -336 16 -283 -3 -294 -4 -345 -27 -76 -34 -137 -106 -152 -177 -73 -349 -335 -645 -672 -760 -407 -138 -864 -7 -1130 325 -432 539 -223 1335 418 1592 94 38 237 69 317 69 l57 0 0 -195 c0 -209 6 -243 53 -293 56 -60 166 -81 237 -44 19 10 280 201 580 424 571 426 586 439 611 532 17 64 -7 142 -63 207 -28 32 -1079 816 -1128 841 -44 23 -124 23 -175 -1z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className={styles.menuAddBtns}>
                        <button onClick={() => setRegiIndex(1)} className={styles.menuAddBtn} disabled={isDisableBtn}>
                            이전
                        </button>
                        <Link href={"/registration/ok"}>
                            <button className={styles.menuAddBtn} disabled={isDisableBtn}>
                                완료
                            </button>
                        </Link>
                    </div>
                </section>

                {/* 우측 메뉴 선택 부분 */}
                <section className={styles.menuList}>
                    <h2>메뉴 리스트</h2>
                    <div className={styles.menuItemCategory}>
                        <input
                            type="search"
                            placeholder="메뉴 이름 검색"
                            onChange={(e) => setSearchName(e.target.value)}
                            className={styles.menuItemSearch}
                        />
                        <div>{printStoreMenuList()}</div>
                    </div>
                </section>
            </div>
        </article>
    ) : null;
}
