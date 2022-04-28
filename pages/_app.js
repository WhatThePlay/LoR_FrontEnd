import Header from "@components/Header"
import Footer from "@components/Footer"
import useSession from "@lib/session"
import Link from "next/link"
import "./_app.css"
import Navbar from "@components/Navbar";
import {useState} from "react";

export default function App({ Component, pageProps }) {
    const session = useSession()

    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <>
            <Header>
                <Link href="/" passHref>
                    LoR Library
                </Link>
            </Header>

            <Navbar session={session}/>

            <main className="page">
                <Component {...newPageProps} />
            </main>

            <Footer/>
        </>
    )
}