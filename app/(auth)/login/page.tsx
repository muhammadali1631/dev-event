"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/create-event",
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/create-event");
    }
  };

  return (
    <div className="  overflow-y-hidden flex  justify-center  text-white ">
      <div className="bg-green/10 backdrop-blur-lg  border border-white/20 p-8  rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <img src="/favicon.ico" alt="DevEvent Logo" className="w-10 rounded-full h-10 mr-2" />
          <h1 className="text-2xl font-bold">DevEvent</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="Email" className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded-lg bg-[#1e293b] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Password" className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded-lg bg-[#1e293b] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
          >
            {loading ? "Signing in..." : "Login"}
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
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
