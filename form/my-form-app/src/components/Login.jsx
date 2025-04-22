import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setUserId} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/");
        }
      }, [isLoggedIn]);

      
    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/user/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            // console.log(data.user.id);
            setUserId(data.user.id)

            if (res.ok) {
                setIsLoggedIn(true);
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };



    return (
        <div className="p-4 max-w-md mx-auto mt-24 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
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
            <button onClick={handleLogin} className="bg-indigo-500 text-white px-4 py-2 rounded w-full">
                Login
            </button>
        </div>
    );
}
