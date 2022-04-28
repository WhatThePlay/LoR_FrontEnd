import PostForm from "@components/PostForm";
import {useRedirectToLogin} from "@lib/session";
import Banner from "@components/Banner";

export default function CreatePage({session}){
    useRedirectToLogin(session)

    return (
        <div>
            <Banner imageUrl="https://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ003-full.png"/>
            <h1>Here you can create your very own Card!</h1>
            <PostForm session={session}/>
        </div>
    )
}