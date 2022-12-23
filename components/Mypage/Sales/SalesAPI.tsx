import { get as APIGet } from "../../../apis/api";
import { isAPI } from "../../../states";

// 매출 내역 조회
export function getSales(id: number, setMonth: Date) {
    if (isAPI) {
        return APIGet("/api/store/" + id + "/payment-details");
    }
    return {};
}
