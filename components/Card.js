import Image from "next/image"
import Link from "next/link"

import styles from "./Card.module.css"

export default function Card({card}){

    let imageWidth = 0;
    if (card.type === "Unit") {
        imageWidth = 512
    } else{
        imageWidth = 256
    }

    return(
        <div className={styles.cardContainer}>
            <div className={styles.picture}>
                <Link href={"cards/" + card.id} >
                    <a><Image src={card.picture1} alt={card.name} width={680} height={1024} quality={75}/></a>
                </Link>
            </div>
            <h2 className={styles.cardName}>{card.name}</h2>
            {/*<p className={styles.cardInfo}>*/}
            {/*    {card.linkedRegions[0].name} <br/> {card.type}*/}
            {/*</p>*/}

        </div>
    )

}