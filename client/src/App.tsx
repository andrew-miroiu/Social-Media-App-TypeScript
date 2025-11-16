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

//import Feed from "./pages/Feed"

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(true)
  const [page, setPage] = useState("feed")

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return (
      login ? <Login setLogin = {setLogin}/> : <Signup setLogin = {setLogin}/>

)

  //return <Feed />
  return (
    <div>
      <Navbar onPageChange={setPage}/>

      {page === "feed" && <Feed />}
      {page === "messages" && <Messages />}
      {page === "search" && <Search />}
      {page === "profile" && <Profile />}

      <h1>Welcome, {user.email}</h1>
      <button onClick={async () => {
        await supabase.auth.signOut()
        setUser(null)
      }}>
        Log out
      </button>
    </div>
  )
}

export default App
