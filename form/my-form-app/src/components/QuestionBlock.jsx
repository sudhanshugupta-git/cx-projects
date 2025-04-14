import React from 'react';
import OptionInput from './OptionInput';

export default function QuestionBlock({ index, question, questions, setQuestions }) {
  const handleQuestionChange = (field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === 'type' && value === 'short_answer') updated[index].options = [''];
    setQuestions(updated);
  };

  const handleOptionChange = (optIndex, value) => {
    const updated = [...questions];
    updated[index].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleAddOption = () => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const handleDeleteQuestion = (indexToDelete) => {
    const updatedQuestions = questions.filter((_, index) => index !== indexToDelete);  // slice function will not meet our requirement
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-white p-4 my-3 rounded-lg shadow-md border border-purple-200">

      <div className="flex justify-between items-center mb-4">
        <label htmlFor={`question-${index}`} className="text-gray-600 font-medium">
          Q{index + 1}❓
        </label>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            handleDeleteQuestion(index);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:opacity-90"
        >
          Delete
        </button>
      </div>

      <input
        type="text"
        placeholder={`Enter Question ${index + 1}`}
        value={question.question}
        onChange={(e) => handleQuestionChange('question', e.target.value)}
        className="w-full mb-2 p-2 rounded-md border border-indigo-200 focus:ring-indigo-300"
      />

      <select
        value={question.type}
        onChange={(e) => handleQuestionChange('type', e.target.value)}
        className="mb-3 p-2 rounded-md border border-purple-300"
      >
        <option value="short_answer">✏️ Short Answer</option>
        <option value="checkbox">☑️ Checkboxes</option>
      </select>

      {question.type === 'checkbox' && (
        <div>
          {question.options.map((opt, j) => (
            <OptionInput
              key={j}
              index={j}
              value={opt}
              onChange={(val) => handleOptionChange(j, val)}
            />
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddOption();
            }}
            className="mt-2 bg-pink-400 text-white px-2 py-1 rounded-md hover:bg-pink-500"
          >
            ➕ Add Option
          </button>
        </div>
      )}
    </div>
  );
}
