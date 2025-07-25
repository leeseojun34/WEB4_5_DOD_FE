const MyButton = ({
  children,
  buttonClickHandler,
}: {
  children: string;
  buttonClickHandler?: () => void;
}) => {
  return (
    <span
      onClick={buttonClickHandler}
      className="text-xs font-medium cursor-pointer bg-[var(--color-gray-background)] text-[var(--color-gray)] hover:text-[var(--color-primary-400)] border-0 rounded-md px-3 py-2">
      {children}
    </span>
  );
};
export default MyButton;
