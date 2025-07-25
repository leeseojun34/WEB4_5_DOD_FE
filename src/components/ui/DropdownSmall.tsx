import { useEffect, useRef } from "react";

type DropdownSmallProps = {
  children?: React.ReactNode | [React.ReactNode, React.ReactNode];
  isOpen: boolean;
  onClose: () => void;
  onTopClick: () => void;
  onBottomClick?: () => void;
};

const DropdownSmall = ({
  children,
  isOpen,
  onClose,
  onTopClick,
  onBottomClick,
}: DropdownSmallProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const topChild = Array.isArray(children) ? children[0] : null;
  const bottomChild = Array.isArray(children) ? children[1] : children;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div ref={menuRef} className="w-fit relative z-10">
          <div className="min-w-[92px] flex flex-col  bg-[color:var(--color-white)] text-[var(--color-black)] px-5 py-2  rounded-lg gap-4 text-xs font-medium shadow-[box-shadow:var(--shadow-common)]">
            {topChild && (
              <div
                className={`w-full text-center cursor-pointer hover:font-semibold ${
                  !bottomChild && "text-[var(--color-black)]"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTopClick();
                  onClose();
                }}
              >
                {topChild}
              </div>
            )}
            {bottomChild && onBottomClick && (
              <div
                className="w-full text-center text-[var(--color-red)] cursor-pointer hover:font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  onBottomClick();
                  onClose();
                }}
              >
                {bottomChild}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default DropdownSmall;
