import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from './Button';

// Mock next/link
jest.mock('next/link', () => {
  return ({ href, children, ...rest }: any) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

describe('Button', () => {
  // Test rendering as button (default)
  describe('when rendered as button', () => {
    it('renders a button element with children', () => {
      render(<Button>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: /Click Me/i });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('applies the primary color by default', () => {
      render(<Button>Primary Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
      expect(button).toHaveClass('hover:bg-primaryHover');
    });

    it('applies secondary color when specified', () => {
      render(<Button color="secondary">Secondary Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-bgPowderBlue');
      expect(button).toHaveClass('hover:bg-textSecondary');
    });

    it('applies error color when specified', () => {
      render(<Button color="error">Error Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-error');
      expect(button).toHaveClass('hover:bg-errorHover');
    });

    it('applies outline theme for primary color', () => {
      render(<Button theme="outline">Outline Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary');
      expect(button).toHaveClass('border-primary');
      expect(button).toHaveClass('bg-transparent');
    });

    it('applies outline theme for secondary color', () => {
      render(<Button theme="outline" color="secondary">Outline Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-secondary-500');
      expect(button).toHaveClass('border-secondary-500');
      expect(button).toHaveClass('bg-transparent');
    });

    it('applies outline theme for error color', () => {
      render(<Button theme="outline" color="error">Outline Error</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-error');
      expect(button).toHaveClass('border-error');
      expect(button).toHaveClass('bg-transparent');
    });

    it('applies additional className when provided', () => {
      render(<Button className="test-class">Custom Class</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('test-class');
    });

    it('passes additional button attributes', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Test rendering as anchor
  describe('when rendered as anchor', () => {
    it('renders an anchor element with href', () => {
      render(<Button as="a" href="https://example.com">Link Button</Button>);
      
      const link = screen.getByRole('link', { name: /Link Button/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('passes additional anchor attributes', () => {
      render(
        <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
        </Button>
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // Test rendering as Next.js Link
  describe('when rendered as Next.js Link', () => {
    it('renders a Link component with href', () => {
      render(<Button as="link" href="/dashboard">Next Link</Button>);
      
      const link = screen.getByRole('link', { name: /Next Link/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('passes additional Link attributes', () => {
      render(
        <Button as="link" href="/dashboard">
          Dashboard Link
        </Button>
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/dashboard');
    });
  });

  // Base styles test
  it('applies base styling to all variants', () => {
    const { rerender } = render(<Button>Button Variant</Button>);
    
    let element = screen.getByRole('button');
    expect(element).toHaveClass('w-full');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('rounded-lg');
    
    rerender(<Button as="a" href="#">Anchor Variant</Button>);
    element = screen.getByRole('link');
    expect(element).toHaveClass('w-full');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('rounded-lg');
    
    rerender(<Button as="link" href="#">Link Variant</Button>);
    element = screen.getByRole('link');
    expect(element).toHaveClass('w-full');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('rounded-lg');
  });
});