import LoginCheck from "../login_check";
import styles from "../../styles/pages/Review.module.scss";

export default function Review() {
    return LoginCheck() ? (
        <main>
            <div>This is Review page.</div>
        </main>
    ) : null;
}
