import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Feed from "./pages/Feed"
import Messages from "./pages/Messages"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import type { User } from "@supabase/supabase-js"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Snowflakes from 'magic-snowflakes'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(true)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (window.location.hash.includes("access_token")) {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)

        if (!error) {
          window.history.replaceState({}, "", window.location.pathname)
        }
      }
    }

    const loadUser = async () => {
      await handleOAuthCallback()
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    loadUser()
  }, [])

  // Add snowflakes when user is logged in
  useEffect(() => {
    if (user) {
      const snowflakes = new Snowflakes({
        color: '#82C3D9',
        count: 120,
        minSize: 8,
        maxSize: 18,
        speed: 1,
        wind: true,
        rotation: true,
        zIndex: 9999
      })

      return () => {
        snowflakes.destroy()
      }
    }
  }, [user])

  if (loading) return <p>Loading...</p>
  if (!user) return (
    login ? <Login setLogin={setLogin}/> : <Signup setLogin={setLogin}/>
  )

  function handleLogout() {
    supabase.auth.signOut().then(() => {
      setUser(null)
    })
  }

  return (
    <BrowserRouter>
      <Navbar handleLogout={handleLogout} userId={user.id} />
      <Routes>
        <Route path="/" element={<Feed currentUserId={user.id} />} />
        <Route path="/messages" element={<Messages currentUserId={user.id} />} />
        <Route path="/search" element={<Search currentUserId={user.id} />} />
        <Route path="/profile/:id" element={<Profile key={user.id} currentUser={user.id} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App