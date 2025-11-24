import React from "react";
import MessagesUsers from "../components/MessagesUsers"

export default function Messages({ currentUserId } : { currentUserId: string;}) {
    return (    
        <div>
            <MessagesUsers currentUserId = {currentUserId}></MessagesUsers>
        </div>
    )
}
        