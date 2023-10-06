// BlogDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = ({ blogPosts }) => {
    // Access the 'id' parameter from the route
    const { id } = useParams();

    // Find the blog post with the matching 'id'
    const blogPost = blogPosts.find((post) => post.id === parseInt(id));

    if (!blogPost) {
        return <div>Blog post not found</div>;
    }

    return (
        <div>
            <h1>{blogPost.title}</h1>
            <p>{blogPost.content}</p>
        </div>
    );
};

export default BlogDetail;
