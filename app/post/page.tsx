'use client'

import { useState } from 'react';

const PostCreate = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [linkedinLink, setLinkedinLink] = useState<string>('');
  const [githubLink, setGithubLink] = useState<string>('');
  
  // State to hold posts
  const [posts, setPosts] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new post object
    const newPost = {
      title,
      content,
      category,
      tags,
      profilePicture, // Optional profile picture
      linkedinLink,
      githubLink,
    };
    
    // Add the new post to the posts array
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // Reset the form
    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Profile Section */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-pink-100 p-6 rounded-full shadow-lg flex items-center space-x-4">
          {/* Profile Picture Upload */}
          <div>
            <label htmlFor="profile-pic" className="block text-pink-600 font-semibold text-lg">Profile Picture</label>
            <input
              id="profile-pic"
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handleProfilePictureChange}
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-pink-300 mt-4"
              />
            )}
          </div>

          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-semibold text-pink-600">Jane Doe</h2>
            <p className="text-sm text-pink-500">Student | Studify Community</p>
            <div className="mt-4 space-x-4">
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                LinkedIn
              </a>
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Post Creation Form */}
      <header className="bg-pink-200 py-4 text-center text-white shadow-md">
        <h1 className="text-3xl font-semibold">Create a New Post</h1>
        <p className="mt-2 text-lg">Share your thoughts with the community</p>
      </header>

      <div className="container mx-auto mt-12 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          {/* Post Title Input */}
          <div>
            <label htmlFor="title" className="block text-pink-600 font-semibold text-lg">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full mt-2 p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your post"
              required
            />
          </div>

          {/* Post Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-pink-600 font-semibold text-lg">
              Post Content
            </label>
            <textarea
              id="content"
              rows={6}
              className="w-full mt-2 p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              required
            />
          </div>

          {/* Post Category Input */}
          <div>
            <label htmlFor="category" className="block text-pink-600 font-semibold text-lg">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="w-full mt-2 p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Education, Technology"
            />
          </div>

          {/* Post Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-pink-600 font-semibold text-lg">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              className="w-full mt-2 p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags, separated by commas"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300"
          >
            Create Post
          </button>
        </form>
      </div>

      {/* Display Posts Section */}
      <div className="container mx-auto mt-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                {post.profilePicture && (
                  <img
                    src={post.profilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-pink-300"
                  />
                )}
                <h3 className="text-xl font-semibold text-pink-600">{post.title}</h3>
                <p className="text-sm text-pink-500">{post.category}</p>
                <p className="text-gray-700">{post.content}</p>
                <div className="mt-4 space-x-4">
                  {post.linkedinLink && (
                    <a href={post.linkedinLink} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                      LinkedIn
                    </a>
                  )}
                  {post.githubLink && (
                    <a href={post.githubLink} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-pink-500">No posts yet. Create one to get started!</p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-pink-200 py-4 text-center text-pink-600">
        <p className="text-sm">Powered by Studify - Connecting students through ideas and projects</p>
      </footer>
    </div>
  );
};

export default PostCreate;
