import React, { useState } from "react";
import "./App.css";
import Topics from "./topics/Topics";
import InterviewChat from "./interview/InterviewChat";
import InterviewerSelection from "./interview/InterviewerSelection";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState({});
  const [showInterviewerSelection, setShowInterviewerSelection] = useState(false);

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

    const prompt = `Here are some topics: '${selectedTopics.join(
      ", "
    )}'. Generate 3 relevant and important questions based on these topics. Keep Diffculty level between easy to medium. Make sure the answer is not too long.`;

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
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                },
              },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      const rawResponse = data.candidates[0].content.parts[0].text;

      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error("Error parsing cleaned JSON:", parseError);
        throw new Error("Invalid JSON format in cleaned API response");
      }
      setQuestions(parsedQuestions);
      setShowInterviewerSelection(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewerSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
  };

  const handleStartInterview = () => {
    if (selectedInterviewer) {
      setShowInterviewerSelection(false);
      setShowChat(true);
    }
  };

  const handleBackToTopics = () => {
    setShowInterviewerSelection(false);
    setSelectedTopics([]);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="container">
      <h1 className="title">PrepQuest Copilot</h1>
      <h3 className="slogan">
        Your AI-powered assistant to help you ace your next interview!
      </h3>
      {loading ? (
        <div>
          <p className="loading-animation">Starting...</p>
        </div>
      ) : showInterviewerSelection ? (
          <InterviewerSelection
            onSelectInterviewer={handleInterviewerSelect}
            handleConfirm={handleStartInterview}
            handleReturn={handleBackToTopics}
          />
      ) : showChat ? (
        <InterviewChat
          topic={selectedTopics}
          questions={questions}
          interviewer={selectedInterviewer}
          onClose={handleCloseChat}
        />
      ) : (
        <Topics onSelectTopic={handleSelectTopic} />
      )}
    </div>
  );
};

export default App;
