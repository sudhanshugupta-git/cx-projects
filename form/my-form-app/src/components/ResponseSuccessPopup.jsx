import React from 'react';

export default function ResponseSuccessPopup({ response, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-green-600 text-xl font-semibold mb-4">✅ Response submitted successfully!</h2>

        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-60">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
