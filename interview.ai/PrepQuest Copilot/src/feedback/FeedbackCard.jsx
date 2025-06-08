import React, { useEffect, useState, useCallback } from "react";
import "./FeedbackCard.css";
import { useAuth } from "../auth/AuthContext";

const BASE_URL = "http://localhost:3001";

export default function FeedbackCard({
  messages,
  apiKey,
  model,
  botName,
  sessionId,
  startTime,
  onClose,
}) {
  const [score, setScore] = useState(null);
  const [messageId, setMessageId] = useState();
  const [resultId, setResultId] = useState();
  const [feedback, setFeedback] = useState("Generating feedback...");
  const { user } = useAuth();
  const [endTime, setEndTime] = useState(null);

  const fetchFeedback = useCallback(async () => {
    const historyText = messages
      .map(
        (msg) => `${msg.sender === "bot" ? botName : "Candidate"}: ${msg.text}`
      )
      .join("\n");

    const prompt = `
      Based on the following interview, respond with:

      Score: <number out of 10>
      Feedback: Generate a short and friendly feedback message. Compliment the candidate's best answer, suggest an area for improvement, and end on a positive note in short. Feedback should exceed more than 50 words.

      Conversation:
      ${historyText}
    `.trim();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const extractedScore = parseInt(content.match(/Score:\s*(\d+)/)?.[1] || "0", 10);
      const extractedFeedback =
        content.match(/Feedback(?: Summary)?:\s*([\s\S]*)/i)?.[1]?.trim() || "No feedback found.";

      setScore(extractedScore);
      setFeedback(extractedFeedback);
      setEndTime(new Date());
    } catch (error) {
      console.error("Error generating feedback:", error);
      setScore(0);
      setFeedback("Unable to generate feedback.");
      setEndTime(new Date());
    }
  }, [messages, apiKey, model, botName]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);


function getTimeInSeconds(timeStr) {
    console.log("Time String:", timeStr);
        if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
        console.error("Invalid time string:", timeStr);
        return 0; // or handle differently based on your use case
    }
    return timeStr.split(':').reduce((acc, val) => acc * 60 + +val, 0);
}


function convertSecToTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function timeGap(start, end) {
    const diff = Math.abs(getTimeInSeconds(start) - getTimeInSeconds(end));
    return convertSecToTime(diff);
}


  useEffect(() => {
  if (user && sessionId && score !== null && endTime && feedback !== "Generating feedback...") {
    (async () => {
      try {
        const now = new Date();
        const formattedEndTime = now.toLocaleTimeString("en-GB", { hour12: false });
        setEndTime(formattedEndTime);
        // console.log(typeof formattedEndTime + " " + formattedEndTime);

        await fetch(`${BASE_URL}/api/v1/session/${sessionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            end_time: formattedEndTime,
            status: "completed",
          }),
        });

        const conversation = messages.map((msg) =>
          `${msg.sender === "bot" ? botName : "Candidate"}: ${msg.text}`
        ).join("\n");

        // Fetch message ID
        const messageRes = await fetch(`${BASE_URL}/api/v1/conversation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            user_id: user.user_id || user.id,
            message_content: conversation,
          }),
        });

        const messageData = await messageRes.json();
        if (!messageData?.data?.message_id) throw new Error("Failed to fetch message ID");
        setMessageId(messageData.data.message_id);

        // Fetch result ID immediately after message ID is available
        const duration = timeGap(startTime, formattedEndTime);
        console.log("Duration in seconds:", duration);

        const resultRes = await fetch(`${BASE_URL}/api/v1/result`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.user_id || user.id,
            message_id: messageData.data.message_id, 
            session_id: sessionId,
            score,
            completion_time: duration,
          }),
        });

        const resultData = await resultRes.json();
        if (!resultData?.data?.result_id) throw new Error("Failed to fetch result ID");
        setResultId(resultData.data.result_id);

        // Send feedback immediately after result ID is available
        await fetch(`${BASE_URL}/api/v1/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.user_id || user.id,
            result_id: resultData.data.result_id, 
            comments: feedback,
          }),
        });

      } catch (error) {
        console.error("Error saving interview data:", error);
      }
    })();
  }
}, [feedback]);


  const getEmojiForScore = (score) => {
    if (score > 9) return "🌟🏆💯";
    if (score > 7) return "🎉👏";
    if (score >= 5) return "👍";
    return "🤔";
  };

  return (
    <div className="feedback-card-overlay">
      <div className="feedback-card">
        <h2>Interview Feedback</h2>
        {score === null ? (
          <p>Loading feedback...</p>
        ) : (
          <>
            <p>
              <strong>Score:</strong> {score}/10{" "}
              <span role="img" aria-label="score feedback">
                {getEmojiForScore(score)}
              </span>
            </p>
            <p>
              <strong>Feedback:</strong> {feedback}
            </p>
          </>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
