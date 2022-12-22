import { useEffect } from "react";
import { useRouter } from "next/router";

export default function KakaoAuth() {
    const router = useRouter();
    const { params } = router.query;

    useEffect(() => {
        if (params) {
            localStorage["accessToken"] = params[0];
            localStorage["login"] = true;
            localStorage["email"] = "kakao";
            localStorage["kakao"] = true;
        }
    }, [params]);

    return (
        <main>
            <section></section>
        </main>
    );
}
