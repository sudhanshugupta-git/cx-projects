import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ topic, questions, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hello! Welcome to the interview on the topic: ${topic}.` },
    { sender: 'bot', text: 'Are you ready to start? (Type "yes" to begin)' },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loading]);

  const handleUserInput = async (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && userInput.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      setUserResponses((prev) => [...prev, userInput]);
      setUserInput('');

      if (!isInterviewStarted && userInput.toLowerCase() === 'yes') {
        setIsInterviewStarted(true);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: `Great! Let's start with the first question.` },
          { sender: 'bot', text: questions[0].question },
        ]);
      } else if (isInterviewStarted) {
        setLoading(true);
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
          const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+API_KEY,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: userInput }] }] }),
            }
          );

          const data = await response.json();
          const modelReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: modelReply },
          ]);

          if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setMessages((prev) => [
              ...prev,
              { sender: 'bot', text: questions[currentQuestionIndex + 1].question },
            ]);
          } else {
            const resultResponse = await fetch(
              'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+API_KEY,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: `Evaluate the following responses: ${userResponses.join(' ')} and provide a result in terms of pass, fail, good, outstanding, excellent, or worst.` }] }] }),
              }
            );

            const resultData = await resultResponse.json();
            const finalResult = resultData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to evaluate';

            setMessages((prev) => [
              ...prev,
              { sender: 'bot', text: 'Thank you for completing the interview! We will now evaluate your responses.' },
              { sender: 'bot', text: `Your result: ${finalResult}. Keep up the good work!` },
            ]);
            setIsInterviewStarted(false);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        PrepQuest Bot
        <button className="close-button" onClick={onClose}>❌</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
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
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleUserInput}
          disabled={loading}
          ref={inputRef}
        />
        <button className="send-button" onClick={handleUserInput} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;