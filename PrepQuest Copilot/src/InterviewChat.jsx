import { useEffect, useRef, useState } from "react";
import "./InterviewChat.css";
import FeedbackCard from "./FeedbackCard";

export default function InterviewChat({ topic, questions, onClose }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const MODEL = "gemini-2.0-flash";
  const botName = "Eva";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    startInterview();
  }, []);

  const buildConversationText = (conversation) =>
    conversation
      .map(
        (msg) => `${msg.sender === "bot" ? botName : "Candidate"}: ${msg.text}`
      )
      .join("\n");

  const postToGemini = async (contents, withConfig = false) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const body = {
      contents,
    };

    if (withConfig) {
      body.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            text: { type: "STRING" },
            is_end: { type: "BOOLEAN" },
          },
        },
      };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
      console.error("Gemini API error:", error);
      return "";
    }
  };

  const generateAiResponse = async (conversationHistory = []) => {
    const historyText = buildConversationText(conversationHistory);

    const prompt = `
      You are an interview bot named ${botName}.
      Interview Topic: ${topic}

      Interview Questions:
      ${questions.map((q, i) => `${i + 1}. ${q.question}`).join("\n")}

      Instructions:
      - Greet the candidate first.
      - Ask one question at a time.
      - You are an interviewer and hence not allowed to give answers.
      - After each answer, If you feel that something is missing then ask "Do you want to add anything else?"
      - If "yes", wait for more input; if "no", proceed to the next.
      - Be concise (under 50 words).
      
      Conversation so far:
      ${historyText}
    `.trim();

    const content = await postToGemini([{ role: "user", parts: [{ text: prompt }] }], true);

    try {
      const cleanContent = content.replace(/```json\n?|```/g, "");
      const parsed = JSON.parse(cleanContent);

      if (parsed.is_end) setShowFeedback(true);
      return parsed;
    } catch {
      return { text: "Sorry, I couldn't process your request." };
    }
  };

  const startInterview = async () => {
    const botStart = await generateAiResponse([]);
    setMessages([{ sender: "bot", text: botStart.text }]);
  };

  const handleUserInput = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && userInput.trim()) {
      const userMessage = { sender: "user", text: userInput.trim() };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setUserInput("");

      const botResponse = await generateAiResponse(updatedMessages);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse.text }]);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {botName} - Your Interview Bot
        <button className="close-button" onClick={onClose}>❌</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="Type your answer here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleUserInput}
        />
        <button className="send-button" onClick={handleUserInput}>Send</button>
      </div>

      {showFeedback && (
        <FeedbackCard
          messages={messages}
          apiKey={API_KEY}
          model={MODEL}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}
