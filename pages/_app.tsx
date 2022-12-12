import "../styles/globals.scss";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>핑거오더 - 이젠 키오스크가 아닌 여기서 주문하세요!</title>
                <meta name="description" content="Fingerorder - This is project to order system by zerobase project." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Analytics />
            <RecoilRoot>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </RecoilRoot>
        </>
    );
}
