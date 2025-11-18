import React from "react";

export default function Navbar({ onPageChange, userId }: { onPageChange: (page: string, userId?: string) => void; userId: string;}) {

  function changePage(page: string, userId?: string) {
    onPageChange(page, userId);
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
        <button onClick={() => changePage("profile", userId)}>Profile</button>
        <button onClick={() => changePage("logout")}>Logout</button>
      </div>
    </div>
  );
}
