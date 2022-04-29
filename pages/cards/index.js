import Image from "next/image"
import styles from "./index.module.css"

import Card from "@components/Card";
import {useEffect, useState} from "react";
import {getAllCards} from "@lib/api";
import Banner from "@components/Banner";

export default function CardsPage() {

    const [cards, setCards] = useState([])

    const [nameQuery, setNameQuery] = useState("")
    const [regionQuery, setRegionQuery] = useState("")
    const handleChange = (value) => {
        if(value.target.name === "name"){
            setNameQuery(value.target.value)
        } else {
            setRegionQuery(value.target.value)
        }

    }

    let cardsToRender = Object.values(cards).filter(card => card.name.toLowerCase().includes(nameQuery.toLowerCase()))
    cardsToRender = Object.values(cardsToRender).filter(card => card.linkedRegions[0].name.toLowerCase().includes(regionQuery.toLowerCase()))

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

            <Banner imageUrl="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO014-full.png"/>

            <h1>
                All the Cards
            </h1>
            <p>
                Here you can check out all the existing cards. You can click on them to see them in a more detailed
                view. There is now a search function!
            </p>

            <div className={styles.searchBarContainer}>
                <input className={styles.searchBar} name="name" type="text" onChange={handleChange} placeholder="Name Search!"/>
            </div>

            <div className={styles.searchBarContainer}>
                <input className={styles.searchBar} name="region" type="text" onChange={handleChange} placeholder="Region Search!"/>
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