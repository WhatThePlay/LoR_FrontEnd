import Image from "next/image"

import styles from "./Region.module.css"

export default function Region({region}) {


    return (
        <div className={styles.regionContainer}>

            <div className={styles.picture}>
                <Image src={region.crest} layout="fill" objectFit="contain" alt="pokemon"/>
            </div>
            <div className={styles.regionInfo}>
                <h2 className={styles.regionName}>{region.name}</h2>
                <p>
                    {region.motto} <br/><br/> {region.description}

                </p>
            </div>
        </div>
    )

}