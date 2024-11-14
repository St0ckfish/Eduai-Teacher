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
} & (ButtonAsButton | ButtonAsAnchor | ButtonAsLink);

/**
 * A versatile Button component that can render as a <button>, <a> or a Link.
 * 
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {("button" | "a" | "link")} [props.as="button"] - The HTML element type to render.
 * @param {("outline")} [props.theme] - The theme variant of the button ("outline").
 * @param {object} [props.rest] - Additional HTML attributes to spread on the rendered element.
 * 
 * @returns {JSX.Element} The rendered button, anchor, or link element.
 */

const Button = ({
  children,
  className,
  as = "button",
  theme,
  ...rest
}: ButtonProps) => {
  const baseClassName =
  "w-full flex items-center gap-3 justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold text-center hover:shadow-lg duration-200 ease-in";

  const defaultClassName = `${baseClassName} text-white bg-primary hover:bg-primaryHover`;

  const outlineClassName = `${baseClassName} text-primary border border-primary`;

  const computedClassName =
    className ?? (theme === "outline" ? outlineClassName : defaultClassName);

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
