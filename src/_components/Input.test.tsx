import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  // Basic rendering tests
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('bg-bgSecondary');
    expect(input).toHaveClass('rounded-lg');
  });

  it('renders label when provided', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-textPrimary');
    expect(label).toHaveClass('font-medium');
  });

  // Theme tests
  it('applies transparent theme correctly', () => {
    render(<Input theme="transparent" placeholder="Transparent input" />);
    
    const input = screen.getByPlaceholderText('Transparent input');
    expect(input).toHaveClass('bg-transparent');
    expect(input).not.toHaveClass('bg-bgSecondary');
    expect(input).not.toHaveClass('bg-comment');
  });

  it('applies comment theme correctly', () => {
    render(<Input theme="comment" placeholder="Comment input" />);
    
    const input = screen.getByPlaceholderText('Comment input');
    expect(input).toHaveClass('bg-comment');
    expect(input).toHaveClass('rounded-xl');
    expect(input).not.toHaveClass('bg-bgSecondary');
  });

  it('applies solid theme correctly', () => {
    render(<Input theme="solid" placeholder="Solid input" />);
    
    const input = screen.getByPlaceholderText('Solid input');
    expect(input).toHaveClass('bg-bgSecondary');
    expect(input).not.toHaveClass('bg-transparent');
    expect(input).not.toHaveClass('bg-comment');
  });

  // Border tests
  it('applies no border when border is "none"', () => {
    render(<Input border="none" placeholder="No border input" />);
    
    const input = screen.getByPlaceholderText('No border input');
    expect(input).not.toHaveClass('border');
    expect(input).not.toHaveClass('border-borderPrimary');
    expect(input).not.toHaveClass('border-borderSecondary');
  });

  it('applies gray border correctly', () => {
    render(<Input border="gray" placeholder="Gray border input" />);
    
    const input = screen.getByPlaceholderText('Gray border input');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-borderPrimary');
    expect(input).not.toHaveClass('border-borderSecondary');
  });

  it('applies primary border correctly', () => {
    render(<Input border="primary" placeholder="Primary border input" />);
    
    const input = screen.getByPlaceholderText('Primary border input');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-borderSecondary');
    expect(input).not.toHaveClass('border-borderPrimary');
  });

  // Rounded tests
  it('applies different border radius options correctly', () => {
    const { rerender } = render(<Input rounded="none" placeholder="No rounded input" />);
    
    let input = screen.getByPlaceholderText('No rounded input');
    expect(input).toHaveClass('rounded-none');
    
    rerender(<Input rounded="sm" placeholder="No rounded input" />);
    input = screen.getByPlaceholderText('No rounded input');
    expect(input).toHaveClass('rounded-sm');
    
    rerender(<Input rounded="md" placeholder="No rounded input" />);
    input = screen.getByPlaceholderText('No rounded input');
    expect(input).toHaveClass('rounded-md');
    
    rerender(<Input rounded="full" placeholder="No rounded input" />);
    input = screen.getByPlaceholderText('No rounded input');
    expect(input).toHaveClass('rounded-full');
  });

  // Error state test
  it('applies error styling when error is provided', () => {
    render(<Input error="This field is required" placeholder="Error input" />);
    
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('border-error');
    expect(input).toHaveClass('bg-transparent');
    expect(input).not.toHaveClass('bg-bgSecondary');
  });

  // Password toggling test
  it('toggles password visibility when eye icon is clicked', async () => {
    render(<Input type="password" placeholder="Enter password" />);
    
    // Initially password type
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
    
    // Find the toggle button and click it
    const toggleButton = screen.getByLabelText('Toggle password visibility');
    await userEvent.click(toggleButton);
    
    // Should now be text type
    expect(input).toHaveAttribute('type', 'text');
    
    // Click again
    await userEvent.click(toggleButton);
    
    // Should be password type again
    expect(input).toHaveAttribute('type', 'password');
  });

  // Form integration test
  it('works with react-hook-form register prop', () => {
    // Mock the register return
    const mockRegister = {
      name: 'email',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    };
    
    render(
      <Input 
        register={mockRegister} 
        placeholder="Email" 
      />
    );
    
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('name', 'email');
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(mockRegister.onChange).toHaveBeenCalled();
    
    // Simulate blur
    fireEvent.blur(input);
    expect(mockRegister.onBlur).toHaveBeenCalled();
  });

  // Combination test
  it('correctly combines all custom props', () => {
    render(
      <Input 
        label="Profile" 
        placeholder="Enter profile details" 
        theme="transparent"
        border="primary"
        rounded="full"
        className="custom-class"
        dir="rtl"
      />
    );
    
    const input = screen.getByPlaceholderText('Enter profile details');
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(input).toHaveClass('bg-transparent');
    expect(input).toHaveClass('border-borderSecondary');
    expect(input).toHaveClass('rounded-full');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveAttribute('dir', 'rtl');
  });

  // HTML attributes test
  it('passes through standard HTML input attributes', () => {
    render(
      <Input 
        placeholder="Test input"
        id="test-id"
        name="test-name"
        maxLength={10}
        required
        disabled
      />
    );
    
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('id', 'test-id');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  // Event handling test
  it('handles events correctly', async () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input 
        placeholder="Event test"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    
    const input = screen.getByPlaceholderText('Event test');
    
    // Test change event
    await userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
    
    // Test focus event
    await userEvent.click(input);
    expect(handleFocus).toHaveBeenCalled();
    
    // Test blur event
    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalled();
  });
});