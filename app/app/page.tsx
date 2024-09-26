"use client";

import React, { useState } from "react";
import data from "../../data.json";
import UserList from "../components/UserList";
import ConversationList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { User, Conversation } from "../../types";

const Home: React.FC = () => {
  const [users] = useState<User[]>(data.users);
  const [conversations] = useState<Conversation[]>(data.conversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (selectedConversation && newMessage.trim()) {
      const updatedMessages = [
        ...selectedConversation.messages,
        {
          senderId: 1, // Assuming current user is 1
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ];

      setSelectedConversation({
        ...selectedConversation,
        messages: updatedMessages,
      });
      setNewMessage(""); // Clear input field after sending
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <UserList users={users} onLogout={() => {}} />
      <div className="flex flex-1">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversation?.id || null}
          onSelectConversation={setSelectedConversation}
        />
        <ChatWindow
          selectedConversation={selectedConversation}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Home;
