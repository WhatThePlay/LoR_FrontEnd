import styles from "./Banner.module.css";
import Image from "next/image";

export default function Banner({imageUrl, type, width, height}){

    let isSpell = false

    let imageWidth = 2048;
    let imageHeight = 1024;

    if (type === "Spell" || type === "Ability" || type === "Trap"){
        imageWidth = 1024;
        isSpell = true
    }

    if (width){
        imageWidth = width
    }

    if (height){
        imageHeight = height
    }




    return(
        <div style={{backgroundImage: "url(" + imageUrl + ")"}} className={styles.bannerContainer}>
            <div className={isSpell ? styles.spellBanner : styles.banner}>
                <Image alt="banner" src={imageUrl}
                       width={imageWidth} height={imageHeight} quality={100}/>
            </div>
        </div>
    )
}