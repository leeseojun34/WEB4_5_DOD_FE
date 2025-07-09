interface OptionBoxProps {
  isSelected: boolean;
  children: React.ReactNode;
}

export const OptionBox = ({ isSelected, children }: OptionBoxProps) => {
  const baseStyle =
    "flex flex-col items-center p-4 gap-2 w-full h-auto rounded-lg border cursor-pointer hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-100)] transition duration-300";
  const selectedStyle = isSelected
    ? "border-[color:var(--color-primary-400)] bg-[color:var(--color-primary-100)]"
    : "border-black/10 text-[color:var(--color-gray)]";
  return <div className={`${baseStyle} ${selectedStyle}`}>{children}</div>;
};
