import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 리뷰 조회
export function getReview(id: number) {
    if (isAPI) {
        return APIGet("/api/store/" + id + "/reviews");
    }
    return {};
}

// 리뷰 등록
export function createReview(id: number, commentId: number, comment: string) {
    if (isAPI) {
        APIPost("/api/store/" + id + "/reviews/" + commentId, {
            comment: comment,
        });
    }
    return true;
}

// 리뷰 수정
export function editReview(id: number, commentId: number, comment: string) {
    if (isAPI) {
        APIPut("/api/store/" + id + "/reviews/" + commentId, {
            comment: comment,
        });
    }
    return true;
}

// 리뷰 삭제
export function deleteReview(id: number, commentId: number) {
    if (isAPI) {
        APIDel("/api/store/" + id + "/reviews/" + commentId, {});
    }
    return true;
}
