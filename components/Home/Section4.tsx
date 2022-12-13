import Image from "next/image";
import { useEffect, useState } from "react";
import flow from "../../data/flow";
import styles from "./styles/Home_Section4.module.scss";

export default function Home_Section4() {
    const [isMobile, setMobile] = useState(false);
    const [edgeShow, setEdgeShow] = useState(Array.from({ length: flow.length - 1 }, () => false));
    const [isEdgeInit, setEdgeInit] = useState(false);

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
                <Image
                    src={"/home/" + flow[index].name + ".webp"}
                    alt={flow[index].alt}
                    width={100}
                    height={100}
                    className={styles.homeFlowNodes}
                    loading="lazy"
                />
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
            <div className={styles.homeFlowNormal}>
                {printNodes(0)}
                {printEdge(0, "right")}
                {printNodes(1)}
                {printEdge(1, "right")}
                {printNodes(2)}
            </div>
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
            <div className={styles.homeFlowReverse}>
                {printNodes(3)}
                {printEdge(3, "left")}
                {printNodes(4)}
                {printEdge(4, "left")}
                {printNodes(5)}
            </div>
        </section>
    );
}
