import { User } from "./user";

export type ChatMessage = {
  id: string;
  sender: User;
  receiver: User;
  message: string;
  timestamp: number;
};