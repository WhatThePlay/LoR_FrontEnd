import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getCardById} from "@lib/api";
import styles from "./index.module.css";
import Image from "next/image";

export default function CardPage() {
    const router = useRouter()
    const {id} = router.query
    const [card, setCard] = useState()

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


    return !card ? null : (
        <div>
            <div style={{backgroundImage: "url(" + card[0].picture2 + ")"}} className={styles.bannerContainer}>
                <div className={styles.banner}>
                    <Image alt="banner" src={card[0].picture2} width={2048} height={1024} quality={100}/>
                </div>
            </div>
            <h1>{card[0].name}</h1>
        </div>
    )
}