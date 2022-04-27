import PostForm from "@components/PostForm";
import {useRedirectToLogin} from "@lib/session";

export default function CreatePage({session}){
    useRedirectToLogin(session)

    return (
        <div>
            Here you can create a new Card
            <PostForm session={session}/>
        </div>
    )
}