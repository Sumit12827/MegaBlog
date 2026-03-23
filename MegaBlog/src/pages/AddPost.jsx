import React from "react";
import { Container  , PostFrom} from "../components";

function AddPost() {
    return (
        <Container>
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <PostFrom />
        </Container>
    )
}

export default AddPost;