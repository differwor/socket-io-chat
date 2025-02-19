import { User } from '@nx-chat-assignment/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { ChatRepository } from '../repositories/chat.repository';

export const AuthService = {
  login: (username: string): User | null => {
    const existingUser = ChatRepository.getUsersOnline().find(
      (u) => u.username === username
    );

    if (existingUser && existingUser.online) {
      return null;
    }

    const participatedUser = ChatRepository.getParticipatedUsers().find(
      (u) => u.username === username
    );

    if (participatedUser) {
      participatedUser.online = true;
      ChatRepository.addOnlineUser(participatedUser);
      return participatedUser;
    }

    const newUser: User = { id: uuidv4(), username, online: true };
    ChatRepository.storeUser(newUser);
    ChatRepository.addOnlineUser(newUser);
    return newUser;
  },

  logout: (userId: string) => {
    const user = ChatRepository.getUsersOnline().find((u) => u.id === userId);

    if (!user) {
      return { error: 'User not found' };
    }

    ChatRepository.removeUser(userId);
    return { message: 'User logged out' };
  },
};
