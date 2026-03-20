import React from "react";
import appwriteService from "../services/appwriteService";
import { Link } from "react-router-dom";

function PostCard({
    $id , title , featuredImage 
}) {
    return (
    <Link to =  {`/Post/${$id}`}>  
     <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify centre mb-4'>

         <img src = {appwriteService.getFilePreview(featuredImage)} alt = {title} className="rounded-xl" />

        </div>
        <h2 className= 'text-xl font-bold '>{title}</h2>
     </div>
    </Link>
    )
}
