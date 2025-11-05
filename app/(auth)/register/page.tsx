"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "", // ✅ fallback to empty string
  } as HeadersInit, // ✅ explicitly cast
  body: JSON.stringify(formData),
  cache: "no-store" 
});

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Signup successful! You can now login.");
      router.push("/login");
    } else {
      alert(data.message || "Something went wrong!");
    }
  };

  return (
    <div className="  overflow-y-hidden flex  justify-center  text-white ">
      <div className="bg-green/10 backdrop-blur-lg  border border-white/20 p-8  rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <img src="/favicon.ico" alt="DevEvent Logo" className="w-10 rounded-full h-10 mr-2" />
          <h1 className="text-2xl font-bold">DevEvent</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-gray-700 w-full"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-700 w-full"></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/create-event" })}
          className="flex items-center justify-center w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
