import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getCardById, deleteCard} from "@lib/api";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/Link";

export default function CardPage({session}) {
    const router = useRouter()
    const {id} = router.query
    const [card, setCard] = useState()
    const user = session.user

    useEffect(() => {
        if (!id) return
        const loadCard = async () => {
            try {
                const card = await getCardById(id)
                setCard(card)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadCard()
    }, [id, router])

    const deleteMe = (() => {
        deleteCard(card[0].id)
    })

    return !card ? null : (
        <div>
            <div style={{backgroundImage: "url(" + card[0].picture2 + ")"}} className={styles.bannerContainer}>
                <div className={styles.banner}>
                    <Image alt="banner" src={card[0].picture2} width={2048} height={1024} quality={100}/>
                </div>
            </div>
            <h1>{card[0].name}</h1>

            {user && <Link href={`/cards/${card[0].id}/edit`} passHref><a className="button">Edit me</a></Link>}
            {user && <button onClick={deleteMe}>delete me</button>}

            <div className={styles.cardImage}>
                <Image src={card[0].picture1} alt={card[0].name} width={680} height={1024} quality={100}/>
            </div>
            <div>
                <table className={styles.cardInfos}>
                    <tr>
                        <th>Name</th>
                        <td>{card[0].name}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{card[0].type}</td>
                    </tr>
                    {card[0].type === "Spell" &&
                        <tr>
                            <th>Speed</th>
                            <td>{card[0].spellSpeed}</td>
                        </tr>}
                    {/*<tr>*/}
                    {/*    <th>Rarity</th>*/}
                    {/*    <td>hm</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <th>Region</th>
                        <td>{card[0].linkedRegions[0].name}</td>
                    </tr>
                    <tr>
                        <th>Cost</th>
                        <td>{card[0].cost}</td>
                    </tr>
                    {card[0].type === "Unit" &&
                        <tr>
                            <th>Attack</th>
                            <td>{card[0].attack}</td>
                        </tr>}
                    {card[0].type === "Unit" &&
                        <tr>
                            <th>Health</th>
                            <td>{card[0].health}</td>
                        </tr>}
                </table>
            </div>
        </div>
    )
}