import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text, textVariants } from './Text';

// Mock the cn utility function
jest.mock('~/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Text Component', () => {
  it('renders children correctly', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with default variants', () => {
    render(<Text>Default Text</Text>);
    const text = screen.getByText('Default Text');
    expect(text).toHaveClass('text-textPrimary');
    expect(text).toHaveClass('font-normal');
    expect(text).toHaveClass('text-base');
  });

  it('forwards ref to the underlying paragraph element', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>Ref Test</Text>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  describe('Font variants', () => {
    it('applies extraBold font', () => {
      render(<Text font="extraBold">Extra Bold Text</Text>);
      expect(screen.getByText('Extra Bold Text')).toHaveClass('font-extrabold');
    });

    it('applies bold font', () => {
      render(<Text font="bold">Bold Text</Text>);
      expect(screen.getByText('Bold Text')).toHaveClass('font-bold');
    });

    it('applies semiBold font', () => {
      render(<Text font="semiBold">Semi Bold Text</Text>);
      expect(screen.getByText('Semi Bold Text')).toHaveClass('font-semibold');
    });

    it('applies medium font', () => {
      render(<Text font="medium">Medium Text</Text>);
      expect(screen.getByText('Medium Text')).toHaveClass('font-medium');
    });

    it('applies light font', () => {
      render(<Text font="light">Light Text</Text>);
      expect(screen.getByText('Light Text')).toHaveClass('font-light');
    });

    it('applies thin font', () => {
      render(<Text font="thin">Thin Text</Text>);
      expect(screen.getByText('Thin Text')).toHaveClass('font-thin');
    });
  });

  describe('Size variants', () => {
    it('applies xs size', () => {
      render(<Text size="xs">Extra Small Text</Text>);
      expect(screen.getByText('Extra Small Text')).toHaveClass('text-xs');
    });

    it('applies sm size', () => {
      render(<Text size="sm">Small Text</Text>);
      expect(screen.getByText('Small Text')).toHaveClass('text-sm');
    });

    it('applies md size', () => {
      render(<Text size="md">Medium Text</Text>);
      expect(screen.getByText('Medium Text')).toHaveClass('text-md');
    });

    it('applies lg size', () => {
      render(<Text size="lg">Large Text</Text>);
      expect(screen.getByText('Large Text')).toHaveClass('text-lg');
    });

    it('applies xl size', () => {
      render(<Text size="xl">Extra Large Text</Text>);
      expect(screen.getByText('Extra Large Text')).toHaveClass('text-xl');
    });

    it('applies 2xl size', () => {
      render(<Text size="2xl">2XL Text</Text>);
      expect(screen.getByText('2XL Text')).toHaveClass('text-2xl');
    });

    it('applies 3xl size', () => {
      render(<Text size="3xl">3XL Text</Text>);
      expect(screen.getByText('3XL Text')).toHaveClass('text-3xl');
    });

    it('applies 4xl size', () => {
      render(<Text size="4xl">4XL Text</Text>);
      expect(screen.getByText('4XL Text')).toHaveClass('text-4xl');
    });
  });

  describe('Color variants', () => {
    it('applies white color', () => {
      render(<Text color="white">White Text</Text>);
      // Note that the actual value is a hex color in the component
      expect(screen.getByText('White Text')).toHaveClass('#ffffff');
    });

    it('applies primary color', () => {
      render(<Text color="primary">Primary Text</Text>);
      expect(screen.getByText('Primary Text')).toHaveClass('text-primary');
    });

    it('applies gray color', () => {
      render(<Text color="gray">Gray Text</Text>);
      expect(screen.getByText('Gray Text')).toHaveClass('text-textSecondary');
    });

    it('applies muted color', () => {
      render(<Text color="muted">Muted Text</Text>);
      expect(screen.getByText('Muted Text')).toHaveClass('text-textMuted');
    });

    it('applies warning color', () => {
      render(<Text color="warning">Warning Text</Text>);
      expect(screen.getByText('Warning Text')).toHaveClass('text-warning');
    });

    it('applies error color', () => {
      render(<Text color="error">Error Text</Text>);
      expect(screen.getByText('Error Text')).toHaveClass('text-error');
    });

    it('applies success color', () => {
      render(<Text color="success">Success Text</Text>);
      expect(screen.getByText('Success Text')).toHaveClass('text-success');
    });
  });

  it('combines multiple variants correctly', () => {
    render(
      <Text font="bold" size="lg" color="primary">
        Stylish Text
      </Text>
    );
    
    const text = screen.getByText('Stylish Text');
    expect(text).toHaveClass('font-bold');
    expect(text).toHaveClass('text-lg');
    expect(text).toHaveClass('text-primary');
  });

  it('applies additional classNames when provided', () => {
    render(<Text className="custom-class">Custom Class Text</Text>);
    expect(screen.getByText('Custom Class Text')).toHaveClass('custom-class');
  });

  it('passes additional props to the paragraph element', () => {
    render(<Text data-testid="test-text">Props Test</Text>);
    expect(screen.getByTestId('test-text')).toHaveTextContent('Props Test');
  });

  it('correctly displays complex children', () => {
    render(
      <Text>
        <span>Complex</span> <strong>Children</strong>
      </Text>
    );
    
    const text = screen.getByText(/Complex Children/);
    expect(text).toContainHTML('<span>Complex</span> <strong>Children</strong>');
  });

  it('has correct displayName', () => {
    expect(Text.displayName).toBe('Text');
  });

  it('textVariants function returns correct classes', () => {
    const result = textVariants({ 
      font: 'bold', 
      size: 'lg', 
      color: 'primary' 
    });
    
    expect(result).toContain('text-textPrimary');
    expect(result).toContain('font-bold');
    expect(result).toContain('text-lg');
    expect(result).toContain('text-primary');
  });
});