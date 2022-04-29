import Banner from "@components/Banner";
import styles from "./impressum.module.css"

export default function ImpressumPage() {
    return (
        <div className={styles.impressumContainer}>
            <Banner imageUrl="https://cdn1.dotesports.com/wp-content/uploads/2021/05/24140711/Corporate_Mundo.jpg"
                    height={1080} width={1920}/>
            <h1>
                Our Impressum
            </h1>
            <p>
                Here you can find all about us and the different sources that were used for the creation of this
                webpage.
            </p>
            <hr/>
            <h2>
                Our Contact Info
            </h2>
            <address className={styles.address}>
                ICT Berufsbildungscenter AG<br/>
                Bahnhöheweg 70 <br/>
                3018 Bern<br/><br/>
                info@bbcag.ch
            </address>
            <hr/>
            <h2>
                Our Sources
            </h2>
            <h3>
                <a href="https://leagueoflegends.fandom.com/wiki/Region_(Legends_of_Runeterra)">Links for Regions and
                    icons/description thereof</a>
            </h3>
            <h3>
                <a href="https://developer.riotgames.com/docs/lor">LoR Documentation including link to Json (Game Data
                    and
                    Images)</a>
            </h3>
            <h3>
                <a href="https://www.leagueofgraphs.com/">Inspiration for color/design</a>
            </h3>
            <h3>
                <a href="https://coolors.co/2388a9-2aa3cc-777283-4f4c57">Color palette generator</a>
            </h3>
            <h3>
                <a href="https://www.youtube.com/watch?v=3AK3vspZvvM">Input Styling Tutorial</a>
            </h3>
            <h3>
                <a href="https://stackoverflow.com/questions/35091524/spring-cors-no-access-control-allow-origin-header-is-present">Fixing my API to allow Access (CORS)</a>
            </h3>
        </div>
    )
}