import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoxGrid from './BoxGrid';

describe('BoxGrid', () => {
  it('renders children correctly', () => {
    render(
      <BoxGrid>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </BoxGrid>
    );
    
    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    const { container } = render(
      <BoxGrid>
        <div>Content</div>
      </BoxGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('md:grid-cols-2');
    expect(gridElement).toHaveClass('gap-6');
  });

  it('applies custom columns correctly', () => {
    const { container } = render(
      <BoxGrid columns={4} mdColumns={2}>
        <div>Content</div>
      </BoxGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('grid-cols-2');
    expect(gridElement).toHaveClass('md:grid-cols-4');
  });

  it('applies custom gap correctly', () => {
    const { container } = render(
      <BoxGrid gap={8}>
        <div>Content</div>
      </BoxGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('gap-8');
  });

  it('applies additional className correctly', () => {
    const { container } = render(
      <BoxGrid className="custom-class">
        <div>Content</div>
      </BoxGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('custom-class');
  });

  it('passes additional props to the div element', () => {
    const { container } = render(
      <BoxGrid data-testid="grid-element" aria-label="Grid container">
        <div>Content</div>
      </BoxGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveAttribute('data-testid', 'grid-element');
    expect(gridElement).toHaveAttribute('aria-label', 'Grid container');
  });
});