import Header from "@components/Header"
import useSession from "@lib/session"
import Link from "next/link"
import "./_app.css"
import Navbar from "@components/Navbar";

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
                <span>☰</span>
            </Header>

            <Navbar>
                <ul>
                    <li><Link href="cards/">Cards</Link></li>
                    <li><Link href="regions/">Regions</Link></li>
                    <li><Link href="keywords/">Keywords</Link></li>
                    <li><Link href="create/">Create</Link></li>
                    <li><Link href="impressum">Impressum</Link></li>
                </ul>
            </Navbar>

            <main className="page">
                <Component {...newPageProps} />
            </main>
        </>
    )
}