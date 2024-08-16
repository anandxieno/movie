import { useEffect, useState } from "react"
import Link from 'next/link';
import Image from "next/image";


export default function Actor({ActorData}){
    let[LinkPath, setLinkpath] = useState('/');
    let[imgPath, setImgPath] = useState('/120x120.svg');

    useEffect(()=>{
        if(ActorData.original_name){
            setLinkpath(ActorData.original_name.split(" ").join('+'));
        }
        if(ActorData.profile_path !== null){
            setImgPath(`https://image.tmdb.org/t/p/w500/${ActorData.profile_path}`);
        }
    }, [ActorData.original_name])

    return (
        <Link href={`../actor/${LinkPath}`}>
        <div className="py-2 px-1">
          <figure className="w-[120px] h-[120px] rounded-full mx-auto">
            <Image src={imgPath} width={120} height={120} alt={ActorData.original_name} className="h-full object-cover object-top rounded-full"></Image>
          </figure>
          
          <h4 className="text-center">{ActorData.original_name}</h4>
          <span className="text-center block text-gray-500">{ActorData.known_for_department}</span>
         </div>
        </Link>
    )
}