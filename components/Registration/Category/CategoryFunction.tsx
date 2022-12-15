import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 카테고리 조회
export function getCategory(id: number) {
    if (isAPI) {
        return APIGet("/api/store/" + id + "/category");
    }
    return {};
}

// 카테고리 등록
export function createCategory(id: number, category: string) {
    if (isAPI) {
        APIPost("/api/store/" + id + "/category", {
            category: category
        });
    }
    return true;
}

// 카테고리 수정
export function editCategory(id: number, category: string) {
    if (isAPI) {
        APIPut("/api/store/" + id + "/category", {
            category: category
        });
    }
    return true;
}

// 카테고리 삭제
export function deleteCategory(id: number) {
    if (isAPI) {
        APIDel("/api/store/" + id + "/category", {});
    }
    return true;
}
