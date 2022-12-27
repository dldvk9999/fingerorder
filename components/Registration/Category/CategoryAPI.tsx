import { get2 as APIGet2, post2 as APIPost2, put2 as APIPut2, del as APIDel } from "../../../apis/api";
import { isAPI } from "../../../states";

// 카테고리 조회
export function getCategory(id: number) {
    return APIGet2("/api/store/" + id + "/category", localStorage["accessToken"])
        .then((res) => {
            return {
                api: true,
                result: res.status === 200,
                data: res.data,
            };
        })
        .catch((res) => {
            return {
                api: false,
                result: res.status === 200,
                data: res.data,
            };
        });
}

// 카테고리 등록
export function createCategory(id: number, category: string) {
    return APIPost2(
        "/api/store/" + id + "/category",
        {
            name: category,
        },
        localStorage["accessToken"]
    ).then((res) => {
        console.log(res);
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 카테고리 수정
export function editCategory(id: number, oldCategory: string, newCategory: string, accessToken: string) {
    return APIPut2(
        "/api/store/" + id + "/category",
        {
            categoryName: oldCategory,
            updateName: newCategory,
        },
        accessToken
    ).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}

// 카테고리 삭제
export function deleteCategory(id: number, oldCategory: string) {
    return APIDel("/api/store/" + id + "/category", {
        name: oldCategory,
    }).then((res) => {
        return {
            api: true,
            result: res.status === 200,
            data: res.data,
        };
    });
}
