import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isDarkmode } from "../../states";
import flow from "../../data/flow";
import Img from "../common/Img";
import styles from "./styles/Home_Section4.module.scss";

export default function Home_Section4() {
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const [isMobile, setMobile] = useState(false);
    const [edgeShow, setEdgeShow] = useState(Array.from({ length: flow.length - 1 }, () => false));
    const [isEdgeInit, setEdgeInit] = useState(false);

    // Edge와 Node 출력해주는 함수
    function printRepeat(start: number, type: "left" | "right") {
        return (
            <div className={`${type === "right" ? styles.homeFlowNormal : styles.homeFlowReverse}`}>
                {printNodes(start)}
                {printEdge(start, type)}
                {printNodes(start + 1)}
                {printEdge(start + 1, type)}
                {printNodes(start + 2)}
            </div>
        );
    }

    // Flow의 Node 그리는 함수
    function printNodes(index: number) {
        return (
            <div
                className={styles.homeFlowItem}
                onMouseOver={() =>
                    setEdgeShow(
                        Array.from({ length: index }, () => true).concat(
                            Array.from({ length: flow.length - 1 - index }, () => false)
                        )
                    )
                }
                onMouseLeave={() => setEdgeShow([true, true, true, true, true])}
            >
                {Img(
                    "home/" + flow[index].name,
                    100,
                    100,
                    `${styles.homeFlowNodes} ${darkmode ? styles.homeFlowInvert : ""}`
                )}
                <p>{flow[index].desc}</p>
            </div>
        );
    }

    // Flow의 Edge(간선) 그리는 함수
    function printEdge(index: number, to: string) {
        return !isMobile ? (
            <div className={to === "right" ? styles.homeFlowEdgeToRight : styles.homeFlowEdgeToLeft}>
                <div className={`${styles.homeFlowEdge} ${edgeShow[index] && styles.homeFlowEdgeActive}`} />
            </div>
        ) : (
            <div className={styles.homeFlowToBottom}>
                <div className={`${styles.homeFlowVertline} ${edgeShow[index] && styles.homeFlowVertlineActive}`} />
            </div>
        );
    }

    useEffect(() => {
        // 모바일 인지 아닌지 (width 800px 기준)
        setMobile(window.innerWidth < 800);
        window.onresize = () => {
            setMobile(window.innerWidth < 800);
        };
    }, []);

    useEffect(() => {
        // 로드 시 Edge를 순서대로 펼치게 함
        window.onscroll = () => {
            if (!isEdgeInit && window.scrollY >= window.innerHeight * 2 - 400) {
                setEdgeInit(true);
                for (let i = 0; i < flow.length - 1; i++)
                    setTimeout(() => {
                        setEdgeShow(
                            Array.from({ length: i + 1 }, () => true).concat(
                                Array.from({ length: flow.length - 1 - i - 1 }, () => false)
                            )
                        );
                    }, i * 1000);
            }
        };
    }, [isEdgeInit]);

    return (
        <section className={styles.homeFlow}>
            {isMobile && <h1>핑거오더의 동작 원리</h1>}
            {printRepeat(0, "right")}
            <div className={styles.homeFlowMiddle}>
                {!isMobile && (
                    <>
                        <div className={styles.homeFlowBlank} />
                        <h1>핑거오더의 동작 원리</h1>
                    </>
                )}
                <div className={styles.homeFlowToBottom}>
                    <div className={`${styles.homeFlowVertline} ${edgeShow[2] && styles.homeFlowVertlineActive}`} />
                </div>
            </div>
            {printRepeat(3, "left")}
        </section>
    );
}
