import React, { useState } from "react";
import "./InterviewerSelection.css";

const InterviewerSelection = ({ onSelectInterviewer, handleReturn, handleConfirm }) => {
  const [selected, setSelected] = useState(null);

  const interviewers = [
    {
      name: "Eva",
      description: "Friendly and encouraging",
      image: "https://th.bing.com/th/id/OIP.MWc7D5zNWUff_KJaz20U5gAAAA?w=141&h=188&c=7&r=0&o=7&cb=iwp2&dpr=1.5&pid=1.7&rm=3",
    },
    {
      name: "Mike",
      description: "Professional and to the point",
      image: "https://th.bing.com/th/id/OIP._gZvVQj_Qq-g40tpwwRhDwHaHa?w=194&h=194&c=7&r=0&o=7&cb=iwp2&dpr=1.5&pid=1.7&rm=3",
    },
    {
      name: "Bob",
      description: "Casual and humorous",
      image: "https://th.bing.com/th/id/OIP.VZQHLb2Bxx9KDpxJG_sk5AHaEK?w=299&h=180&c=7&r=0&o=7&cb=iwp2&dpr=1.5&pid=1.7&rm=3",
    },
  ];


  const handleCardClick = (interviewer) => {
    setSelected(interviewer.name);
    onSelectInterviewer(interviewer);
  };

  return (
    <div className="interviewer-selection-container">
      <h2>Choose Your Interviewer</h2>
      <div className="interviewer-cards">
        {interviewers.map((interviewer) => (
          <div
            key={interviewer.name}
            className={`interviewer-card ${selected===interviewer.name ? "selected" : ""}`}
            onClick={() => handleCardClick(interviewer)}
          >
            <img
              src={interviewer.image}
              alt={interviewer.name}
              className="interviewer-image"
            />
            <h3>{interviewer.name}</h3>
            <p>{interviewer.description}</p>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button className="cancel-btn" onClick={handleReturn}>Back</button>
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!selected}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default InterviewerSelection;
