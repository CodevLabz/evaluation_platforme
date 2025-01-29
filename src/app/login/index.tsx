"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "src/context/authContext";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img src="https://forumtunisieneducation.org/wp-content/uploads/2023/03/ftte.png" alt="Organization Logo" className="mx-auto h-20 w-20 object-contain" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full rounded-md bg-[#1a365d] py-2 px-4 text-white hover:bg-[#2a4a7f] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign In
          </button>
        </form>
      </div>
    </main>;
};