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
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 등록
export async function post(params: string, data: Object) {
    return await axios
        .post(url + params, data, header)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 수정
export async function put(params: string, data: Object) {
    return await axios
        .put(url + params, data, header)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 삭제
export async function del(params: string, data: Object) {
    return await axios
        .delete(url + params, data)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 조회2
export async function get2(params: string, accessToken: string) {
    const header2 = {
        withCredentials: false, // cors 통신 설정
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
        },
    };
    return await axios
        .get(url + params, header2)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 등록2
export async function post2(params: string, data: Object, accessToken: string) {
    const header2 = {
        withCredentials: false, // cors 통신 설정
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
        },
    };
    return await axios
        .post(url + params, data, header2)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 수정2
export async function put2(params: string, data: Object, accessToken: string) {
    const header2 = {
        withCredentials: false, // cors 통신 설정
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
        },
    };
    return await axios
        .put(url + params, data, header2)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}

// 삭제2
export async function del2(params: string, accessToken: string) {
    const header2 = {
        withCredentials: false, // cors 통신 설정
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
        },
    };
    return await axios
        .delete(url + params, header2)
        .then((res: any) => res)
        .catch((res: any) => {
            console.log(res.response);
            return res.response;
        });
}
