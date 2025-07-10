import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  state?: "default" | "disabled";
}

export const Button = ({
  children,
  state = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "w-full h-11 rounded-lg text-sm  transition duration-300 max-w-[700px]";

  const stateStyles = {
    default:
      "bg-[color:var(--color-primary-400)] text-[color:var(--color-white)] transition-colors hover:scale-101 hover:bg-[var(--color-primary-400-hover)] transition duraiton-300 cursor-pointer",
    disabled:
      "bg-[color:var(--color-gray-border)] text-[color:var(--color-gray-placeholder)] cursor-not-allowed",
  };
  return (
    <button
      className={`${baseStyle} ${stateStyles[state]} ${className}`}
      disabled={state === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
};
