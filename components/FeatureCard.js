import Image from "next/Image"
import Link from "next/Link"

import styles from "./FeatureCard.module.css"
import {useEffect, useState} from "react";
import {getAllCards} from "@lib/api";

export default function FeatureCard({card}){
    return card && (
        <div className={styles.cardContainer}>
            <div className={styles.picture}>
                <Link href={"cards/" + card.id} >
                    <a><Image src={card.picture1} alt={card.name} width={680} height={1024} quality={75}/></a>
                </Link>
            </div>
            <h2 className={styles.cardName}>{card.name} , {card.id}</h2>
        </div>
    )

}