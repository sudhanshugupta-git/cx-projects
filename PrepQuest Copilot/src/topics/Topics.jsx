import React, { useState } from "react";
import "./Topics.css";

const Topics = ({ onSelectTopic }) => {
  const topics = [
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "Node.js",
    "Express",
    "React",
    "SQL",
    "MongoDB",
    "System Design",
  ];

  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prevSelected) => {
      const updatedSelection = prevSelected.includes(topic)
        ? prevSelected.filter((t) => t !== topic)
        : [...prevSelected, topic];
      return updatedSelection;
    });
  };

  const handleGenerate = () => {
    onSelectTopic(selectedTopics);
  };

  return (
    <div id="topics-container">
      <h2>Select Topic(s):</h2>
      <div className="topics">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-btn ${
              selectedTopics.includes(topic) ? "selected" : ""
            }`}
            onClick={() => toggleTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <button id="generate-btn" onClick={handleGenerate}>
        Start Interview
      </button>
    </div>
  );
};

export default Topics;
