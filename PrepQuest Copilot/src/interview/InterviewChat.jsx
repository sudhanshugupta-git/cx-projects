import { useEffect, useRef, useState } from "react";
import "./InterviewChat.css";
import end from "../assets/phone-call-end.png";
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
  const [displayedBotText, setDisplayedBotText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utterRef = useRef(null);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const MODEL = "gemini-2.0-flash";
  const botName = interviewer.name;

  // Fade-out state
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    startInterview();
  }, []);

  // When feedback is shown (interview ends), fade out the screen
  useEffect(() => {
    if (showFeedback) {
      setFadeOut(true);
    }
  }, [showFeedback]);

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
        You are interviewing a candidate on the topic(s): ${topic} 

        These are the questions you need to ask:
        ${questions.map((q, i) => `${i + 1}. ${q.question}`).join("\n")}

        Instructions:
        - Greet the candidate first.
        - Ask one question at a time.
        - You are an interviewer and hence your tone should be polite and professional and Your are not allowed to give answers directly.
        - After each answer, If you feel that something important the candicate has missed which he/she might also know and that could impact their performance then ask if he/she wants to add something else.
        - If "yes", wait for more input; if "no", proceed to the next.
        - You have to analyze every response of the candidate and then respond accordingly.
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

  // Typing effect and voice narration for bot message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === "bot") {
      setDisplayedBotText("");
      let idx = 0;
      let text = lastMsg.text;
      let typingInterval;
      // Stop any previous speech
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
      // Typing effect
      typingInterval = setInterval(() => {
        setDisplayedBotText((prev) => {
          const next = text.slice(0, prev.length + 1);
          if (next.length === text.length) {
            clearInterval(typingInterval);
            // Start voice after typing
            speakText(text);
          }
          return next;
        });
      }, 18);
      return () => clearInterval(typingInterval);
    }
    // eslint-disable-next-line
  }, [messages]);

  // Voice narration
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    setIsSpeaking(true);
    const utter = new window.SpeechSynthesisUtterance(text);
    // Set voice based on interviewer
    let desiredVoiceName = null;
    if (interviewer.name === "Bob") {
      desiredVoiceName = "Microsoft Madhur Online (Natural) - Hindi (India)";
    } else if (interviewer.name === "Mike") {
      desiredVoiceName = "Microsoft Prabhat Online (Natural) - English (India)";
    } else if (interviewer.name === "Eva") {
      desiredVoiceName = "Microsoft Neerja Online (Natural) - English (India)";
    }
    const voices = window.speechSynthesis.getVoices();
    if (desiredVoiceName) {
      const foundVoice = voices.find((v) => v.name === desiredVoiceName);
      if (foundVoice) {
        utter.voice = foundVoice;
      }
    }
    utter.rate = 1.25;
    utter.pitch = 1;
    utter.volume = 1;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    utterRef.current = utter;
    synthRef.current.speak(utter);
  };

  return (
    <div
      className={`chat-window bot-center-window${fadeOut ? " fade-out" : ""}`}
    >
      <div className="chat-header">
        <button
          className="close-button"
          onClick={onClose}
          disabled={showFeedback}
        >
          <img src={end} alt="Close" className="close-icon" />
        </button>
      </div>

      <div className="bot-center-message-container">
        {messages.length > 0 &&
          messages[messages.length - 1].sender === "bot" && (
            <div className="bot-center-message">
              {displayedBotText}
              {/* Show voice-indicator only after typing is complete */}
              {displayedBotText === messages[messages.length - 1].text && (
                <span
                  className={`voice-indicator${isSpeaking ? " speaking" : ""}`}
                  role="button"
                  tabIndex={0}
                  title={
                    isSpeaking
                      ? "Stop voice narration"
                      : "Replay voice narration"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (isSpeaking) {
                      synthRef.current.cancel();
                    } else {
                      speakText(messages[messages.length - 1].text);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (isSpeaking) {
                        synthRef.current.cancel();
                      } else {
                        speakText(messages[messages.length - 1].text);
                      }
                    }
                  }}
                >
                  🔊
                </span>
              )}
            </div>
          )}
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
          disabled={showFeedback}
        />
        <button
          className="send-button"
          onClick={userInput.trim() ? handleUserInput : toggleRecording}
          disabled={showFeedback}
        >
          {userInput.trim() ? (
            <i className="uil uil-message send-icon"></i>
          ) : (
            <i
              className={`uil uil-microphone send-icon ${
                isRecording ? "recording" : ""
              }`}
            ></i>
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
