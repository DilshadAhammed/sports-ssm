import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Token found, redirecting to admin...");
      navigate('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password }); // Debug log
    try {
      console.log("Making API call...");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      console.log("API call successful:", response.data);
      const { token } = response.data;
      console.log("Token stored:", token);

      // Store token in localStorage
      await localStorage.setItem("token", token);

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow-md rounded bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
