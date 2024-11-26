import React from "react";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";

type ButtonAsButton = {
  as?: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: "a";
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsLink = {
  as: "link";
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  children: ReactNode;
  className?: string;
  theme?: "outline";
  color?: "error" | "primary" | "secondary";
} & (ButtonAsButton | ButtonAsAnchor | ButtonAsLink);

/**
 * A versatile Button component that can render as a <button>, <a> or a Link.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {("button" | "a" | "link")} [props.as="button"] - The HTML element type to render.
 * @param {("outline")} [props.theme] - The theme variant of the button.
 * @param {("error" | "primary" | "secondary")} [props.color] - The color variant of the button.
 *
 * @returns {JSX.Element} The rendered button, anchor, or link element.
 */
const Button = ({
  children,
  className,
  as = "button",
  theme,
  color = "primary",
  ...rest
}: ButtonProps) => {
  const baseClassName =
    "w-full flex items-center gap-3 justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold text-center hover:shadow-lg duration-200 ease-in";

  const colorClassName =
    color === "error"
      ? "bg-error text-white hover:bg-errorHover"
      : color === "secondary"
      ? "bg-bgPowderBlue text-white hover:bg-textSecondary"
      : "bg-primary text-white hover:bg-primaryHover";

  const themeClassName =
    theme === "outline"
      ? color === "error"
        ? "text-error border border-error bg-transparent"
        : color === "secondary"
        ? "text-secondary-500 border border-secondary-500 bg-transparent hover:bg-secondary-200"
        : "text-primary border border-primary bg-transparent hover:bg-primary hover:text-white"
      : colorClassName;

  const computedClassName = `${baseClassName} ${themeClassName} ${
    className ?? ""
  }`;

  if (as === "a" && "href" in rest) {
    return (
      <a
        className={computedClassName}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  } else if (as === "link" && "href" in rest) {
    return (
      <Link
        className={computedClassName}
        href={(rest as ButtonAsLink).href}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={computedClassName}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
};

export default Button;
