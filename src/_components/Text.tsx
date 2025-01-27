"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";

const textVariants = cva("text-textPrimary", {
  variants: {
    font: {
      default: "font-normal",
      extraBold: "font-extrabold",
      bold: "font-bold",
      semiBold: "font-semibold",
      medium: "font-medium",
      light: "font-light",
      thin: "font-thin",
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    color: {
      white: "#ffffff",
      default: "text-textPrimary",
      primary: "text-primary",
      gray: "text-textSecondary",
      muted: "text-textMuted",
      warning: "text-warning",
      error: "text-error",
      success: "text-success"
    },
  },
  defaultVariants: {
    font: "default",
    size: "default",
    color: "default",
  },
});

type TextProps = {
  font?: VariantProps<typeof textVariants>["font"];
  size?: VariantProps<typeof textVariants>["size"];
  color?: VariantProps<typeof textVariants>["color"];
  className?: string;
  children: React.ReactNode; 
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, font = "default", color = "default", size = "default", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ font, color, size }), className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
