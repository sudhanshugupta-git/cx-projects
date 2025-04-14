import React, { useEffect, useState } from 'react';
import QuestionBlock from './QuestionBlock';

export default function FormEditor({
  formTitle,
  setFormTitle,
  formDescription,
  setFormDescription,
  questions,
  setQuestions,

  onPublishTrigger,
  setOnPublishTrigger,
  setIsValidForm,
}) {
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const newErrors = [];

    if (!formTitle.trim()) {
      newErrors.push('📛 Form title is required!');
    }

    if (!formDescription.trim()) {
      newErrors.push('🧾 Form description is required!');
    }

    if (questions.length === 0) {
      newErrors.push('📝 Add at least one question to publish the form!');
    }

    questions.forEach((q, idx) => {
      if (!q.question.trim()) {
        newErrors.push(`❓ Question ${idx + 1} must have text!`);
      }

      if (q.type === 'checkbox') {
        if (!q.options.length || q.options.some(opt => !opt.trim())) {
          newErrors.push(`🔘 All checkbox options in Question ${idx + 1} must be filled!`);
        }
      }
    });

    return newErrors;
  };

  useEffect(() => {
    if (onPublishTrigger) {
      const foundErrors = validateForm();

      if (foundErrors.length > 0) {
        setErrors(foundErrors);
        setIsValidForm(false);
      } else {
        setErrors([]);
        setIsValidForm(true);
      }

      setOnPublishTrigger(false);
    }
  }, [onPublishTrigger]);



  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', type: 'short_answer', options: [''] }]);
  };



  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-indigo-200">

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {/* {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))} */}
            <li>{errors[0]}</li>

          </ul>
        </div>
      )}

      <form>
        <label htmlFor="formTitle" className="text-gray-800 font-medium text-xl">📝 Form Title</label>
        <input
          id="formTitle"
          type="text"
          placeholder="Enter Title Here"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label htmlFor="formDescription" className="text-gray-800 font-medium text-xl mb-4">🧾 Form Description</label>
        <textarea
          id="formDescription"
          placeholder="Enter Description Here"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <label htmlFor={`question-${i}`} className="text-gray-600 font-medium">Question {i + 1}</label>
            <QuestionBlock
              id={`question-${i}`}
              index={i}
              question={q}
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>

        ))}

        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddQuestion();
          }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md mb-5 hover:opacity-90"
        >
          ➕ Add Question
        </button>
      </form>


    </div>
  );
}
