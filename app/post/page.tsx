'use client'

import { useState } from 'react';

const PostCreate = () => {
  const [title, setTitle] = useState<string>(''); // Explicit type for better TypeScript handling
  const [content, setContent] = useState<string>(''); // Explicit type for better TypeScript handling

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the post, e.g., an API request
    console.log('Post created:', { title, content });
    // router.push('/community'); // Redirect after post creation
  };

  return (
    <div className="min-h-screen bg-pink-50">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300"
          >
            Create Post
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="bg-pink-200 py-4 text-center text-pink-600">
        <p className="text-sm">Powered by Studify - Connecting students through ideas and projects</p>
      </footer>
    </div>
  );
};

export default PostCreate;
