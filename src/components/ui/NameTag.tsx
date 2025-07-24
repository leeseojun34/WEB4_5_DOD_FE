const NameTag = ({ name, isFuture }: { name: string; isFuture: boolean }) => {
  return (
    <div>
      <div
        className={`px-2 py-[2px] text-[10px] ${
          isFuture
            ? "text-[color:var(--color-black)]"
            : "text-[color:var(--color-gray-placeholder)]"
        } bg-[color:var(--color-muted)] w-auto rounded-sm`}
      >
        {name}
      </div>
    </div>
  );
};

export default NameTag;
