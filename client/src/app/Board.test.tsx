import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';

import Board from './Board';
import useChatStore from '../store/useChatStore';

describe('Board Component', () => {
  beforeEach(() => {
    cleanup();
    useChatStore.setState({
      currentUser: null,
      users: [],
      receiver: null,
      messages: [],
      sendMessage: vi.fn(),
      setReceiver: vi.fn(),
      setMessages: vi.fn(),
    });
  });

  it('renders correctly', () => {
    useChatStore.setState({ currentUser: { id: '1', username: 'User1' } });
    render(<Board />);
    expect(screen.getByText('User1')).toBeTruthy();
    expect(screen.getByText('No users online!')).toBeTruthy();
  });

  it('display users list correctly', () => {
    useChatStore.setState({ users: [{ id: '1', username: 'User1' }, { id: '2', username: 'User2' }] });
    render(<Board />);
    expect(screen.getByText('User1')).toBeTruthy();
    expect(screen.getByText('User2')).toBeTruthy();
  });
});