import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.reverse().map((post) => (
        <div key={post._id} className="mb-4 border-cyan-300 border-2 p-5 rounded-lg">
          <p className="text-gray-400 ">@{post.user.username}</p>
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-300">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
