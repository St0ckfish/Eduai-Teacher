import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchableSelect from './SearchSelect';

describe('SearchableSelect Component', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Different Option' },
  ];

  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    options: mockOptions,
    placeholder: 'Select an option',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder when no value is selected', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('displays the selected option label when value is provided', () => {
    render(<SearchableSelect {...defaultProps} value="2" />);
    
    const input = screen.getByDisplayValue('Option 2');
    expect(input).toBeInTheDocument();
  });

  it('opens dropdown on input focus', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Check if dropdown is open
    const optionsList = screen.getByRole('list');
    expect(optionsList).toBeInTheDocument();
    
    // Check if all options are shown
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Different Option')).toBeInTheDocument();
  });

  it('filters options based on input', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, 'Option');
    
    // Only options with "Option" should be visible
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Different Option')).toBeInTheDocument();
    
    await userEvent.clear(input);
    await userEvent.type(input, 'Different');
    
    // Only "Different Option" should be visible
    expect(screen.getByText('Different Option')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('calls onChange with correct value when option is clicked', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    const option2 = screen.getByText('Option 2');
    await userEvent.click(option2);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('2');
  });

  it('displays "No data found" when no options match filter', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, 'Nonexistent');
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside-element">Click me</div>
        <SearchableSelect {...defaultProps} />
      </div>
    );
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Dropdown should be open
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Click outside
    const outsideElement = screen.getByTestId('outside-element');
    await userEvent.click(outsideElement);
    
    // Dropdown should be closed
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('calls onBlur when input loses focus', async () => {
    const onBlurMock = jest.fn();
    render(
      <div>
        <SearchableSelect {...defaultProps} onBlur={onBlurMock} />
        <div data-testid="outside-element" tabIndex={0}>Click me</div>
      </div>
    );
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Tab to next element
    await userEvent.tab();
    
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    render(<SearchableSelect {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toHaveClass('border-error');
  });

  it('is disabled when isDisabled prop is true', () => {
    render(<SearchableSelect {...defaultProps} isDisabled={true} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });

  it('does not open dropdown when disabled and input is clicked', async () => {
    render(<SearchableSelect {...defaultProps} isDisabled={true} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  // Keyboard navigation tests
  it('responds to ArrowDown key to open dropdown', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Make sure dropdown is closed
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    
    // Press ArrowDown
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    
    // Dropdown should be open
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('highlights options with arrow keys', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Initial state - no highlight
    const options = screen.getAllByRole('listitem');
    expect(options[0]).not.toHaveClass('bg-primary/10');
    
    // Press ArrowDown to highlight first option
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(options[0]).toHaveClass('bg-primary/10');
    
    // Press ArrowDown again to highlight second option
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(options[0]).not.toHaveClass('bg-primary/10');
    expect(options[1]).toHaveClass('bg-primary/10');
    
    // Press ArrowUp to go back to first option
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(options[0]).toHaveClass('bg-primary/10');
    expect(options[1]).not.toHaveClass('bg-primary/10');
  });

  it('selects highlighted option with Enter key', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Highlight first option
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    
    // Press Enter to select it
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('1');
    
    // Dropdown should be closed
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('closes dropdown with Escape key', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    // Dropdown should be open
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Press Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Dropdown should be closed
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('applies custom bgColor and border classes', () => {
    render(
      <SearchableSelect 
        {...defaultProps} 
        bgColor="bg-gray-100" 
        border="border-blue-500"
      />
    );
    
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toHaveClass('bg-gray-100');
    expect(input).toHaveClass('border-blue-500');
  });

  it('applies custom maxHeight to the dropdown', async () => {
    render(<SearchableSelect {...defaultProps} maxHeight="max-h-40" />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    const dropdown = screen.getByRole('list');
    expect(dropdown).toHaveClass('max-h-40');
  });

  it('resets search term when onChange is called with empty string', async () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    await userEvent.type(input, 'opt');
    
    // Input value should be updated
    expect(input).toHaveValue('opt');
    
    // onChange should be called with empty string
    expect(defaultProps.onChange).toHaveBeenCalledWith('');
  });

  it('closes dropdown and preserves search term when a value is selected', async () => {
    const changeMock = jest.fn();
    render(<SearchableSelect {...defaultProps} onChange={changeMock} />);
    
    const input = screen.getByPlaceholderText('Select an option');
    await userEvent.click(input);
    
    const option2 = screen.getByText('Option 2');
    await userEvent.click(option2);
    
    // Input value should be set to option label
    expect(input).toHaveValue('Option 2');
    
    // onChange should be called with option value
    expect(changeMock).toHaveBeenCalledWith('2');
    
    // Dropdown should be closed
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});