import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({
    $id , title , featuredImage 
}) {
    return (
    <Link to={`/post/${$id}`}>  
     <div className='group w-full bg-white border border-slate-200 rounded-2xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300'>
        <div className='w-full mb-4 overflow-hidden rounded-xl'>
            <img 
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title} 
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" 
            />
        </div>
        <div className="px-1">
            <h2 className='text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors'>
                {title}
            </h2>
        </div>
     </div>
    </Link>
    )
}

export default PostCard;
