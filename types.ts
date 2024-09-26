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
  participants: number[];
  messages: Message[];
}
