import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import Store from "../store";
import store from "../../data/store";
import LoginCheck from "../login_check";

export default function ChangeStore() {
    const [editPage, _] = useRecoilState(editNumber);

    useEffect(() => {
        // 마이페이지를 통해 접근했는지 확인
        if (editPage === -1) {
            alert("마이페이지를 통해 접근해주세요.");
            location.href = "/mypage";
        }
    }, [editPage]);

    return LoginCheck() && editPage !== -1 ? (
        <Store
            name={store[editPage].name}
            tableCount={store[editPage].table}
            tmpTableCount={store[editPage].table}
            location={store[editPage].locate}
            category={store[editPage].category}
            type={store[editPage].type}
        />
    ) : null;
}
