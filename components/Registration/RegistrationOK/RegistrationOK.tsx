import { Fireworks } from "fireworks-js";
import Link from "next/link";
import { useEffect, useRef } from "react";
import LoginCheck from "../../../utils/login_check";
import styles from "./Registrationok.module.scss";

export default function RegistrationOk() {
    const regiokFire = useRef<HTMLElement>(null);

    useEffect(() => {
        const fireworks = new Fireworks(regiokFire.current!, {
            delay: {
                min: 80,
                max: 100,
            },
            particles: 200,
            traceSpeed: 5,
        });
        fireworks.start();
    }, []);

    return LoginCheck() ? (
        <main>
            <section className={styles.regiok}>
                <h1>축하합니다!</h1>
                <p>이제 서비스를 이용하실 수 있습니다!</p>
                <p>
                    QR코드 다운로드는
                    <br />
                    마이페이지에서 하실 수 있습니다.
                </p>
                <Link href={"/mypage"}>
                    <button className={styles.regiokMypage}>마이페이지로 이동</button>
                </Link>
            </section>
            <section className={styles.regiokFire} ref={regiokFire}></section>
        </main>
    ) : null;
}
