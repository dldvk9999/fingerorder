import axios from "axios";

const url = "/api";
const header = {
    withCredentials: false, // cors 통신 설정
    headers: {
        "Content-Type": "charset=UTF-8",
    },
};

// 조회
export async function get(params: string) {
    let result = {};
    await axios
        .get(url + params)
        .then((res) => (result = res))
        .catch((e) => console.log(e));
    return result;
}

// 등록
export async function post(params: string, data: Object) {
    let result = {};
    await axios
        .post(url + params, data, header)
        .then((res) => (result = res))
        .catch((e) => console.log(e));
    return result;
}

// 수정
export async function put(params: string, data: Object) {
    let result = {};
    await axios
        .put(url + params, data, header)
        .then((res) => (result = res))
        .catch((e) => console.log(e));
    return result;
}

// 삭제
export async function del(params: string, data: Object) {
    let result = {};
    await axios
        .delete(url + params, data)
        .then((res) => (result = res))
        .catch((e) => console.log(e));
    return result;
}
