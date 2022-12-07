import "../styles/globals.scss";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>핑거오더 - 이젠 키오스크가 아닌 여기서 주문하세요!</title>
                <meta name="description" content="Fingerorder - This is project to order system by zerobase project." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RecoilRoot>
                <Header />
                <Component {...pageProps} />
            </RecoilRoot>
            <Footer />
        </>
    );
}
