import { get2 as APIGet2 } from "../../../apis/api";
import { isAPI } from "../../../states";

// 매출 내역 조회
export function getSales(id: number, year: string, month: string) {
    return APIGet2(
        "/api/store/payment-details?storeId=" + id + "&year=" + year + "&month=" + month,
        localStorage["accessToken"]
    ).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
