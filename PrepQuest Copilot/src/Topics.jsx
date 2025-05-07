import React, { useState } from 'react';

const Topics = ({ onSelectTopic }) => {
  const topics = [
    'Java', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'React', 'SQL', 'MongoDB', 'System Design'
  ];

  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prevSelected) => {
      const updatedSelection = prevSelected.includes(topic)
        ? prevSelected.filter((t) => t !== topic)
        : [...prevSelected, topic];
      // console.log("Selected Topics:", updatedSelection); 
      return updatedSelection;
    });
  };

  const handleGenerate = () => {
    // console.log("Generating questions for topics:", selectedTopics);
    onSelectTopic(selectedTopics);
  };

  return (
    <div id="topics-container">
      <h2>Select Topics:</h2>
      <div className="topics">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-btn ${selectedTopics.includes(topic) ? 'selected' : ''}`}
            onClick={() => toggleTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <button id="generate-btn" onClick={handleGenerate}>
        Generate Questions
      </button>
    </div>
  );
};

export default Topics;