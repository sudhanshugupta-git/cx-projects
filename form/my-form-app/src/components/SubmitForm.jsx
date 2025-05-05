import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ResponseSuccessPopup from './ResponseSuccessPopup';

export default function SubmitForm() {
  const { id } = useParams();
  const [formMeta, setFormMeta] = useState({});
  const [fields, setFields] = useState([]);
  const [response, setResponse] = useState({});

  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      const meta = await axios.get(`http://localhost:3000/api/form/${id}`);
      const inputs = await axios.get(`http://localhost:3000/api/form/input/${id}`);
      setFormMeta(meta.data[0]);
      setFields(inputs.data.inputFields);
    };
    fetchForm();
  }, [id]);

  const handleChange = (question, value) => {
    setResponse(prev => ({ ...prev, [question]: value }));
  };

  const handleCheckboxChange = (question, option) => {
    setResponse(prev => {
      const currentValues = prev[question] || [];
      if (currentValues.includes(option)) {
        return { ...prev, [question]: currentValues.filter(val => val !== option) };
      } else {
        return { ...prev, [question]: [...currentValues, option] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formId = id;
    if (!formId) {
      alert("Form ID missing!");
      return;
    }

    try {
      // Submit each question/answer
      for (const questionText in response) {
        const answer = Array.isArray(response[questionText])
          ? response[questionText].join(', ')
          : response[questionText];

        await axios.post(`http://localhost:3000/api/form/response/${formId}`, {
          question: questionText,
          answer
        });
      }

      setSubmittedData(response);
      setShowPopup(true);
      setResponse({});
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{formMeta.name}</h2>
      <p className="text-gray-600 mb-4">{formMeta.description}</p>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.id} className="mb-4">
            <label className="block font-medium mb-1">{field.question}</label>
            {field.type === 'short_answer' ? (
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={response[field.question] || ""}
                onChange={(e) => handleChange(field.question, e.target.value)}
              />
            ) : field.type === 'checkbox' ? (
              field.options && field.options.length > 0 ? (
                field.options.map(option => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${field.id}-${option}`}
                      onChange={() => handleCheckboxChange(field.question, option)}
                      checked={response[field.question]?.includes(option) || false}
                    />
                    <label htmlFor={`${field.id}-${option}`} className="ml-2">{option}</label>
                  </div>
                ))
              ) : null
            ) : null}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {showPopup && (
        <ResponseSuccessPopup
          response={submittedData}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
