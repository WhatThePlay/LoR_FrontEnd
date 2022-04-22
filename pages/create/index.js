import PostForm from "@components/PostForm";

export default function CreatePage({session}){
    return (
        <div>
            Here you can create a new Card
            <PostForm session={session}/>
        </div>
    )
}