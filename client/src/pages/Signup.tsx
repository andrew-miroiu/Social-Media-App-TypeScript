import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Signup({ setLogin }: { setLogin: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [full_name, setFullName] = useState("")

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name,
          username: full_name
        }
      }
    })

    if (error) {
      console.error("Signup error:", error)
    }

    console.log("Signup response:", data)
    setLogin(true)
  }

  async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    })

    if (error) {
      console.error("Google login error:", error)
    }

    console.log("Google login data:", data)
  }

  return (
    <div className="signup-container min-h-screen flex items-center justify-center bg-slate-400 px-4">

      <div className="signup-card w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">

        {/* Title */}
        <div className="signup-header space-y-2 text-center">
          <h1 className="signup-title text-2xl sm: text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="signup-subtitle text-sm text-slate-500">Join us and start connecting!</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="signup-form space-y-4">

          {/* Username */}
          <div className="signup-field space-y-2">
            <label className="signup-label block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              placeholder="Your username"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="signup-input w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              required
            />
          </div>

          {/* Email */}
          <div className="signup-field space-y-2">
            <label className="signup-label block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              required
            />
          </div>

          {/* Password */}
          <div className="signup-field space-y-2">
            <label className="signup-label block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              required
            />
          </div>

          <button type="submit" className="signup-button w-full rounded-lg bg-indigo-600 text-white py-2.5 text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-colors">
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="signup-divider flex items-center gap-3">
          <div className="signup-line h-px flex-1 bg-slate-200"/>
          <span className="signup-or text-xs text-slate-400">OR</span>
          <div className="signup-line h-px flex-1 bg-slate-200" />
        </div>

        {/* Google Login */}
        <button onClick={handleGoogleLogin} className="signup-google-button w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 text-sm sm:text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          Sign up with Google
        </button>

        {/* Already have an account */}
        <button onClick={() => setLogin(true)} className="signup-switch w-full text-center text-sm text-slate-600 hover:text-indigo-600 transition-colors">
          Already have an account? <span className="signup-switch-link font-semibold">Log in here.</span>
        </button>

      </div>
    </div>
  )
}
