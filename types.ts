export interface User {
  id: number;
  username: string;
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
