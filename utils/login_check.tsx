let flag = true;
export default function LoginCheck() {
    if (typeof window !== "undefined" && localStorage["login"] !== "true") {
        if (flag) {
            flag = false;
            alert("로그인 후 이용 가능합니다.");
            setTimeout(() => {
                flag = true;
            }, 2000);
        }
        location.href = "/login";
        return false;
    }
    return true;
}
