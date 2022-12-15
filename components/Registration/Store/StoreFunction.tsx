import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 매장 조회
export function getStore() {
    if (isAPI) {
        return APIGet("/api/store");
    }
    return {};
}

// 매장 등록
export function createStore(name: string, location: string, tableCount: number, type: string) {
    if (isAPI) {
        APIPost("/api/store/", {
            name: name,
            location: location,
            tableNum: tableCount,
            type: type,
        });
    }
    return true;
}

// 매장 수정
export function editStore(id: number, name: string, location: string, tableCount: number, type: string) {
    if (isAPI) {
        APIPut("/api/store/" + id, {
            name: name,
            location: location,
            tableNum: tableCount,
            type: type,
        });
    }
    return true;
}

// 매장 삭제
export function deleteStore(id: number) {
    if (isAPI) {
        APIDel("/api/store/" + id, {});
    }
    return true;
}
