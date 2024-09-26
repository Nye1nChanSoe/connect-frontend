import React from "react";
import { User } from "../../types";

interface UserListProps {
  users: User[];
  onLogout: () => void; // Prop to handle logout action
}

const UserList: React.FC<UserListProps> = ({ users, onLogout }) => {
  return (
    <div className="border p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Friends</h2>
        <button
          onClick={onLogout}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition duration-300"
        >
          {/* SVG Icon for Logout */}
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
      <div className="flex overflow-x-auto space-x-4 p-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-blue-800 text-white rounded-full px-4 py-2 cursor-pointer hover:bg-blue-700 transition duration-300"
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
