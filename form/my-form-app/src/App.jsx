import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}  
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
