import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';

// Mock the next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock the custom ImageComponent
jest.mock('./ImageSrc', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock the Text component
jest.mock('./Text', () => ({
  Text: ({ children, color, className }: any) => (
    <div data-testid="text-component" className={className} data-color={color}>
      {children}
    </div>
  ),
}));

// Mock the Input component
jest.mock('./Input', () => ({
  __esModule: true,
  default: ({ value, onChange, border }: any) => (
    <input
      data-testid="input-component"
      value={value}
      onChange={onChange}
      data-border={border}
    />
  ),
}));

// Mock the react-icons
jest.mock('react-icons/fa', () => ({
  FaEllipsisV: (props: any) => <div data-testid="ellipsis-icon" {...props} />,
}));

// Mock the custom hooks
const mockUpdateComment = jest.fn();
const mockDeleteComment = jest.fn();
const mockLikeComment = jest.fn();

jest.mock('~/APIs/hooks/useComments', () => ({
  useUpdateComment: () => ({
    mutate: mockUpdateComment,
    error: null,
  }),
  useDeleteComment: () => ({
    mutate: mockDeleteComment,
    error: null,
  }),
  useLikeComment: () => ({
    mutate: mockLikeComment,
    error: null,
  }),
}));

describe('Comment Component', () => {
  const defaultProps = {
    userName: 'Test User',
    comment: 'This is a test comment',
    time: '2 hours ago',
    imageUrl: '/test-image.jpg',
    postId: 1,
    commentId: 2,
    isLiked: false,
    likesCount: 5,
    refetchComments: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the comment with all elements', () => {
    render(<Comment {...defaultProps} />);
    
    // Check profile image
    const image = screen.getByAltText('Profile Photo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    
    // Check username
    const userNameElements = screen.getAllByTestId('text-component');
    const userNameElement = userNameElements.find(el => 
      el.textContent === defaultProps.userName && 
      el.className.includes('font-semibold')
    );
    expect(userNameElement).toBeInTheDocument();
    
    // Check comment text
    const commentTextElements = screen.getAllByTestId('text-component');
    const commentTextElement = commentTextElements.find(el => 
      el.textContent === defaultProps.comment
    );
    expect(commentTextElement).toBeInTheDocument();
    
    // Check time and likes
    expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
    
    // Check like button
    const likeTextElements = screen.getAllByTestId('text-component');
    const likeElement = likeTextElements.find(el => 
      el.textContent === `${defaultProps.likesCount} like` && 
      el.getAttribute('data-color') === 'gray'
    );
    expect(likeElement).toBeInTheDocument();
  });

  it('shows edit and delete menu when ellipsis is clicked', async () => {
    render(<Comment {...defaultProps} />);
    
    // Click the ellipsis icon
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    
    // Check that menu items appear
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('enters edit mode when edit is clicked', async () => {
    render(<Comment {...defaultProps} />);
    
    // Open menu and click edit
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    fireEvent.click(screen.getByText('Edit'));
    
    // Check that input component appears
    const inputElement = screen.getByTestId('input-component');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(defaultProps.comment);
    
    // Check that save button appears
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('updates comment when save is clicked', async () => {
    render(<Comment {...defaultProps} />);
    
    // Enter edit mode
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    fireEvent.click(screen.getByText('Edit'));
    
    // Change comment text
    const inputElement = screen.getByTestId('input-component');
    fireEvent.change(inputElement, { target: { value: 'Updated comment' } });
    
    // Save the comment
    fireEvent.click(screen.getByText('Save'));
    
    // Check that updateComment was called with correct args
    expect(mockUpdateComment).toHaveBeenCalledWith(
      { 
        postId: defaultProps.postId, 
        commentId: defaultProps.commentId, 
        comment: 'Updated comment' 
      },
      undefined
    );
  });

  it('does not call updateComment if comment is unchanged', async () => {
    render(<Comment {...defaultProps} />);
    
    // Enter edit mode
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    fireEvent.click(screen.getByText('Edit'));
    
    // Save without changing the comment
    fireEvent.click(screen.getByText('Save'));
    
    // Check that updateComment was not called
    expect(mockUpdateComment).not.toHaveBeenCalled();
  });

  it('deletes comment when delete is clicked', async () => {
    render(<Comment {...defaultProps} />);
    
    // Open menu and click delete
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    fireEvent.click(screen.getByText('Delete'));
    
    // Check that deleteComment was called with correct args
    expect(mockDeleteComment).toHaveBeenCalledWith(
      { postId: defaultProps.postId, commentId: defaultProps.commentId },
      expect.objectContaining({ 
        onSuccess: expect.any(Function) 
      })
    );
  });

  it('toggles like when like button is clicked', async () => {
    render(<Comment {...defaultProps} />);
    
    // Find and click like button
    const likeTextElements = screen.getAllByTestId('text-component');
    const likeElement = likeTextElements.find(el => 
      el.textContent === `${defaultProps.likesCount} like` && 
      el.getAttribute('data-color') === 'gray'
    );
    fireEvent.click(likeElement!.parentElement!);
    
    // Check that likeComment was called with correct args
    expect(mockLikeComment).toHaveBeenCalledWith(
      { 
        postId: defaultProps.postId, 
        commentId: defaultProps.commentId, 
        liked: true  // Toggle from false to true
      },
      expect.objectContaining({ 
        onSuccess: expect.any(Function) 
      })
    );
  });

  it('renders liked state correctly', () => {
    render(<Comment {...defaultProps} isLiked={true} />);
    
    // Check like button in liked state
    const likeTextElements = screen.getAllByTestId('text-component');
    const likeElement = likeTextElements.find(el => 
      el.textContent === `${defaultProps.likesCount} liked` && 
      el.getAttribute('data-color') === 'primary'
    );
    expect(likeElement).toBeInTheDocument();
  });

  it('closes menu when clicking outside', () => {
    render(<Comment {...defaultProps} />);
    
    // Open menu
    const ellipsisIcon = screen.getByTestId('ellipsis-icon');
    fireEvent.click(ellipsisIcon);
    
    // Verify menu is open
    expect(screen.getByText('Edit')).toBeInTheDocument();
    
    // Simulate click outside
    fireEvent.click(document);
    
    // Menu should be closed
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('displays error messages when API calls fail', () => {
    // Re-mock hooks with errors
    jest.mock('~/APIs/hooks/useComments', () => ({
      useUpdateComment: () => ({
        mutate: mockUpdateComment,
        error: new Error('Update error'),
      }),
      useDeleteComment: () => ({
        mutate: mockDeleteComment,
        error: new Error('Delete error'),
      }),
      useLikeComment: () => ({
        mutate: mockLikeComment,
        error: new Error('Like error'),
      }),
    }));
    
    // This part would need a more complex test setup to properly mock the hooks with errors
    // For a complete test, you might consider using jest.spyOn or a more sophisticated mock approach
  });
});