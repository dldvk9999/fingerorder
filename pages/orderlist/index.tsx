import LoginCheck from "../login_check";
import styles from "../../styles/pages/OrderList.module.scss";

export default function OrderList() {
    return LoginCheck() ? (
        <main>
            <section>
                <div>This is OrderList page.</div>
            </section>
        </main>
    ) : null;
}
