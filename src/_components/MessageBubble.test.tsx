import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageBubble } from './MessageBubble';

describe('MessageBubble Component', () => {
  const mockCurrentUserMessage = {
    message: {
      content: 'Hello there!',
      creationTime: '2023-05-15T14:30:00Z',
      imageUrl: '/images/test.jpg',
    },
    isCurrentUser: true,
    userName: 'John Doe',
  };

  const mockOtherUserMessage = {
    message: {
      content: 'Hi, how are you?',
      creationTime: '2023-05-15T14:35:00Z',
    },
    isCurrentUser: false,
    userName: 'Jane Smith',
  };

  const formatTime = (datetimeString: string) => {
    const date = new Date(datetimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  it('renders current user message correctly', () => {
    render(<MessageBubble {...mockCurrentUserMessage} />);
    
    // Check for direction and alignment
    const messageContainer = screen.getByText('Hello there!').closest('div[dir="rtl"]');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer).toHaveClass('ml-auto');
    expect(messageContainer).toHaveClass('text-right');
    
    // Check for content
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
    
    // Check for time
    const expectedTime = formatTime(mockCurrentUserMessage.message.creationTime);
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
    
    // Check for read receipt indicator for current user
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders other user message correctly', () => {
    render(<MessageBubble {...mockOtherUserMessage} />);
    
    // Check for direction and alignment
    const messageContainer = screen.getByText('Hi, how are you?').closest('div[dir="ltr"]');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer).toHaveClass('mr-auto');
    expect(messageContainer).toHaveClass('text-left');
    
    // Check for content
    expect(screen.getByText('Hi, how are you?')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check for time
    const expectedTime = formatTime(mockOtherUserMessage.message.creationTime);
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
    
    // Check that there's no read receipt indicator for other user
    const svgElement = document.querySelector('svg');
    expect(svgElement).not.toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<MessageBubble {...mockCurrentUserMessage} />);
    
    const profileImage = screen.getByAltText('Jese image');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/images/man.png');
    expect(profileImage).toHaveClass('w-8');
    expect(profileImage).toHaveClass('h-8');
    expect(profileImage).toHaveClass('rounded-full');
  });

  it('applies correct background color based on user type', () => {
    const { rerender } = render(<MessageBubble {...mockCurrentUserMessage} />);
    
    // Current user should have a light orange background
    let bubbleContainer = screen.getByText('Hello there!').closest('.bg-[#ffead1]');
    expect(bubbleContainer).toBeInTheDocument();
    
    rerender(<MessageBubble {...mockOtherUserMessage} />);
    
    // Other user should have a gray background
    bubbleContainer = screen.getByText('Hi, how are you?').closest('.bg-gray-100');
    expect(bubbleContainer).toBeInTheDocument();
  });

  it('handles message content correctly', () => {
    const longMessage = {
      ...mockCurrentUserMessage,
      message: {
        ...mockCurrentUserMessage.message,
        content: 'This is a very long message that should be properly wrapped within the message bubble component and should not overflow its container.'
      }
    };
    
    render(<MessageBubble {...longMessage} />);
    
    const messageContent = screen.getByText(longMessage.message.content);
    expect(messageContent).toBeInTheDocument();
    
    // Check that parent elements have break-words class
    const parentWithBreakWords = messageContent.closest('.break-words');
    expect(parentWithBreakWords).toBeInTheDocument();
  });

  it('formats the time correctly', () => {
    const specificTimeMessage = {
      ...mockCurrentUserMessage,
      message: {
        ...mockCurrentUserMessage.message,
        creationTime: '2023-05-15T09:45:30Z'
      }
    };
    
    render(<MessageBubble {...specificTimeMessage} />);
    
    // Expected format will depend on the user's locale, so we use the same formatter
    const expectedTime = formatTime(specificTimeMessage.message.creationTime);
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  // Note: We're not testing the commented-out code as it's not active,
  // but we would include tests for image rendering if that part were uncommented
});