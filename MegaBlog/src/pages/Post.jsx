import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import { Edit, Trash2 } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <div className="py-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full mb-8 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover max-h-[500px]"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-white/90 hover:bg-white" textColor="text-indigo-600" className="flex items-center space-x-2 backdrop-blur-sm shadow-lg">
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500/90 hover:bg-red-500" onClick={deletePost} className="flex items-center space-x-2 backdrop-blur-sm shadow-lg">
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    <div className="w-full mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}