import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = "/api";
const header = {
    withCredentials: false, // cors 통신 설정
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.redirect("/");
    } else {
        res.status(200).send(req.body);
    }
}

// 조회
async function get(params: string, data: Object) {
    let result = {};
    await axios
        .get(url + params, data)
        .then((res) => {
            result = res;
        })
        .catch((e) => {
            console.log(e);
        });
    return result;
}

// 등록
async function post(params: string, data: Object) {
    let result = {};
    await axios
        .post(url + params, data, header)
        .then((res) => {
            result = res;
        })
        .catch((e) => {
            console.log(e);
        });
    return result;
}

// 수정
async function patch(params: string, data: Object) {
    let result = {};
    await axios
        .patch(url + params, data, header)
        .then((res) => {
            result = res;
        })
        .catch((e) => {
            console.log(e);
        });
    return result;
}

// 삭제
async function del(params: string, data: Object) {
    let result = {};
    await axios
        .delete(url + params, data)
        .then((res) => {
            result = res;
        })
        .catch((e) => {
            console.log(e);
        });
    return result;
}

export { get, post, patch, del };
