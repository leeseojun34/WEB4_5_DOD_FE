const Tip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col px-5 py-4 gap-2 text-[#338aff] bg-[#f2f6fe] rounded-lg text-xs leading-[21px]">
      <p>이때, Tip</p>
      <p>{children}</p>
    </div>
  );
};
export default Tip;
