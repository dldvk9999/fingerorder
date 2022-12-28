import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";

// 매장 조회
export function getStore() {
    return APIGet("/api/store?memberId=" + localStorage["id"]).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 매장 등록
export function createStore(name: string, location: string, tableCount: number, type: string) {
    return APIPost("/api/store/", {
        memberId: localStorage["id"],
        name: name,
        storeLocation: location,
        tableCount: tableCount,
        orderNumber: type === "OrderNumber" ? "OrderNumber" : "",
        tableNumber: type === "TableNumber" ? "TableNumber" : "",
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 매장 수정
export function editStore(id: number, name: string, location: string, tableCount: number, type: string) {
    return APIPut("/api/store/" + id, {
        name: name,
        storeLocation: location,
        tableCount: tableCount,
        orderNumber: type === "OrderNumber" ? "OrderNumber" : "",
        tableNumber: type === "TableNumber" ? "TableNumber" : "",
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 매장 삭제
export function deleteStore(id: number) {
    return APIDel("/api/store/" + id, {}).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
