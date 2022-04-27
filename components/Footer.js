import styles from "./Footer.module.css"

export default function Header({ children }) {
    return (
        <footer className={styles.footer}>
            <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                LoR Library was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot
                Games does not endorse or sponsor this project.
            </p>
        </footer>
    )
}