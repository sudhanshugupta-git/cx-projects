import React from 'react';

// export default function Navbar({ handlePublish }) {
//   return (
//     <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-md px-6 py-4 shadow-md border-b border-indigo-300">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-indigo-700">Form Creator</h1>
        
//         <button
//           onClick={handlePublish}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
//         >
//           🚀 Publish
//         </button>
//       </div>
//     </nav>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function Navbar({
  handlePublish,
  isLoggedIn,
  setIsLoggedIn,
  previewEnabled,
  showPreview,
  setShowPreview,
}) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-lg font-bold">Form Creator</h1>

      {isLoggedIn ? (
        <div className="flex gap-4">
          <button
            onClick={handlePublish}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Publish
          </button>
          <button
            onClick={() => setShowPreview(prev => !prev)}
            disabled={!previewEnabled}
            className={`${
              previewEnabled
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white px-4 py-2 rounded`}
          >
            {showPreview ? "Back to Edit" : "Preview"}
          </button>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              navigate("/");
            }}
            className="text-red-500 underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-500 underline"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-500 underline"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}
