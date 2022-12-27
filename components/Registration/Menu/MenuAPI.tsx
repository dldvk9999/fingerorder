import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 메뉴 조회
export function getMenu(id: number) {
    return APIGet("/api/store/" + id + "/menu").then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 메뉴 등록
export function createMenu(id: number, category: string, name: string, price: number, desc: string, image: any) {
    return APIPost("/api/store/" + id + "/menu", {
        categoryName: category,
        name: name,
        price: price,
        description: desc,
        imageUrl: image,
        menuStatus: "ONSALE",
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 메뉴 수정
export function editMenu(
    id: number,
    category: string,
    index: number,
    name: string,
    price: number,
    desc: string,
    image: any,
    soldout: boolean
) {
    return APIPut("/api/store/" + id + "/menu", {
        categoryName: category,
        menuId: index,
        name: name,
        price: price,
        description: desc,
        imageUrl: image,
        menuStatus: soldout ? "SOLDOUT" : "ONSALE",
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 메뉴 삭제
export function deleteMenu(id: number, index: number) {
    return APIDel("/api/store/" + id + "/menu?menuId=" + index, {}).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
