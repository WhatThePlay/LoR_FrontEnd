import {useEffect, useState} from "react";
import {getAllCards, getAllRegions} from "@lib/api";
import styles from "../regions/index.module.css";
import Region from "@components/Region";
import Image from "next/image";
import Banner from "@components/Banner";

export default function RegionsPage(){
    const [regions, setRegions] = useState([])

    useEffect(() => {
        const loadRegions = async () => {
            try {
                const regions = await getAllRegions()
                setRegions(regions)
            } catch (e) {
                alert("Could not load regions!")
            }
        }
        loadRegions()
    }, [])

    return (
        <div>
            <Banner imageUrl="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR038-full.png" />

            <h1>
                All the Regions
            </h1>

            <p>
                Here you can find all the Information regarding the different regions of Legends of Runeterra.
            </p>

            <section className={styles.regionSection}>
                {regions && <>
                    {
                        regions.map(region => {
                            return (
                                <div key={region.id}>
                                    <div className={styles.line}/>
                                    <Region region={region}/>
                                </div>
                            )
                        })
                    }
                </>}
            </section>
        </div>
    )
}