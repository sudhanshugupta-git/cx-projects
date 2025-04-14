import React from 'react';

export default function OptionInput({ index, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={`🔘 Option ${index + 1}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full mb-2 p-2 rounded-md border border-pink-300 focus:ring-pink-400"
    />
  );
}
