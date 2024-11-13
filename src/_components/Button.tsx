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
  theme?: "reverse";
} & (ButtonAsButton | ButtonAsAnchor | ButtonAsLink);

const Button = ({
  children,
  className,
  as = "button",
  theme,
  ...rest
}: ButtonProps) => {
  const defaultClassName =
    "w-full flex items-center gap-3 justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold text-white bg-primary text-center hover:bg-primaryHover hover:shadow-lg duration-200 ease-in";

  const reverseClassName =
    "w-full flex items-center gap-3 justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold text-primary border border-primary text-center hover:shadow-lg duration-200 ease-in";

  const computedClassName =
    className ?? (theme === "reverse" ? reverseClassName : defaultClassName);

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
