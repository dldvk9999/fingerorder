import { get as APIGet, put as APIPut } from "../../apis/api";
import { isAPI } from "../../states";

// 주문 조회
export function getOrder(id: number) {
    return APIGet("/api/store/" + id + "/orders").then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 주문 삭제
export function deleteOrder(id: number) {
    return APIPut("/api/store/order/" + id, {}).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
