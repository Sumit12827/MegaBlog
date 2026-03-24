import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <Container>
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <PostForm />
        </Container>
    )
}

export default AddPost;