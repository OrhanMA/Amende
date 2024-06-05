import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  text,
  children,
  iconSide = "left",
  className,
  type = "button",
  disabled = false,
  onClick,
  variant = "primary",
  ariaDisabled,
}: {
  text?: string;
  children?: ReactNode;
  iconSide?: "left" | "right";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (event: any) => void;
  variant?: "primary" | "secondary";
  ariaDisabled?: boolean;
}) {
  let variantClasses = "";
  const primary = "bg-ultramarine-950 text-sand-50";
  const secondary =
    "text-ultramarine-950 bg-sand-50 border border-ultramarine-800";

  switch (variant) {
    case "primary":
      variantClasses = primary;
      break;
    case "secondary":
      variantClasses = secondary;
      break;
    default:
      variantClasses = primary;
      break;
  }
  return (
    <button
      aria-disabled={ariaDisabled}
      disabled={disabled}
      type={type}
      className={twMerge(
        `hover:cursor-pointer p-2 text-ultramarine-950 flex items-center justify-center gap-2 sm:gap-3 ${variantClasses}`,
        className
      )}
    >
      {iconSide === "left" && children && <span>{children}</span>}
      {text && <span>{text}</span>}
      {iconSide === "right" && children && <span>{children}</span>}
    </button>
  );
}
