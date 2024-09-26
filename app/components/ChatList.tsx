import React from "react";
import { Conversation } from "../../types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string;
  onSelectConversation: (room: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}) => {
  return (
    <div className="border w-1/3">
      <h2 className="text-lg font-bold p-3">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.room_name)}
            className={`cursor-pointer p-3 border-b border-gray-300 transition duration-300 hover:bg-gray-200 ${
              selectedConversation === conversation.room_name
                ? "bg-blue-100"
                : ""
            }`}
          >
            Chat with {conversation.participant}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
