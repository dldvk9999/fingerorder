import axios from "axios";

const url = "";
const header = {
    withCredentials: false, // cors 통신 설정
    headers: {
        "Content-Type": "application/json",
    },
};

// 조회
export async function get(params: string) {
    return await axios
        .get(url + params)
        .then((res: any) => {
            return res;
        })
        .catch((res) => {
            console.log(res);
            return res;
        });
}

// 등록
export async function post(params: string, data: Object) {
    return await axios
        .post(url + params, data, header)
        .then((res: any) => {
            console.log(res);
            return res;
        })
        .catch((res: any) => {
            console.log(res);
            return res;
        });
}

// 수정
export async function put(params: string, data: Object) {
    let result = {};
    await axios
        .put(url + params, data, header)
        .then((res: any) => {
            return res;
        })
        .catch((res) => {
            console.log(res);
            return res;
        });
    return result;
}

// 삭제
export async function del(params: string, data: Object) {
    let result = {};
    await axios
        .delete(url + params, data)
        .then((res: any) => {
            return res;
        })
        .catch((res) => {
            console.log(res);
            return res;
        });
    return result;
}
