import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name:username, email, password }),
      });

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-24 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUserName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button onClick={handleSignup} className="bg-indigo-500 text-white px-4 py-2 rounded w-full">
        Signup
      </button>
    </div>
  );
}
