import React from 'react';

export default function Navbar({ handlePublish }) {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-md px-6 py-4 shadow-md border-b border-indigo-300">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-700">Form Creator</h1>
        
        <button
          onClick={handlePublish}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
        >
          🚀 Publish
        </button>
      </div>
    </nav>
  );
}
