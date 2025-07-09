interface BubbleProps {
  children: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
}

export const Bubble = ({
  children,
  size = "sm",
  className = "",
}: BubbleProps) => {
  const baseStyle =
    "text-center w-[280px] px-6 py-4 text-[color:var(--color-black)] bg-[color:var(--color-white)] rounded-lg ";
  const sizeStyles = {
    sm: "text-xs",
    lg: "text-base",
  };
  return (
    <div
      className="flex flex-col items-center drop-shadow-[0_8px_16px_rgba(27,33,44,0.12)] animate-bounce"
      // style={{ animationDuration: "100ms" }}
      // 개 촐싹버전
    >
      <div className={`${baseStyle} ${sizeStyles[size]} ${className}`}>
        {children}
      </div>
      <div className="w-0 h-0 border-t-[8px] border-t-[color:var(--color-white)] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent"></div>
    </div>
  );
};
