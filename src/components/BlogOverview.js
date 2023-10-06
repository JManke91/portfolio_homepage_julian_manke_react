// BlogOverview.js
import React from 'react';
import './styles.css'; // Import the CSS file
import { Link } from 'react-router-dom';


const BlogOverview = ({ blogPosts }) => {
    return (
      <div>
        <h1>Blog Overview</h1>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
              
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default BlogOverview;
