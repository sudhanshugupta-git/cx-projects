import React, { useState } from 'react';
import Topics from './Topics';
import Questions from './Questions';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectTopic = async (selectedTopics) => {
    if (selectedTopics.length === 0) {
      setQuestions([]);
      return;
    }

    setLoading(true);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      API_KEY;

    const prompt = `Here are some topics: '${selectedTopics.join(", ")}'. Generate 10 relevant and important questions based on these topics. Return the questions in a structured JSON format: [{question: \"Question 1\"}, {question: \"Question 2\"}, ...]`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      const rawResponse = data.candidates[0].content.parts[0].text;
      // console.log("Raw API Response:", rawResponse); 

      // Sanitize the raw response to remove invalid characters like backticks
      const sanitizedResponse = rawResponse.replace(/`/g, '');
      // console.log("Sanitized API Response:", sanitizedResponse); 

      // Remove invalid prefixes or suffixes like 'json' from the response
      const cleanedResponse = sanitizedResponse.replace(/^json\s*/, '').trim();
      // console.log("Cleaned API Response:", cleanedResponse); 

      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error("Error parsing cleaned JSON:", parseError);
        throw new Error("Invalid JSON format in cleaned API response");
      }
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>PrepQuest Copilot</h1>
      <Topics onSelectTopic={handleSelectTopic} />
      {loading || questions.length > 0 ? (
        loading ? (
          <div>
            <p className="loading-animation">Loading Questions...</p>
          </div>
        ) : (
          <Questions questions={questions} />
        )
      ) : null}
    </div>
  );
};

export default App;
