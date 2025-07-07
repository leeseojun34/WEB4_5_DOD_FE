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
  const baseStyle = "w-full h-[50px] rounded-lg text-sm";

  const stateStyles = {
    default: "bg-black text-white",
    disabled: "bg-white text-black",
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
