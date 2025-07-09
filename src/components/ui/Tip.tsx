const Tip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col px-5 py-4 gap-2 text-[color:var(--color-primary-400)] bg-[color:var(--color-primary-100)] rounded-lg text-xs leading-5">
      <p className="font-medium">이때, Tip</p>
      <p className="font-normal">{children}</p>
    </div>
  );
};
export default Tip;
