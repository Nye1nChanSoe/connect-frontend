import React from "react";
import { Conversation } from "../../types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: number | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}) => {
  return (
    <div className="border w-1/3">
      <h2 className="text-lg font-bold p-3">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`cursor-pointer p-3 border-b border-gray-300 transition duration-300 hover:bg-gray-200 ${
              selectedConversationId === conversation.id ? "bg-blue-100" : ""
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
