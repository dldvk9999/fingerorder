import Home_Section1 from "./Section1";
import Home_Section2 from "./Section2";
import Home_Section3 from "./Section3";
import Home_Section4 from "./Section4";
import Home_Section5 from "./Section5";
import Home_Section6 from "./Section6";
import styles from "./Home.module.scss";

export default function Home() {
    return (
        <main className={styles.homeMain}>
            <Home_Section1 />
            <Home_Section2 />
            <Home_Section3 />
            <Home_Section4 />
            <Home_Section5 />
            <Home_Section6 />
        </main>
    );
}
