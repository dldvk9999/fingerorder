import { atom } from "recoil";
import { v1 } from "uuid";

export const editNumber = atom({
    key: "editNumber-" + v1(),
    default: -1,
});

export const soundPlay = atom({
    key: "soundPlay-" + v1(),
    default: false,
});

export const homeIntro = atom({
    key: "homeIntro-" + v1(),
    default: true,
});
