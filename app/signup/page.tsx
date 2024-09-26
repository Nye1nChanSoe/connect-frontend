"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to be sent
    const userData = { username: name, email, password };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if the response is successful
      if (response.ok) {
        // Redirect to the login page after successful signup
        router.push("/login");
      } else {
        // Handle errors, e.g., show a message to the user
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error, please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-white">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full py-2 text-lg"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full py-2 text-lg"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full py-2 text-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition duration-300 w-full text-lg"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
