// import React from 'react';

// export default function FormPreview({ formTitle, formDescription, questions }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-200">
//       <h2 className="text-xl font-semibold text-green-700 mb-3">📋 Live Preview</h2>
//       <h3 className="text-lg font-bold mb-1">{formTitle || 'Untitled Form'}</h3>
//       <p className="mb-4 text-gray-600">{formDescription}</p>

//       {questions.map((q, i) => (
//         <div key={i} className="mb-4">
//           <p className="font-medium text-gray-700">{q.question}</p>
//           {q.type === 'short_answer' ? (
//             <input
//               type="text"
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
//             />
//           ) : (
//             q.options.map((opt, j) => (
//               <label key={j} className="block mt-1 text-gray-600">
//                 <input type="checkbox" className="mr-2" />
//                 {opt}
//               </label>
//             ))
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';
import ResponseSuccessPopup from './ResponseSuccessPopup';


export default function FormPreview({ formTitle, formDescription, questions, formId }) {
  const [responses, setResponses] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    console.log('🖼️ FormPreview received formId:', formId);
  }, [formId]);

  const handleInputChange = (question, value) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  const handleCheckboxChange = (question, value) => {
    setResponses((prev) => {
      const current = prev[question] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [question]: updated };
    });
  };

  const handleSubmit = async () => {
    try {
      for (const question of Object.keys(responses)) {
        const answer = Array.isArray(responses[question])
          ? responses[question].join(', ')
          : responses[question];

        await fetch(`http://localhost:3000/api/form/response/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, answer }),
        });
      }

      setShowSuccess(true);
      setSubmittedData(responses);
      setResponses({});
    } catch (error) {
      console.error('❌ Error submitting response:', error);
      alert('Something went wrong while submitting the response.');
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-700 mb-3">📋 Live Preview</h2>
        <h3 className="text-lg font-bold mb-1">{formTitle || 'Untitled Form'}</h3>
        <p className="mb-4 text-gray-600">{formDescription}</p>

        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-700">{q.question}</p>
            {q.type === 'short_answer' ? (
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
                value={responses[q.question] || ''}
                onChange={(e) => handleInputChange(q.question, e.target.value)}
              />
            ) : (
              q.options.map((opt, j) => (
                <label key={j} className="block mt-1 text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={responses[q.question]?.includes(opt) || false}
                    onChange={() => handleCheckboxChange(q.question, opt)}
                  />
                  {opt}
                </label>
              ))
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>

      {showSuccess && (
        <ResponseSuccessPopup
          response={submittedData}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
