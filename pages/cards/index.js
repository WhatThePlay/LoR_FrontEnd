import Image from "next/image"
import styles from "./index.module.css"

import Card from "@components/Card";
import {useEffect, useState} from "react";
import {getAllCards} from "@lib/api";

export default function CardsPage(){

    const [cards, setCards] = useState([])

    const [query, setQuery] = useState("")
    const handleChange = (value) => setQuery(value.target.value)

    const cardsToRender = Object.values(cards).filter(card => card.name.toLowerCase().includes(query.toLowerCase()))

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

    return (
        <div>

            <div className={styles.bannerContainer}>
                <div className={styles.banner}>
                    <Image alt="banner" src="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO014-full.png" width={2048} height={1024} quality={100} />
                </div>
            </div>

            <h1>
                All the Cards
            </h1>
            <p>
                Here you can check out all the existing cards. You can click on them to see them in a more detailed view. There is now a search function!
            </p>

            <div className={styles.searchBarContainer}>
                <input className={styles.searchBar} type="text" onChange={handleChange} />
            </div>

            <section className={styles.cardSection}>
                {cards && <>
                    {
                        cardsToRender.map(card => {
                            return (
                                <div key={card.id}>
                                    <Card card={card}/>
                                </div>
                            )
                        })
                    }
                </>}
            </section>
        </div>
    )
}