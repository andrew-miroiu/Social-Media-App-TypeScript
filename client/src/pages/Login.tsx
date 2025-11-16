import React, { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Login( {setLogin} : {setLogin: React.Dispatch<React.SetStateAction<boolean>>} ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin // după login revine aici
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
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin} className="auth-form">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="auth-input"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="auth-input"
          required 
        />
        <button type="submit" className="auth-button" >
          Log in
        </button>
      </form>

      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>

      <button onClick={() => setLogin(false)}>
        <p>Don't have an account? Sign up here.</p>
      </button>
    </div>
  )
}
