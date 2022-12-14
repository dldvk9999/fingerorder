export interface menuOrder {
    name: string;
    price: number;
    count: number;
}

export interface menuList {
    name: string;
    price: number;
    desc: string;
    image: string;
    rate: number;
    soldout: boolean;
}
export interface menu {
    [key: string]: Array<Object>;
}

export interface modal {
    h1: string;
    h2: string;
    isCheckbox: boolean;
    cancel: string;
    accept: string;
    children: string;
    onClose: Function;
    onAccept: Function;
    subChildren: string;
    checkboxList: Array<string>;
}

export interface reviewTmp {
    name: string;
    time: string;
    comment: string;
    reply: string;
}
