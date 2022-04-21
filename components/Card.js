import Image from "next/Image"
import Link from "next/Link"

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
                    <Image src={card.picture2} alt={card} width={imageWidth} height={256} quality={75}/>
                </Link>
            </div>
            <h2 className={styles.cardName}>{card.name} , {card.id}</h2>
            <p className={styles.cardInfo}>
                {card.linkedRegions[0].name} <br/> {card.type}
            </p>

        </div>
    )

}