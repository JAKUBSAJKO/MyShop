import { MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type ButtonVariant = "default" | "border";

export default function Button({ title, variant, onClick }: ButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={variant === "default" ? "" : "button-border"}
    >
      {title}
    </button>
  );
}
