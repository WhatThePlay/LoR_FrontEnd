import {useEffect, useState} from "react";
import styles from "./PostForm.module.css"
import {createCard, getAllKeywords, getAllRegions, updateCard} from "@lib/api";
import {useRouter} from "next/router";

const exampleModel = {
    "id": "Vi",
    "name": "Vi",
    "cost": 5,
    "type": "Unit",
    "picture1": "https://dd.b.pvp.net/3_2_0/set2/en_us/img/cards/02PZ008.png",
    "picture2": "https://dd.b.pvp.net/3_6_0/set2/en_us/img/cards/02PZ008-full.png",
    "attack": 2,
    "health": 4,
    "description": "While I'm in play or in hand, grant me +1|+0 when you play another card (max +8|+0).",
    "flavorText": "\"Enforcer Vi, please! Think of the people! The collateral damage! The PAPERWORK FOR INJURY CLAIMS!\" - Insightful Investigator",
    "artist": "SIXMOREVODKA",
    "levelUp": "I've struck for 10+ Damage.",
    "spellSpeed": "",
    "cardSet": "Set2",
    "subType": "",
    "rarity": {
        "id": 4
    },
    "linkedRegions": [
        {
            "id": 9
        }
    ],
    "linkedKeywords": [
        {
            "id": 51
        },
        {
            "id": 61
        }
    ]
}

const defaultModel = {
    "id": "",
    "name": "",
    "cost": 0,
    "type": "",
    "picture1": "",
    "picture2": "",
    "attack": 0,
    "health": 0,
    "description": "",
    "flavorText": "",
    "artist": "",
    "levelUp": "",
    "spellSpeed": "",
    "cardSet": "",
    "subType": "",
    "rarity": {
        "id": 0
    },
    "linkedRegions": [],
    "linkedKeywords": []
}

function validateModel(card) {
    const errors = {
        // id: "",
        // name: "",
        // cost: "",
        // type: "",
        // picture1: "",
        // picture2: "",
        // attack: "",
        // health: "",
        // description: "",
        // flavorText: "",
        // artist: "",
        // levelUp: "",
        // spellSpeed: "",
        // cardSet: "",
        // subType: "",
        // rarity: "",
        // linkedRegions: "",
        // linkedKeywords: ""
    }
    let isValid = true

    if (card.id.trim().length === 0) {
        errors.id = "ID can't be empty!"
        isValid = false
    }

    if (card.name.trim().length === 0) {
        errors.name = "Name can't be empty!"
        isValid = false
    }

    if (card.cost.toString().trim().length === 0) {
        errors.cost = "Cost can't be empty!"
        isValid = false
    }

    if (card.type.trim().length === 0) {
        errors.type = "Type can't be empty!"
        isValid = false;
    }

    if (card.picture1.trim().length === 0) {
        errors.picture1 = "Picture1 can't be empty! use (https://via.placeholder.com/680x1024)"
        isValid = false
    } else if (!card.picture1.trim().includes("dd.b.pvp.net") && !card.picture1.trim().includes("static.wikia.nocookie.net") && !card.picture1.trim().includes("cdn1.dotesports.com") && !card.picture1.trim().includes("via.placeholder.com")) {
        errors.picture1 = "This Picture does not seem to be valid! try (https://via.placeholder.com/680x1024)"
        isValid = false
    }

    if (card.picture2.trim().length === 0) {
        errors.picture2 = "Picture2 can't be empty! use (https://via.placeholder.com/2048x1024)"
        isValid = false
    } else if (!card.picture2.trim().includes("dd.b.pvp.net") && !card.picture2.trim().includes("static.wikia.nocookie.net") && !card.picture2.trim().includes("cdn1.dotesports.com") && !card.picture2.trim().includes("via.placeholder.com")) {
        errors.picture2 = "This Picture does not seem to be valid! try (https://via.placeholder.com/680x1024)"
        isValid = false
    }

    if (card.type === "Spell" && card.spellSpeed.trim().length === 0) {
        errors.spellSpeed = "Spellspeed can't be empty for Spells!"
        isValid = false
    }

    if (card.type === "Unit" && card.attack.toString().trim().length === 0) {
        errors.attack = "Attack can't be empty for units!"
        isValid = false
    }

    if (card.type === "Unit" && card.health.toString().trim().length === 0) {
        errors.health = "Health can't be empty for units!"
        isValid = false
    } else if (card.type === "Unit" && card.health === 0) {
        errors.health = "Health can't be 0 for units!"
        isValid = false
    }

    if (card.rarity.id === 0) {
        errors.rarity = "Rarity can't be empty!"
        isValid = false
    }

    if (card.rarity.id === 4 && card.levelUp.trim().length === 0) {
        errors.levelUp = "Level Up can't be empty for Champions!"
        isValid = false
    }

    if (card.rarity.id === 4 && card.type !== "Unit") {
        errors.type = "A Champion has to be a Unit!"
        isValid = false
    }

    if (card.rarity.id !== 4 && card.levelUp.trim().length !== 0) {
        errors.levelup = "Level Up has to be empty for non-Champions!"
        isValid = false
    }

    if (card.linkedRegions.length === 0) {
        errors.linkedRegions = "You need to choose at least one region!"
        isValid = false
    }

    return {errors, isValid}
}

export default function PostForm({cardToEdit, session}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [card, setCard] = useState(defaultModel)
    const [errors, setErrors] = useState({})
    const [regions, setRegions] = useState()
    const [keywords, setKeywords] = useState()
    const [model, setModel] = useState(exampleModel)
    const [method, setMethod] = useState(false)

    useEffect(() => {
        if (cardToEdit) {
            setCard(cardToEdit)
            setMethod(true)
        }
    }, [cardToEdit])

    useEffect(() => {
        const loadRegions = async () => {
            try {
                const regions = await getAllRegions()
                setRegions(regions)
            } catch (e) {
                alert("Could not load regions!")
            }
        }
        const loadKeywords = async () => {
            try {
                const keywords = await getAllKeywords()
                setKeywords(keywords)
            } catch (e) {
                alert("Could not load keywords!")
            }
        }

        loadRegions()
        loadKeywords()
    }, [])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === "regions") {
            setCard({
                ...card,
                "linkedRegions": [
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "regions2") {
            setCard({
                ...card,
                "linkedRegions": [
                    {
                        "id": card.linkedRegions[0].id
                    },
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "keywords") {
            setCard({
                ...card,
                "linkedKeywords": [
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "keywords2") {
            setCard({
                ...card,
                "linkedKeywords": [
                    {
                        "id": card.linkedKeywords[0].id
                    },
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "keywords3") {
            setCard({
                ...card,
                "linkedKeywords": [
                    {
                        "id": card.linkedKeywords[0].id
                    },
                    {
                        "id": card.linkedKeywords[1].id
                    },
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "keywords4") {
            setCard({
                ...card,
                "linkedKeywords": [
                    {
                        "id": card.linkedKeywords[0].id
                    },
                    {
                        "id": card.linkedKeywords[1].id
                    },
                    {
                        "id": card.linkedKeywords[2].id
                    },
                    {
                        "id": parseInt(value)
                    }
                ]
            })
        } else if (name === "rarity") {
            setCard({
                ...card,
                rarity: {
                    "id": parseInt(value)
                }
            })
        } else {
            setCard({
                ...card,
                [name]: value
            })
        }
        console.log(JSON.stringify(card))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        // setErrors(exampleModel)

        const result = validateModel(card)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if (method) {
            await updateCard(card, session.accessToken)
            alert("Card updated!")
            router.push(`/cards/${card.id}`)
        } else {
            const newCard = await createCard(card, session.accessToken)
            alert("Card created!")
            router.push(`/cards/${newCard.id}`)
        }
        setIsLoading(false)
    }

    return regions && (
        <div className={styles.formContainer}>

            {/*<pre>{JSON.stringify(card, null, 4)}</pre>*/}

            <form onSubmit={handleSubmit}>
                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>ID</span>{errors.id && <span className={styles.error}>{errors.id}</span>}
                        <input type="text" name="id" onChange={handleChange} value={card.id}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Name</span>{errors.name && <span className={styles.error}>{errors.name}</span>}
                        <input type="text" name="name" onChange={handleChange} value={card.name}/>
                    </label>


                    <label className={styles.customField}>
                        <span>Type</span>{errors.type && <span className={styles.error}>{errors.type}</span>}
                        <select name="type" onChange={handleChange}>
                            <option value="">...</option>
                            <option value="Unit">Unit</option>
                            <option value="Spell">Spell</option>
                            <option value="Ability">Ability</option>
                        </select>
                    </label>

                    <label className={styles.customField}>
                        <span>Rarity</span>{errors.rarity && <span className={styles.error}>{errors.rarity}</span>}
                        <select name="rarity" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            <option value={1}>
                                Common
                            </option>
                            <option value={2}>
                                Rare
                            </option>
                            <option value={3}>
                                Epic
                            </option>
                            <option value={4}>
                                Champion
                            </option>
                        </select>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Cost</span>{errors.cost && <span className={styles.error}>{errors.cost}</span>}
                        <input type="number" name="cost" onChange={handleChange} value={card.cost}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Attack</span>{errors.attack && <span className={styles.error}>{errors.attack}</span>}
                        <input type="number" name="attack" onChange={handleChange} value={card.attack}
                               disabled={card.type !== "Unit"}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Health</span>{errors.health && <span className={styles.error}>{errors.health}</span>}
                        <input type="number" name="health" onChange={handleChange} value={card.health}
                               disabled={card.type !== "Unit"}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Spellspeed</span>{errors.spellSpeed &&
                        <span className={styles.error}>{errors.spellSpeed}</span>}
                        <select name="spellSpeed" onChange={handleChange} disabled={card.type !== "Spell"}>
                            <option value={""}>
                                ...
                            </option>
                            <option value={"Burst"}>
                                Burst
                            </option>
                            <option value={"Focus"}>
                                Focus
                            </option>
                            <option value={"Fast"}>
                                Fast
                            </option>
                            <option value={"Slow"}>
                                Slow
                            </option>
                        </select>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Description</span>{errors.description &&
                        <span className={styles.error}>{errors.description}</span>}
                        <input type="text" name="description" onChange={handleChange} value={card.description}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Flavor Text</span>{errors.flavorText &&
                        <span className={styles.error}>{errors.flavorText}</span>}
                        <input type="text" name="flavorText" onChange={handleChange} value={card.flavorText}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Level Up</span>{errors.levelUp && <span className={styles.error}>{errors.levelUp}</span>}
                        {card.rarity && <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}
                                               disabled={card.rarity.id !== 4}/>}
                        {!card.rarity &&
                            <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}/>}
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Card Set</span>{errors.cardSet && <span className={styles.error}>{errors.cardSet}</span>}
                        <input type="text" name="cardSet" onChange={handleChange} value={card.cardSet}/>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Subtype</span>{errors.subType && <span className={styles.error}>{errors.subType}</span>}
                        <input type="text" name="subType" onChange={handleChange} value={card.subType}/>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Region</span>{errors.linkedRegions &&
                        <span className={styles.error}>{errors.linkedRegions}</span>}
                        <select name="regions" onChange={handleChange}>
                            <option value={""}>
                                ...
                            </option>
                            {regions && <>
                                {
                                    regions.map(region => {
                                        return (
                                            <>
                                                <option value={region.id} key={region.id}>
                                                    {region.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                    <label className={styles.customField}>
                        <span>Region 2</span>
                        <select name="regions2" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {regions && <>
                                {
                                    regions.map(region => {
                                        return (
                                            <>
                                                <option value={region.id} key={region.id}>
                                                    {region.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Keyword</span>
                        <select name="keywords" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id} key={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                    <label className={styles.customField}>
                        <span>Keyword 2</span>
                        <select name="keywords2" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id} key={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                    <label className={styles.customField}>
                        <span>Keyword 3</span>
                        <select name="keywords3" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id} key={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                    <label className={styles.customField}>
                        <span>Keyword 4</span>
                        <select name="keywords4" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id} key={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Picture 1</span>{errors.picture1 &&
                        <span className={styles.error}>{errors.picture1}</span>}
                        <input type="text" name="picture1" onChange={handleChange} value={card.picture1}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Picture 2</span>{errors.picture2 &&
                        <span className={styles.error}>{errors.picture2}</span>}
                        <input type="text" name="picture2" onChange={handleChange} value={card.picture2}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Artist</span>{errors.artist && <span className={styles.error}>{errors.artist}</span>}
                        <input type="text" name="artist" onChange={handleChange} value={card.artist}/>
                    </label>
                </fieldset>


                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}