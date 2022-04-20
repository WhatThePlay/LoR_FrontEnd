import Image from "next/Image"

export default function Card({name}){

    return(
        <div>
            <Image src="picture" alt="name" width={2048} height={1024} />
            <h2>{name}</h2>
            <p>
                region <br/> type
            </p>

        </div>
    )

}