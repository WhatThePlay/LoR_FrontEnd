import styles from "./Navbar.module.css"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Navbar({ session }) {
    const user = session.user
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsOpen(false)
    }, [router.pathname])

    return (
        <>
            <div className={styles.navToggle} onClick={e => setIsOpen(open => !open)}>{isOpen ? "✖" : "☰"}</div>
            <nav className={isOpen ? styles.nav : "" + styles.nav + " " +  styles.noNav}>
                <ul>
                    <li><Link href="/cards/">Cards</Link></li>
                    <li><Link href="/regions/">Regions</Link></li>
                    <li><Link href="/create/">Create</Link></li>
                    {!user && <li><Link href="/login">Login</Link></li>}
                    {user && <li onClick={session.logout}><a>Logout</a></li>}
                    <li><Link href="/impressum">Impressum</Link></li>
                </ul>
            </nav>
        </>
    )
}