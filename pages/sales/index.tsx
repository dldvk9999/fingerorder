import LoginCheck from "../login_check";
import styles from "../../styles/pages/Sales.module.scss";

export default function Sales() {
    return LoginCheck() ? (
        <main>
            <div>This is Sales page.</div>
        </main>
    ) : null;
}
