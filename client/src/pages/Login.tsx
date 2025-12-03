import React, { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Login( {setLogin} : {setLogin: React.Dispatch<React.SetStateAction<boolean>>} ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://onlyfriends69.netlify.app/" // după login revine aici
      }
    })

    if (error) {
      console.error("Google login error:", error)
    }

    
      console.log("Google login data:", data);
  }

  async function handleLogin(e : React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Email login error:", error)
    }
    else {
        window.location.reload();
        console.log("Google login data:", data);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-400 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Login</h1>
          <p className="text-sm text-slate-500">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 text-white py-2.5 text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-colors"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 text-sm sm:text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {/* aici poți pune icon Google mai târziu */}
          <span>Sign in with Google</span>
        </button>

        <button
          onClick={() => setLogin(false)}
          className="w-full text-center text-sm text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Don't have an account?{" "}
          <span className="font-semibold">Sign up here.</span>
        </button>
      </div>
    </div>
  )
}
