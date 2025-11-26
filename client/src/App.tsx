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
  const [profileUserId, setProfileUserId] = useState<string | null>(null)

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

function handlePageChange(page: string, userId?: string | null) {
  if (page === "profile" && userId) {
    setProfileUserId(userId);
    console.log("if:" + profileUserId);
    }
  setPage(page);
}

  //return <Feed />
  return (
    <div >
      <Navbar onPageChange={handlePageChange} userId={user.id}/>

      {page === "feed" && <Feed onOpenProfile={handlePageChange} currentUserId={user.id}/>}
      {page === "messages" && <Messages currentUserId = {user.id}/>}
      {page === "search" && <Search currentUserId={user.id} onOpenProfile={handlePageChange}/>}
      {page === "profile" && <Profile userId={profileUserId} onOpenProfile={handlePageChange} currentUser={user.id}/> }


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
