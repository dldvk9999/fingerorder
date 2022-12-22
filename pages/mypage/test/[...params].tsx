import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Test() {
    const router = useRouter();
    const { params } = router.query;
    const [test, setTest] = useState<any>();

    useEffect(() => {
        setTest(params ? params : "");
    }, [params]);

    return (
        <main>
            <div>{test}</div>
        </main>
    );
}
