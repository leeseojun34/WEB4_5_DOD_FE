import { useEffect, useRef, useState } from "react";

type DropdownSmallProps = {
  children?: [React.ReactNode, React.ReactNode];
  topClickHandler: () => void;
  bottomClickHandler: () => void;
};

const DropdownSmall = ({
  children,
  topClickHandler,
  bottomClickHandler,
}: DropdownSmallProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [topChild, bottomChild] = children ?? [];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const topToggleHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    topClickHandler();
    console.log("첫번째 메뉴 클릭");
    setIsOpen(false);
  };
  const bottomToggleHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    bottomClickHandler();
    console.log("첫번째 메뉴 클릭");
    setIsOpen(false);
  };
  console.log(children);
  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div ref={menuRef} className="w-fit relative z-10">
          <div className="min-w-[92px] flex flex-col  bg-[color:var(--color-white)] text-[var(--color-black)] px-5 py-2  rounded-lg gap-4 text-xs font-semibold shadow-[box-shadow:var(--shadow-common)]">
            <div
              className="w-full text-center hover:text-[var(--color-primary-400)] cursor-pointer"
              onClick={topToggleHandler}>
              {topChild}
            </div>
            <div
              className="w-full text-center hover:text-[var(--color-primary-400)] cursor-pointer"
              onClick={bottomToggleHandler}>
              {bottomChild}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DropdownSmall;
