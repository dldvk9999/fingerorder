import { get as APIGet, post as APIPost, put as APIPut, del as APIDel } from "../../../apis/api";

// 리뷰 조회
export function getReview(id: number) {
    return APIGet("/api/store/" + id + "/review").then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 리뷰 등록
export function createReview(id: number, commentId: number, comment: string, orderId: number) {
    return APIPost("/api/store/" + id + "/review", {
        parentId: commentId,
        memberId: localStorage["id"],
        content: comment,
        ordersId: orderId,
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 리뷰 수정
export function editReview(id: number, commentId: number, comment: string) {
    return APIPut("/api/store/" + id + "/review", {
        reviewId: commentId,
        content: comment,
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 리뷰 삭제
export function deleteReview(id: number, commentId: number) {
    return APIDel("/api/store/" + id + "/review?reviewId=" + commentId, {}).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
