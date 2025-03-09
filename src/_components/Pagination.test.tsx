import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    totalPages: 10,
    currentPage: 3, // 0-indexed, so this is page 4
    elementsPerPage: 20,
    onChangePage: jest.fn(),
    onChangeElementsPerPage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all necessary elements', () => {
    render(<Pagination {...defaultProps} />);
    
    // Check for "Show" and "Rows" labels
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('Rows')).toBeInTheDocument();
    
    // Check for page buttons
    expect(screen.getByText('1')).toBeInTheDocument(); // First page
    expect(screen.getByText('4')).toBeInTheDocument(); // Current page
    expect(screen.getByText('10')).toBeInTheDocument(); // Last page
    
    // Check for navigation buttons
    const prevButton = screen.getByRole('button', { name: /previous/i }) || document.querySelector('svg path[d="M15 18L9 12L15 6"]')?.closest('button');
    const nextButton = screen.getByRole('button', { name: /next/i }) || document.querySelector('svg path[d="M9 18L15 12L9 6"]')?.closest('button');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    // Check for elements per page dropdown
    const elementsPerPageSelect = screen.getByRole('combobox');
    expect(elementsPerPageSelect).toBeInTheDocument();
    expect(elementsPerPageSelect).toHaveValue('20');
  });

  it('calls onChangePage when clicking on a page button', async () => {
    render(<Pagination {...defaultProps} />);
    
    // Click on the first page
    await userEvent.click(screen.getByText('1'));
    expect(defaultProps.onChangePage).toHaveBeenCalledWith(0);
    
    // Click on the last page
    await userEvent.click(screen.getByText('10'));
    expect(defaultProps.onChangePage).toHaveBeenCalledWith(9);
  });

  it('calls onChangePage when clicking on navigation buttons', async () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = document.querySelector('svg path[d="M15 18L9 12L15 6"]')?.closest('button');
    const nextButton = document.querySelector('svg path[d="M9 18L15 12L9 6"]')?.closest('button');
    
    // Click previous button
    await userEvent.click(prevButton!);
    expect(defaultProps.onChangePage).toHaveBeenCalledWith(2);
    
    // Click next button
    await userEvent.click(nextButton!);
    expect(defaultProps.onChangePage).toHaveBeenCalledWith(4);
  });

  it('calls onChangeElementsPerPage when changing the dropdown', async () => {
    render(<Pagination {...defaultProps} />);
    
    const dropdown = screen.getByRole('combobox');
    
    // Change to 50 elements per page
    await userEvent.selectOptions(dropdown, '50');
    expect(defaultProps.onChangeElementsPerPage).toHaveBeenCalledWith(50);
    
    // Change to 100 elements per page
    await userEvent.selectOptions(dropdown, '100');
    expect(defaultProps.onChangeElementsPerPage).toHaveBeenCalledWith(100);
  });

  it('hides previous button when on first page', () => {
    render(<Pagination {...defaultProps} currentPage={0} />);
    
    const prevButton = document.querySelector('svg path[d="M15 18L9 12L15 6"]')?.closest('button');
    expect(prevButton).toHaveStyle('visibility: hidden');
    
    const nextButton = document.querySelector('svg path[d="M9 18L15 12L9 6"]')?.closest('button');
    expect(nextButton).toHaveStyle('visibility: visible');
  });

  it('hides next button when on last page', () => {
    render(<Pagination {...defaultProps} currentPage={9} />); // 0-indexed, so this is the last page
    
    const prevButton = document.querySelector('svg path[d="M15 18L9 12L15 6"]')?.closest('button');
    expect(prevButton).toHaveStyle('visibility: visible');
    
    const nextButton = document.querySelector('svg path[d="M9 18L15 12L9 6"]')?.closest('button');
    expect(nextButton).toHaveStyle('visibility: hidden');
  });

  it('renders correct page buttons for small number of pages', () => {
    render(<Pagination {...defaultProps} totalPages={5} currentPage={2} />);
    
    // Should show all 5 page buttons with no ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Current page
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Should not have ellipsis
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders ellipsis for large number of pages - middle page', () => {
    render(<Pagination {...defaultProps} totalPages={15} currentPage={7} />);
    
    // Should show first and last page with ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(2); // Both ellipses
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument(); // Current page
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders correctly for early pages with large number of pages', () => {
    render(<Pagination {...defaultProps} totalPages={15} currentPage={1} />);
    
    // Should show first page, current and around, ellipsis, and last page
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Current page
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(1); // Only right ellipsis
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders correctly for late pages with large number of pages', () => {
    render(<Pagination {...defaultProps} totalPages={15} currentPage={13} />);
    
    // Should show first page, ellipsis, current and around, and last page
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(1); // Only left ellipsis
    expect(screen.getByText('13')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument(); // Current page
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('applies active styling to the current page button', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    // Find all buttons to identify the current page button
    const pageButtons = screen.getAllByRole('button');
    const currentPageButton = pageButtons.find(
      button => button.textContent === '4' // 0-indexed, so page 4
    );
    
    // Check that current page button has the active style
    expect(currentPageButton).toHaveStyle({
      backgroundColor: '#0077cc',
      color: '#FFFFFF'
    });
    
    // Check that other page buttons don't have active style
    const otherPageButton = pageButtons.find(
      button => button.textContent === '1'
    );
    expect(otherPageButton).toHaveStyle({
      backgroundColor: 'transparent',
      color: '#B2B1B4'
    });
  });

  it('prevents going beyond the first page', async () => {
    // Start at page 0 (first page)
    render(<Pagination {...defaultProps} currentPage={0} />);
    
    const prevButton = document.querySelector('svg path[d="M15 18L9 12L15 6"]')?.closest('button');
    
    // Try clicking previous when on first page (should be hidden, but just in case)
    if (prevButton && window.getComputedStyle(prevButton).visibility !== 'hidden') {
      await userEvent.click(prevButton);
      // Should not go to negative page
      expect(defaultProps.onChangePage).not.toHaveBeenCalledWith(-1);
    }
  });

  it('prevents going beyond the last page', async () => {
    // Start at last page
    render(<Pagination {...defaultProps} currentPage={9} />);
    
    const nextButton = document.querySelector('svg path[d="M9 18L15 12L9 6"]')?.closest('button');
    
    // Try clicking next when on last page (should be hidden, but just in case)
    if (nextButton && window.getComputedStyle(nextButton).visibility !== 'hidden') {
      await userEvent.click(nextButton);
      // Should not go beyond last page
      expect(defaultProps.onChangePage).not.toHaveBeenCalledWith(10);
    }
  });
});