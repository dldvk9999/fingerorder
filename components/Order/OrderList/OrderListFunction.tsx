import { get as APIGet } from "../../../apis/api";
import { isAPI } from "../../../states";

// 주문 내역 조회
export function getOrderList(id: number, startDate: Date, endDate: Date) {
    if (isAPI) {
        return APIGet("/api/store/" + id + "/orders");
    }
    return {};
}
