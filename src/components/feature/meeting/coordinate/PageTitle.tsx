interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle = ({ children, className = "" }: PageTitleProps) => {
  return (
    <div className={`font-semibold text-[color:var(--color-black)] text-xl text-start w-full ${className}`}>
      {children}
    </div>
  );
};

export default PageTitle;