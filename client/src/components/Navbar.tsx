import React from "react";

export default function Navbar({onPageChange}: {onPageChange: (page: string) => void}) {

    function changePage(page: string) {
    onPageChange(page)
  }

  return (
    <div className="navbar">
        <div className="navLeftSide">
            <h1>OnlyFriends</h1>
      </div>

        <div className="navRightSide">
            <button onClick={() => changePage("feed")}>Feed</button>
            <button onClick={() => changePage("messages")}>Messages</button>
            <button onClick={() => changePage("search")}>Search</button>
            <button onClick={() => changePage("profile")}>Profile</button>
            <button onClick={() => changePage("logout")}>Logout</button>
        </div>
    </div>
  )
}