import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ResponsesPage() {
  const { id } = useParams();
  const [groupedResponses, setGroupedResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/form/response/${id}`);
        setGroupedResponses(res.data.groupedResponses); 
      } catch (error) {
        console.error('Failed to fetch responses:', error);
      }
    };
    fetchResponses();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Responses</h2>
      {groupedResponses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        groupedResponses.map((group, idx) => (
          <div key={idx} className="border p-4 mb-4 rounded shadow-sm bg-white">
            <h3 className="text-md font-semibold mb-2">
              Submission #{idx + 1} – {new Date(group.timestamp).toLocaleString()}
            </h3>
            <ul className="list-disc list-inside">
              {group.responses.map((resp, i) => (
                <li key={i}>
                  <strong>{resp.question}</strong>: { resp.answer}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
