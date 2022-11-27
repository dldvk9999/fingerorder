import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginCheck from "../../login_check";

export default function Test() {
    const router = useRouter();
    const { params } = router.query;
    const [managerID, setManagerID] = useState(0);
    const [storeID, setStoreID] = useState(0);
    const [tableID, setTableID] = useState(0);

    useEffect(() => {
        setManagerID(Number(params ? params[0] : 0));
        setStoreID(Number(params ? params[1] : 0));
        setTableID(Number(params ? params[2] : 0));
    }, [params]);

    return LoginCheck() ? (
        <main>
            <div>This is {params} page.</div>
            <div>사장님 번호 : {managerID}</div>
            <div>매장 번호 : {storeID}</div>
            <div>테이블 번호 : {tableID}</div>
        </main>
    ) : null;
}
