import { apiService } from '../api/apiService';
import { ChatMessage } from '../types/chat';

export const chatService = {
  fetchMessages: async (userId: string, receiverId: string) => {
    return await apiService.get<ChatMessage[]>(
      `/messages/history/${userId}/${receiverId}`
    );
  },
};
