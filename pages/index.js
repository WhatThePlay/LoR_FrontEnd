import styles from "./index.module.css"
import Image from "next/image";
import {useEffect, useState} from "react";
import {getAllCards} from "@lib/api";
import FeatureCard from "@components/FeatureCard";

export default function IndexPage() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const loadCards = async () => {
            try {
                const cards = await getAllCards()
                setCards(cards)
            } catch (e) {
                alert("Could not load cards!")
            }
        }
        loadCards()
    }, [])

    return cards &&  (
        <div>
            <div className={styles.bannerContainer}>
                <div className={styles.banner}>
                    <Image alt="banner" src="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO014-full.png"
                           width={2048} height={1024} quality={100}/>
                </div>
            </div>

            <main>
                <h1>
                    What we do
                </h1>
                <p>
                    This Website is supposed to give you information about all the different things in Legends of
                    Runeterra.
                    This is simply a prototype.
                    You can find information about cards, regions and also keywords.
                </p>
            </main>

            {/*<hr className="line"/>*/}

            <section className={styles.featuredCards}>
                <FeatureCard card={cards[Math.floor(Math.random() * cards.length+1)]}/>
                <FeatureCard card={cards[Math.floor(Math.random() * cards.length+1)]}/>
                <FeatureCard card={cards[Math.floor(Math.random() * cards.length+1)]}/>
                <FeatureCard card={cards[Math.floor(Math.random() * cards.length+1)]}/>
            </section>

        </div>
    )
}