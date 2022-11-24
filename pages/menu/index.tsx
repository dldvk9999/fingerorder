import LoginCheck from "../login_check";
import styles from "../styles/Home.module.scss";

export default function Menu() {
    return LoginCheck() ? (
        <main>
            <div>This is Menu page.</div>
        </main>
    ) : null;
}
