import { useQuery } from "react-query";
import { get as APIGet, del as APIDel } from "../../apis/api";
import { isAPI } from "../../states";

// 주문 조회
export function GetOrder(id: number) {
    if (isAPI) {
        let result = useQuery("getOrder", () => APIGet("/api/store/" + id + "/order"), { refetchInterval: 1000 });
        return result;
    }
    return {};
}

// 주문 삭제
export function deleteOrder(id: number) {
    if (isAPI) {
        APIDel("/api/store/" + id + "/order", {});
    }
    return true;
}
