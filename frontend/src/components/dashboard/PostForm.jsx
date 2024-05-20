import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [showInputs, setShowInputs] = useState(false);
  const [buttonText, setButtonText] = useState('Add Post');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      };
  
      const response = await axios.post('/api/posts', formData, config);
      console.log('Post created:', response.data);
      
      setFormData({ title: '', content: '' });
      
      setShowInputs(false);
      setButtonText('Add Post'); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  

  const handleToggleInputs = () => {
    setShowInputs(!showInputs);
    setButtonText(showInputs ? 'Add Post' : 'Cancel');
  };

  return (
    <div className=" border-2 border-cyan-300 rounded-lg p-4">
      <button
        onClick={handleToggleInputs}
        className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {buttonText}
      </button>
      {showInputs && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full border-b-2 bg-black py-1 px-3 text-white leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              className="block bg-black w-full border-b-2  py-1 px-3 text-white leading-tight focus:outline-none"
              rows="2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PostForm;
