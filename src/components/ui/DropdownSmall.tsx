import { useState } from "react";

const DropdownSmall = ({
  children,
  topClickHandler,
  bottomClickHandler,
}: {
  children?: [React.ReactNode, React.ReactNode];
  topClickHandler: () => void;
  bottomClickHandler: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [topChild, bottomChild] = children ?? [];

  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className="min-w-[92px] relative z-10">
          <div
            className="w-full flex flex-col items-center bg-[color:var(--color-white)] text-[var(--color-black)] px-5 py-2  rounded-lg gap-4 text-xs font-semibold"
            onClick={() => setIsOpen(false)}>
            <div
              className="hover:text-[var(--color-primary-400)] cursor-pointer"
              onClick={topClickHandler}>
              {topChild}
            </div>
            <div
              className="hover:text-[var(--color-primary-400)] cursor-pointer"
              onClick={bottomClickHandler}>
              {bottomChild}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DropdownSmall;
