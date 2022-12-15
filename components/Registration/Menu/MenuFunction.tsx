import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 메뉴 조회
export function getMenu(id: number) {
    if (isAPI) {
        return APIGet("/api/store/" + id + "/menu");
    }
    return {};
}

// 메뉴 등록
export function createMenu(id: number, category: string, name: string, price: number, desc: string, image: any) {
    if (isAPI) {
        APIPost("/api/store/" + id + "/menu", {
            category: category,
            name: name,
            price: price,
            desc: desc,
            image: image,
            soldout: false,
        });
    }
    return true;
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
    if (isAPI) {
        APIPut("/api/store/" + id + "/menu", {
            category: category,
            index: index,
            name: name,
            price: price,
            desc: desc,
            image: image,
            soldout: soldout,
        });
    }
    return true;
}

// 메뉴 삭제
export function deleteMenu(id: number, category: string, index: number) {
    if (isAPI) {
        APIDel("/api/store/" + id + "/menu", {
            category: category,
            index: index,
        });
    }
    return true;
}
