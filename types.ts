export interface User {
  id: number;
  username: string;
  email: string;
  status: string;
}

export interface Message {
  senderId: number;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  room_name: string;
  created_by: string;
  participant: string;
  created_at: string;
}
