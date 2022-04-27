import {useEffect, useState} from "react";
import styles from "./PostForm.module.css"
import {createCard, getAllKeywords, getAllRegions, login, updateCard} from "@lib/api";
import {useRouter} from "next/router";

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
        "id": 1
    },
    "linkedRegions": [
        {
            "id": 0
        }
    ],
    "linkedKeywords": []
}

function validateModel(card) {
    const errors = {
        id: "",
        name: "",
        cost: "",
        type: "",
        picture1: "",
        picture2: "",
        attack: "",
        health: "",
        description: "",
        flavorText: "",
        artist: "",
        levelUp: "",
        spellSpeed: "",
        cardSet: "",
        subType: "",
        rarity: "",
        linkedRegions: "",
        linkedKeywords: ""
    }
    let isValid = true

    if (card.name.trim().length === 0) {
        errors.title = "Name can't be empty"
        isValid = false
    }

    if (card.type.trim().length === 0) {
        errors.type = "Type can't be empty"
        isValid = false;
    }

    return {errors, isValid}
}

export default function PostForm({cardToEdit, session}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [card, setCard] = useState(defaultModel)
    const [errors, setErrors] = useState(defaultModel)
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
            card.userId = session.user.id
            const newPost = await createCard(card, session.accessToken)
            alert("Card created!")
            router.push(`/cards/${newPost.id}`)
        }
        setIsLoading(false)
    }

    return regions && (
        <div className={styles.postform}>

            <pre>{JSON.stringify(card, null, 4)}</pre>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>ID:</label>
                    <input type="text" name="id" onChange={handleChange} value={card.id}/>
                    {/*{errors.id && <div className={styles.error}>{errors.id}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} value={card.name}/>
                    {/*{errors.name && <div className={styles.error}>{errors.name}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Cost:</label>
                    <input type="number" name="cost" onChange={handleChange} value={card.cost}/>
                    {/*{errors.cost && <div className={styles.error}>{errors.cost}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>type:</label>
                    <select name="type" onChange={handleChange}>
                        <option value={0}>...</option>
                        <option value="Unit">Unit</option>
                        <option value="Spell">Spell</option>
                        <option value="Ability">Ability</option>
                    </select>
                    {/*{errors.type && <div className={styles.error}>{errors.type}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Picture 1:</label>
                    <input type="text" name="picture1" onChange={handleChange} value={card.picture1}/>
                    {/*{errors.picture1 && <div className={styles.error}>{errors.picture1}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Picture 2:</label>
                    <input type="text" name="picture2" onChange={handleChange} value={card.picture2}/>
                    {/*{errors.picture2 && <div className={styles.error}>{errors.picture2}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Attack:</label>
                    <input type="number" name="attack" onChange={handleChange} value={card.attack}
                           disabled={card.type !== "Unit"}/>
                    {/*{errors.attack && <div className={styles.error}>{errors.attack}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Health:</label>
                    <input type="number" name="health" onChange={handleChange} value={card.health}
                           disabled={card.type !== "Unit"}/>
                    {/*{errors.health && <div className={styles.error}>{errors.health}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Description:</label>
                    <input type="text" name="description" onChange={handleChange} value={card.description}/>
                    {/*{errors.description && <div className={styles.error}>{errors.description}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Flavor Text:</label>
                    <input type="text" name="flavorText" onChange={handleChange} value={card.flavorText}/>
                    {/*{errors.flavorText && <div className={styles.error}>{errors.flavorText}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Artist:</label>
                    <input type="text" name="artist" onChange={handleChange} value={card.artist}/>
                    {/*{errors.artist && <div className={styles.error}>{errors.artist}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Level Up:</label>
                    {card.rarity && <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}
                           disabled={card.rarity.id !== 4}/>}
                    {!card.rarity && <input type="text" name="levelUp" onChange={handleChange} value={card.levelUp}/>}
                    {/*{errors.levelUp && <div className={styles.error}>{errors.levelUp}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Spellspeed:</label>
                    <input type="text" name="spellSpeed" onChange={handleChange} value={card.spellSpeed}
                           disabled={card.type !== "Spell"}/>
                    {/*{errors.spellSpeed && <div className={styles.error}>{errors.spellSpeed}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Card Set:</label>
                    <input type="text" name="cardSet" onChange={handleChange} value={card.cardSet}/>
                    {/*{errors.cardSet && <div className={styles.error}>{errors.cardSet}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Subtype:</label>
                    <input type="text" name="subType" onChange={handleChange} value={card.subType}/>
                    {/*{errors.subType && <div className={styles.error}>{errors.subType}</div>}*/}
                </fieldset>

                <fieldset>
                    <label>Choose a Rarity</label>
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
                </fieldset>

                <fieldset>
                    <label>Choose a Region</label>
                    <select name="regions" onChange={handleChange}>
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
                </fieldset>

                <fieldset>
                    <label>Choose a Keyword</label>
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
                </fieldset>


                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}