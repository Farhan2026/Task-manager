"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      alert("Account created successfully!");
      router.push("/login"); // Signup ke baad seedha login par
    } else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select 
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}