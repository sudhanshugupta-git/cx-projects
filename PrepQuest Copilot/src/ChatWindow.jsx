import { useEffect, useRef, useState } from "react";
import "./ChatWindow.css";

export default function InterviewChat({ topic, questions, onClose }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const botName = "Eva";

  async function generateAiResponse(conversationHistory = []) {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const model = "gemini-2.0-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

      const newMessages = conversationHistory.reduce((acc, message) => {
        return (
          acc +
          `${message.sender === "bot" ? "Eva" : "Candidate"}: ${message.text}\n`
        );
      }, "");

      const initialPrompt = `
                You are an interview bot, name: ${botName}   
    
                These are the interview questions you need to ask the candidate  
                
                ${questions.map((q, i) => `${i + 1}. ${q.question}`).join("\n")}

                Chat with the user like a proper interviewer. At first, greet the user. After that send another text to ask the first question.
                After each answer, ask the user if they want to add anything else to the answer, If the user says "no", then move to the next question.
                Don't ask the next question directly, when you are asking "Do you want to add anything else to your answer?"
                If the user says "yes", then wait for the user to add more information and then ask again if they want to add anything else.
                If the user says "no", then move to the next question.
                Do not overexplain things, always move forward with the interview,
                
                here is the conversation history:
                ${newMessages}

                Keep the text short and concise. Keep it under 100 words.
            `.trim();

      const contents = [
        { role: "user", parts: [{ text: initialPrompt }] },
      ];

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                text: { type: "STRING" },
                is_end: { type: "BOOLEAN" },
              },
            },
          },
        }),
      });

      const data = await response.json();
      let content = data.candidates[0]?.content?.parts[0]?.text;
      console.log("Raw API Response:", content);
      if (content.includes("```json")) {
        content = content.replace(/```json\n?|\n?```/g, "");
      }
      const result = JSON.parse(content);

      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);

      return {
        sender: "bot",
        text: "Sorry, I couldn't process your request. Please try again later.",
      };
    }
  }

  const startInterview = async () => {
    const response = await generateAiResponse([]);

    setMessages([{ sender: "bot", text: response.text }]);
  };

  const handleUserInput = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!userInput.trim()) return;

      const userMessage = { sender: "user", text: userInput };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);

      setUserInput("");

      const botResponse = await generateAiResponse(updatedMessages);

      setMessages([
        ...updatedMessages,
        { sender: "bot", text: botResponse.text },
      ]);
    }
  };

  // useEffects should be defined at the end of the component
  useEffect(() => {
    inputRef.current?.focus();

    startInterview();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {botName} - Your Interview Bot
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "bot" ? "bot-message" : "user-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your answer here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleUserInput}
        />
        <button className="send-button" onClick={handleUserInput}>
          Send
        </button>
      </div>
    </div>
  );
}
