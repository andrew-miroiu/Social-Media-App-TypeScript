import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Signup( {setLogin} : {setLogin: React.Dispatch<React.SetStateAction<boolean>>} ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");

      async function handleSignup(e : React.FormEvent) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: full_name, 
              username: full_name 
            }
          }
        });

        if (error) {
        console.error("Email login error:", error)
        } 
        console.log("Google login data:", data);
        setLogin(true);
     }

     async function handleGoogleLogin() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin
        }
        })

        if (error) {
        console.error("Google login error:", error)
        }

        console.log("Google login data:", data);
    }

      return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSignup} className="auth-form">
        <input
            type="text"
            placeholder="Username"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="auth-input"
            required
        />
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
          Sign in
        </button>
      </form>

      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>

        <button onClick={() => setLogin(true)}>
            <p>Already have an account? Log in here.</p>
        </button>
    </div>
  )

}