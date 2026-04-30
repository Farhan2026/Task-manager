"use client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) alert("User created! Now you can login.");
    else alert(data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <input type="email" placeholder="Email" className="border p-2 w-full" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full" onChange={(e) => setPassword(e.target.value)} />
        <select className="border p-2 w-full" onChange={(e) => setRole(e.target.value)}>
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Sign Up</button>
      </form>
    </div>
  );
}