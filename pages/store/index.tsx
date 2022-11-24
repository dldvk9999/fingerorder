import LoginCheck from "../login_check";
import styles from "../styles/Home.module.scss";

export default function Store() {
    return LoginCheck() ? (
        <main>
            <div>This is Store page.</div>
        </main>
    ) : null;
}
