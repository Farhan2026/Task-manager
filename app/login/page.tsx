"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard"); 
      router.refresh();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md space-y-4 w-96">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 w-full rounded" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 w-full rounded" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition">
          Login
        </button>
      </form>
    </div>
  );
}