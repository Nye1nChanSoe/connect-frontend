import React from "react";
import { User } from "../../types"; // Ensure this path is correct

interface UserListProps {
  onLogout: () => void;
  users: User[]; // New prop for users
  onUserClick: (user: User) => void; // New prop for user clicks
  user_id: number | undefined;
}

const UserList: React.FC<UserListProps> = ({
  onLogout,
  users,
  onUserClick,
  user_id,
}) => {
  return (
    <div className="border p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Friends</h2>
        <button
          onClick={onLogout}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition duration-300"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 p-2 mt-2">
        {users
          .filter((user) => user.id != user_id)
          .map((user) => (
            <div
              key={user.id}
              onClick={() => onUserClick(user)} // Use the handler from props
              className="relative text-black border rounded-full px-4 py-2 cursor-pointer hover:bg-blue-200 transition duration-300"
            >
              {/* Online/Offline Dot */}
              <div
                className={`absolute top-0 right-0 w-3 h-3 rounded-full ${
                  user.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {user.username}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
