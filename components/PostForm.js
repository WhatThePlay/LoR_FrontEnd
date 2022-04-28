import {useEffect, useState} from "react";
import styles from "./PostForm.module.css"
import {createCard, getAllKeywords, getAllRegions, login, updateCard} from "@lib/api";
import {useRouter} from "next/router";

const defaultModel = {
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
        errors.id = "ID can't be empty"
        isValid = false
    }

    if (card.name.trim().length === 0) {
        errors.name = "Name can't be empty"
        isValid = false
    }

    if (card.cost.toString().trim().length === 0) {
        errors.cost = "Cost can't be empty"
        isValid = false
    }

    if (card.type.trim().length === 0) {
        errors.type = "Type can't be empty"
        isValid = false;
    }

    if (card.picture1.trim().length === 0) {
        errors.picture1 = "Picture1 can't be empty. use (https://via.placeholder.com/680x1024)"
        isValid = false
    }

    if (card.picture2.trim().length === 0) {
        errors.picture2 = "Picture2 can't be empty. use (https://via.placeholder.com/2048x1024)"
        isValid = false
    }

    if (card.type === "Unit" && card.attack.toString().trim().length === 0) {
        errors.attack = "Attack can't be empty for units"
        isValid = false
    }

    if (card.type === "Unit" && card.health.toString().trim().length === 0) {
        errors.health = "Health can't be empty for units"
        isValid = false
    }

    if (card.rarity.id === 4 && card.levelUp.trim().length === 0) {
        errors.levelUp = "Level Up can't be empty for Champions"
        isValid = false
    }

    if (card.rarity.id !== 4 && card.levelUp.trim().length !== 0) {
        errors.levelup = "Level Up has to be empty for non-Champions"
        isValid = false
    }

    if (card.linkedRegions.length === 0) {
        errors.linkedRegions = "You need to choose at least one region"
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
    const [model, setModel] = useState(defaultModel)
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

        console.log(name)
        console.log(value)

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
        setErrors(defaultModel)

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

            <pre>{JSON.stringify(card, null, 4)}</pre>

            <form onSubmit={handleSubmit}>
                <fieldset className={styles.inputGroup}>
                    <label>ID:
                        <input type="text" name="id" onChange={handleChange} value={card.id}/>
                    </label>
                    {errors.id && <div className={styles.error}>{errors.id}</div>}

                    <label>Name:
                        <input type="text" name="name" onChange={handleChange} value={card.name}/>
                    </label>
                    {errors.name && <div className={styles.error}>{errors.name}</div>}

                    <label>type:
                        <select name="type" onChange={handleChange}>
                            <option value="">...</option>
                            <option value="Unit">Unit</option>
                            <option value="Spell">Spell</option>
                            <option value="Ability">Ability</option>
                        </select>
                    </label>
                    {errors.type && <div className={styles.error}>{errors.type}</div>}

                    <label>Rarity:
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
                    {errors.rarity && <div className={styles.error}>{errors.rarity}</div>}
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label>Cost:
                        <input type="number" name="cost" onChange={handleChange} value={card.cost}/>
                    </label>
                    {errors.cost && <div className={styles.error}>{errors.cost}</div>}

                    <label>Attack:
                        <input type="number" name="attack" onChange={handleChange} value={card.attack}
                               disabled={card.type !== "Unit"}/>
                    </label>
                    {errors.attack && <div className={styles.error}>{errors.attack}</div>}

                    <label>Health:
                        <input type="number" name="health" onChange={handleChange} value={card.health}
                               disabled={card.type !== "Unit"}/>
                    </label>
                    {errors.health && <div className={styles.error}>{errors.health}</div>}

                    <label>Spellspeed:
                        <select name="spellSpeed" onChange={handleChange} disabled={card.type!=="Spell"}>
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
                    {errors.spellSpeed && <div className={styles.error}>{errors.spellSpeed}</div>}
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label>Description:
                        <input type="text" name="description" onChange={handleChange} value={card.description}/>
                    </label>
                    {errors.description && <div className={styles.error}>{errors.description}</div>}

                    <label>Flavor Text:
                        <input type="text" name="flavorText" onChange={handleChange} value={card.flavorText}/>
                    </label>
                    {errors.flavorText && <div className={styles.error}>{errors.flavorText}</div>}

                    <label>Level Up:
                        {card.rarity && <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}
                                               disabled={card.rarity.id !== 4}/>}
                        {!card.rarity &&
                            <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}/>}
                    </label>
                    {errors.levelUp && <div className={styles.error}>{errors.levelUp}</div>}
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label>Card Set:
                        <input type="text" name="cardSet" onChange={handleChange} value={card.cardSet}/>
                    </label>
                    {errors.cardSet && <div className={styles.error}>{errors.cardSet}</div>}
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label>Subtype:
                        <input type="text" name="subType" onChange={handleChange} value={card.subType}/>
                    </label>
                    {errors.subType && <div className={styles.error}>{errors.subType}</div>}
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label>Region:
                        <select name="regions" onChange={handleChange}>
                            <option value={""}>
                                ...
                            </option>
                            {regions && <>
                                {
                                    regions.map(region => {
                                        return (
                                            <>
                                                <option value={region.id}>
                                                    {region.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                        {errors.linkedRegions && <div className={styles.error}>{errors.linkedRegions}</div>}
                        <select name="regions2" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {regions && <>
                                {
                                    regions.map(region => {
                                        return (
                                            <>
                                                <option value={region.id}>
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
                    <label>Keyword:
                        <select name="keywords" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                        <select name="keywords2" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                        <select name="keywords3" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id}>
                                                    {keyword.name}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </>}
                        </select>
                        <select name="keywords4" onChange={handleChange}>
                            <option value={0}>
                                ...
                            </option>
                            {keywords && <>
                                {
                                    keywords.map(keyword => {
                                        return (
                                            <>
                                                <option value={keyword.id}>
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
                    <label>Picture 1:
                        <input type="text" name="picture1" onChange={handleChange} value={card.picture1}/>
                    </label>
                    {errors.picture1 && <div className={styles.error}>{errors.picture1}</div>}

                    <label>Picture 2:
                        <input type="text" name="picture2" onChange={handleChange} value={card.picture2}/>
                    </label>
                    {errors.picture2 && <div className={styles.error}>{errors.picture2}</div>}

                    <label>Artist:
                        <input type="text" name="artist" onChange={handleChange} value={card.artist}/>
                    </label>
                    {errors.artist && <div className={styles.error}>{errors.artist}</div>}
                </fieldset>


                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}