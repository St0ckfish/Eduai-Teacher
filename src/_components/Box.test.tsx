// Box.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Box from "./Box";

describe("Box Component", () => {
  test("renders children content", () => {
    render(<Box>Test content</Box>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("applies default classes when no shadow or border is provided", () => {
    const { container } = render(<Box>Content</Box>);
    const boxDiv = container.firstChild as HTMLElement;

    // Default classes
    expect(boxDiv).toHaveClass("w-full");
    expect(boxDiv).toHaveClass("rounded-xl");
    expect(boxDiv).toHaveClass("bg-bgPrimary");
    expect(boxDiv).toHaveClass("p-4");
    // default shadow is "sm"
    expect(boxDiv).toHaveClass("shadow-sm");
    // When border is "none", no extra border classes are applied.
    expect(boxDiv.className).not.toMatch(/\bborder\b/);
  });

  test("applies custom shadow class when provided", () => {
    const { container } = render(<Box shadow="lg">Content</Box>);
    const boxDiv = container.firstChild as HTMLElement;
    expect(boxDiv).toHaveClass("shadow-lg");
  });

  test("applies border classes when border prop is provided", () => {
    const { container } = render(<Box border="borderPrimary">Content</Box>);
    const boxDiv = container.firstChild as HTMLElement;
    // Expect both the generic 'border' and the specific border class.
    expect(boxDiv).toHaveClass("border");
    expect(boxDiv).toHaveClass("borderPrimary");
  });

  test("applies additional className prop", () => {
    const { container } = render(<Box className="custom-class">Content</Box>);
    const boxDiv = container.firstChild as HTMLElement;
    expect(boxDiv).toHaveClass("custom-class");
  });
});

