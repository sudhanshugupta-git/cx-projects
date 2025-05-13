import React, { useEffect, useState } from "react";
import "./FeedbackCard.css";

export default function FeedbackCard({ messages, apiKey, model, onClose }) {
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("Generating feedback...");

  useEffect(() => {
    const fetchFeedback = async () => {
      const historyText = messages
        .map(
          (msg) => `${msg.sender === "bot" ? "Eva" : "Candidate"}: ${msg.text}`
        )
        .join("\n");

      const prompt = `
        Based on the following interview, respond with:

        Score: <number out of 10>
        Feedback: <5 to 7 word summary>

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

        const extractedScore = parseInt(
          content.match(/Score:\s*(\d+)/)?.[1] || "0",
          10
        );
        const extractedFeedback =
          content.match(/Feedback(?: Summary)?:\s*([\s\S]*)/i)?.[1]?.trim() ||
          "No feedback found.";

        setScore(extractedScore);
        setFeedback(extractedFeedback);
      } catch (error) {
        console.error("Error generating feedback:", error);
        setScore(0);
        setFeedback("Unable to generate feedback.");
      }
    };

    fetchFeedback();
  }, [messages, apiKey, model]);

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
