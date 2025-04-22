import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //   const handleLogin = async () => {
    //     try {
    //       const res = await fetch("http://localhost:3000/api/user/signin", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, password }),
    //       });

    //       console.log("Raw response:", res); 

    //       if (res.ok) {
    //         setIsLoggedIn(true);
    //         navigate("/");
    //       } else {
    //         const data = await res.json();
    //         alert(data.message || "Login failed");
    //       }
    //     } catch (err) {
    //       alert("Something went wrong");
    //     }
    //   };

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/user/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                navigate("/");
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
