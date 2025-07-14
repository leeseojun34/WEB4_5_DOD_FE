interface OptionBoxProps {
  isSelected: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  isPointer?: boolean;
}

export const OptionBox = ({
  isSelected,
  onClick,
  children,

  isPointer = true,
}: OptionBoxProps) => {
  const baseStyle = `
    flex flex-col items-center p-4 gap-2 w-full h-auto rounded-lg border
    ${isPointer ? "cursor-pointer" : "cursor-default"}
    hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-100)] transition duration-300
  `;
  const selectedStyle = isSelected
    ? "border-[color:var(--color-primary-400)] bg-[color:var(--color-primary-100)]"
    : "border-black/10 text-[color:var(--color-gray)]";
  return (
    <div className={`${baseStyle} ${selectedStyle}`} onClick={onClick}>
      {children}
    </div>
  );
};
