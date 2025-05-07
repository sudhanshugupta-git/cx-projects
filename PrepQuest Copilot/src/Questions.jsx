import React, { useEffect, useState } from 'react';

const Questions = ({ questions }) => {
  const [visibleQuestions, setVisibleQuestions] = useState([]);

  useEffect(() => {
    let timeoutIds = [];
    questions.forEach((question, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleQuestions((prev) => [...prev, question]);
      }, index * 100); 
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [questions]);

  return (
    <ul className="questions-container">
      <h2>Questions</h2>
      {visibleQuestions.map((question, index) => (
        <li key={index} className="question-item">
          {question.question}
        </li>
      ))}
    </ul>
  );
};

export default Questions;