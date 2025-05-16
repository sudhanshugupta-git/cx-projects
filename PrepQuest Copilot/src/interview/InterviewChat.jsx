import { useEffect, useRef, useState } from "react";
import "./InterviewChat.css";
import sendIcon from "../assets/send.png";
import micIcon from "../assets/mic.png";
import FeedbackCard from "../feedback/FeedbackCard";

export default function InterviewChat({
  topic,
  questions,
  interviewer,
  onClose,
}) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const MODEL = "gemini-2.0-flash";
  const botName = interviewer.name;

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
        You are an interview bot named ${interviewer.name}.
        Personality: ${interviewer.description}
        You are interviewing a candidate for the following position: ${topic} 

        These are the questions you need to ask:
        ${questions.map((q, i) => `${i + 1}. ${q.question}`).join("\n")}

        Instructions:
        - Greet the candidate first.
        - Ask one question at a time.
        - You are an interviewer and hence your tone should be polite and professional and Your are not allowed to give answers directly.
        - After each answer, If you feel that something important the candicate has missed which can impact their performance then ask if he/she wants to add something else.
        - If "yes", wait for more input; if "no", proceed to the next.
        - You have to analyze every response of the candidate and respond accordingly.
        - You will not make is_end true till the end of the interview.
        - Be concise (under 50 words).

        Conversation so far:
        ${historyText}
      `.trim();

    const content = await postToGemini(
      [{ role: "user", parts: [{ text: prompt }] }],
      true
    );

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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse.text },
      ]);
    }
  };

  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {botName} - Your Interview Bot
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.sender === "bot" ? "bot-message" : "user-message"
            }`}
          >
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
        <button
          className="send-button"
          onClick={userInput.trim() ? handleUserInput : toggleRecording}
        >
          {userInput.trim() ? (
            <img src={sendIcon} alt="Send" className="send-icon" />
          ) : (
            <img
              src={micIcon}
              alt="Mic"
              className={`send-icon ${isRecording ? "recording" : ""}`}
            />
          )}
        </button>
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
