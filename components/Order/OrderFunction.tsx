import { useQuery } from "react-query";
import { get as APIGet, del as APIDel } from "../../apis/api";
import { isAPI } from "../../states";

// 주문 조회
export function GetOrder(id: number) {
    if (isAPI) {
        // const { data: result } = useQuery(["getOrder", isAPI], () => APIGet("/api/store/" + id + "/order"), {
        //     enabled: isAPI,
        //     refetchInterval: 1000,
        // });
        return {};
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
