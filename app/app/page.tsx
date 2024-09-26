"use client";

import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import ConversationList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { Conversation, User } from "../../types";
import { useRouter } from "next/navigation";
import socket from "@/utils/socket"; // Ensure your socket import path is correct
import { useAuth } from "@/Contexts/AuthProvider";

const Home: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string>("");
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

  // Assuming isAuthenticated is already part of your state
  useEffect(() => {
    const fetchUsersAndConversations = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch("http://localhost:5000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }

        const usersData = await usersResponse.json();
        setUsers(usersData.users); // Ensure that the server returns users in this format

        // Fetch conversations
        const conversationsResponse = await fetch(
          "http://localhost:5000/conversations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!conversationsResponse.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const conversationsData = await conversationsResponse.json();
        setConversations(conversationsData.conversations);
        conversationsData.conversations.map((c: Conversation) =>
          setJoinedRooms((prev) => new Set(prev).add(c.room_name))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      fetchUsersAndConversations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on("user_joined", (data) => {
      console.log(`${data.username} has joined the room: ${data.room}`);
    });
  }, []);

  const handleUserClick = async (user: User) => {
    if (socket.connected) {
      const room = `room_id_${userCredentials?.email}_${user.email}`;

      if (joinedRooms.has(room)) {
        setSelectedConversation(room);
        console.log(`Already joined the room: ${room}`);
        return;
      }
      await checkRoomExists(room, user.username);
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
    } else {
      console.error("Socket is not connected!");
    }
  };

  const checkRoomExists = async (room: string, participant: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/conversations/${room}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ participant }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to check room existence");
      }
      const data = await response.json();
      setConversations([data, ...conversations]);
    } catch (error) {
      console.error("Error checking room existence:", error);
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
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
        <ChatWindow
          selectedConversation={selectedConversation}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={() => {}}
        />
      </div>
    </div>
  );
};

export default Home;
