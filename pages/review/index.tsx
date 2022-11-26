import LoginCheck from "../login_check";
import styles from "../../styles/Home.module.scss";

export default function Review() {
    return LoginCheck() ? (
        <main>
            <div>This is Review page.</div>
        </main>
    ) : null;
}
