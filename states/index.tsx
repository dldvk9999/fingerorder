import { atom } from "recoil";
import { v1 } from "uuid";

// Backend API 통신 할지 (백엔드 서버 안정화되면 연동 예정)
export const isAPI = false;

export const isDarkmode = atom({
    key: "isDarkmode-" + v1(),
    default: false,
});

// 매장 수정 시 선택한 매장의 ID
export const editNumber = atom({
    key: "editNumber-" + v1(),
    default: -1,
});

// 주문 목록 페이지에서 소리가 나게 할지
export const soundPlay = atom({
    key: "soundPlay-" + v1(),
    default: false,
});

// 메인 화면에서 인트로 animation 작동 여부
export const homeIntro = atom({
    key: "homeIntro-" + v1(),
    default: true,
});

// 서비스 등록 페이지에서 Step에 따른 Index값
export const registrationIndex = atom({
    key: "registrationIndex-" + v1(),
    default: 0,
});
