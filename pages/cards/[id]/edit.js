import PostForm from "@components/PostForm";
import {useRedirectToLogin} from "@lib/session";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getCardById} from "@lib/api";
import Banner from "@components/Banner";

export default function CreatePage({session}) {
    useRedirectToLogin(session)

    const router = useRouter()
    const {id} = router.query
    const [card, setCard] = useState()

    useEffect(() => {
        if (!id) return
        const loadCard = async () => {
            try {
                const card = await getCardById(id)
                setCard(card)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadCard()
    }, [id, router])

    return card && (
        <div>
            <Banner imageUrl={card[0].picture2}/>
            <h1>
                Here you can edit an already existing card. You need to reenter the Rarity though :/ <br/> You are
                editing {card[0].name}
            </h1>

            <PostForm session={session} cardToEdit={card[0]}/>
        </div>
    )
}