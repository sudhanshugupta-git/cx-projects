import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FormsPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:3000/api/form/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const userForms = res.data.filter(form => form.user_id === userId);
        setForms(res.data);
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };
    fetchForms();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto mt-18">
      <h2 className="text-xl font-bold mb-4">All Forms</h2>
      {forms.map(form => (
        <div
          key={form.id}
          className="border rounded p-4 mb-4 shadow hover:shadow-lg transition"
        >
          <div onClick={() => navigate(`/form/${form.id}`)} className="cursor-pointer">
            <h3 className="text-lg font-bold">{form.name}</h3>
            <p className="text-gray-600">{form.description}</p>
            <p className="text-gray-400">{`Created By User ${form.user_id}`}</p>
          </div>
          <button
            onClick={() => navigate(`/form/${form.id}/responses`)}
            className="mt-2 text-blue-500 underline cursor-pointer"
          >
            View Responses
          </button>
        </div>
      ))}
    </div>
  );
}
