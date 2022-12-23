import { del as APIDel } from "../../apis/api";
import { isAPI } from "../../states";

// 주문 삭제
export function deleteOrder(id: number) {
    if (isAPI) {
        APIDel("/api/store/" + id + "/order", {});
    }
    return true;
}
