import LoginCheck from "../login_check";
import styles from "../../styles/pages/Order.module.scss";

export default function Order() {
    return LoginCheck() ? (
        <main>
            <div>This is Order page.</div>
        </main>
    ) : null;
}
