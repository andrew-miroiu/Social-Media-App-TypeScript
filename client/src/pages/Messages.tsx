import React, {useState} from "react";
import MessagesUsers from "../components/MessagesUsers"
import Chat from "../components/Chat"

export default function Messages({ currentUserId } : { currentUserId: string;}) {

    const [conversation, setConversation] = useState<string>("");

     return (    
           <div>
               <MessagesUsers currentUserId={currentUserId} sendConversationId={setConversation}></MessagesUsers>
               <Chat currentUserId={currentUserId} conversation_id={conversation}></Chat>
           </div>
     )
}
        