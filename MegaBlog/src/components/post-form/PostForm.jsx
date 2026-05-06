import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userID === userData.$id : false;
    const [submitting, setSubmitting] = useState(false);

    const submit = async (data) => {
        setSubmitting(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    const dbPost = await appwriteService.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        status: data.status,
                        featuredImage: fileId,
                        userID: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        alert("Failed to create post. The slug might already exist or there was a server error.");
                    }
                } else {
                    alert("Image upload failed. Please try again.");
                    console.error("Image upload failed");
                }
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error("PostForm submit error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            const transformed = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
            
            // Appwrite IDs can't start with special characters
            return transformed.startsWith("-") ? transformed.slice(1) : transformed;
        }

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-2/3 px-2 mb-4 lg:mb-0">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        className="mb-6"
                        {...register("title", { required: true })}
                    />
                    {errors.title && <p className="text-red-500 text-xs -mt-4 mb-4 font-medium italic">Title is required</p>}
                    
                    <Input
                        label="Slug"
                        placeholder="post-url-slug"
                        className="mb-6"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    {errors.slug && <p className="text-red-500 text-xs -mt-4 mb-4 font-medium italic">Slug is required</p>}
                    
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="w-full lg:w-1/3 px-2">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-6"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {errors.image && <p className="text-red-500 text-xs -mt-4 mb-4 font-medium italic">Image is required</p>}
                    
                    {post && (
                        <div className="w-full mb-6 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full object-cover"
                            />
                        </div>
                    )}
                    
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-6"
                        {...register("status", { required: true })}
                    />
                    
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"} 
                        className="w-full shadow-lg shadow-indigo-100 mt-2"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : (post ? "Update Post" : "Publish Post")}
                    </Button>
                </div>
            </div>
        </form>
    );
}