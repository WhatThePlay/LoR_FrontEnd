import Image from "next/Image"
import styles from "./index.module.css"
import Card from "@components/Card";

export default function CardsPage(){
    return (
        <div>

            <div className={styles.banner}>
                <Image alt="banner" src="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO014-full.png" width={2048} height={1024} quality={100} />
            </div>
            <h1>
                All the Cards
            </h1>
            <p>
                Here you can check out all the existing cards. You can click on them to see them in a more detailed view. There
                will also be a search function in the future.
            </p>
        </div>
    )
}