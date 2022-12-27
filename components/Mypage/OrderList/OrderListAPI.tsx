import { get2 as APIGet2 } from "../../../apis/api";
import { isAPI } from "../../../states";

// 주문 내역 조회
export function getOrderList(id: number, startDate: string, endDate: string) {
    return APIGet2(
        "/api/store/order-details?storeId=" + id + "&startDate=" + startDate + "&endDate=" + endDate,
        localStorage["accessToken"]
    ).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
