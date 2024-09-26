import React from "react";

interface ChatWindowProps {
  selectedConversation: string;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedConversation,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <div className="border w-2/3 p-4 flex flex-col">
      {selectedConversation ? (
        <>
          <h2 className="text-lg font-bold mb-4">Chat</h2>
          {/* <div className="space-y-2 overflow-y-auto flex-1 mb-4">
            {selectedConversation.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col mb-2 ${
                  msg.senderId === 1 ? "items-end" : "items-start"
                }`}
              >
                <strong
                  className={`text-sm ${
                    msg.senderId === 1 ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  User {msg.senderId}
                </strong>
                <div
                  className={`p-2 rounded-lg max-w-xs text-white ${
                    msg.senderId === 1
                      ? "bg-gradient-to-r from-blue-400 to-blue-600 ml-auto"
                      : "bg-gradient-to-r from-gray-400 to-gray-600 mr-auto"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div> */}
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border rounded-full p-3 flex-1 mr-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className={`rounded-full p-3 flex items-center justify-center transition duration-300 ${
                newMessage.trim() ? "bg-green-500" : "bg-gray-300"
              }`}
              disabled={!newMessage.trim()} // Disable button when no text
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          Select a conversation to view messages
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
