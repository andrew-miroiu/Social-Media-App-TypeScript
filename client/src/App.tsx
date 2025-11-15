import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
import Login from "./pages/Login"
//import Feed from "./pages/Feed"

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <Login />

  //return <Feed />
  return (
    <div>
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
