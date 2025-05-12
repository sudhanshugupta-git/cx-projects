import React, { useState } from 'react';
import './App.css';
import Topics from './Topics';
import ChatWindow from './ChatWindow';
// import Questions from './Questions';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleSelectTopic = async (selectedTopics) => {
    if (selectedTopics.length === 0) {
      setQuestions([]);
      return;
    }

    setLoading(true);
    setSelectedTopics(selectedTopics);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      API_KEY;

    const prompt = `Here are some topics: '${selectedTopics.join(", ")}'. Generate 3 relevant and important questions based on these topics. Keep Diffculty level between easy to medium. Make sure the answer is not too long.`;

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
          generationConfig :{
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                },
              }
            }
          }
          
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      // console.log("API Response:", data);
      const rawResponse = data.candidates[0].content.parts[0].text;
      // console.log("Raw API Response:", rawResponse); 

      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error("Error parsing cleaned JSON:", parseError);
        throw new Error("Invalid JSON format in cleaned API response");
      }
      setQuestions(parsedQuestions);
      setShowChat(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="container">
      <h1>PrepQuest Copilot</h1>
      <Topics onSelectTopic={handleSelectTopic} />
      {loading ? (
        <div>
          <p className="loading-animation">Starting...</p>
        </div>
      ) : (
        // <div className="questions-container">
        //   <Questions questions={questions} />
        //   {showChat && <ChatWindow topic={selectedTopics} questions={questions} onClose={handleCloseChat} />}
        // </div>
        showChat && <ChatWindow topic={selectedTopics} questions={questions} onClose={handleCloseChat} />
      )}
    </div>
  );
};

export default App;
