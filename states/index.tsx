import { atom } from "recoil";

export const editNumber = atom({
    key: "editNumber",
    default: -1,
});

export const soundPlay = atom({
    key: "soundPlay",
    default: false,
});
