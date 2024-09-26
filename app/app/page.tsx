"use client";

import React, { useState, useEffect } from "react";
import data from "../../data.json";
import UserList from "../components/UserList";
import ConversationList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { Conversation, User } from "../../types";
import { useRouter } from "next/navigation";
import socket from "@/utils/socket"; // Ensure your socket import path is correct
import { useAuth } from "@/Contexts/AuthProvider";

const Home: React.FC = () => {
  const [conversations] = useState<Conversation[]>(data.conversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);
  const [joinedRooms, setJoinedRooms] = useState<Set<string>>(new Set());
  const { userCredentials, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users); // Ensure that the server returns users in this format
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on("user_joined", (data) => {
      console.log(`${data.username} has joined the room: ${data.room}`);
    });
  }, []);

  const handleUserClick = (user: User) => {
    if (socket.connected) {
      const room = `room_id_${userCredentials?.email}_${user.email}`;
      if (joinedRooms.has(room)) {
        console.log(`Already joined the room: ${room}`);
        return;
      }

      // Emit join room events
      socket.emit("join_room", {
        room: room,
        username: userCredentials?.username,
        created_by: userCredentials?.id,
      });
      socket.emit("join_room", {
        room: room,
        username: user.username,
        created_by: userCredentials?.id,
      });

      setJoinedRooms((prev) => new Set(prev).add(room));

      // // Create new conversation
      // const newConversation: Conversation = {
      //   id: conversations.length + 1,
      //   participants: [user.username, userCredentials?.username],
      //   messages: [],
      // };
      // setConversations((prev) => [...prev, newConversation]);
      // setSelectedConversation(newConversation); // Set the newly created conversation as selected
    } else {
      console.error("Socket is not connected!");
    }
  };

  const handleSendMessage = () => {
    if (selectedConversation && newMessage.trim()) {
      const updatedMessages = [
        ...selectedConversation.messages,
        {
          senderId: 1, // Adjust accordingly
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ];

      setSelectedConversation({
        ...selectedConversation,
        messages: updatedMessages,
      });
      setNewMessage("");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <UserList
        onLogout={handleLogout}
        users={users}
        onUserClick={handleUserClick}
        user_id={userCredentials?.id}
      />
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
