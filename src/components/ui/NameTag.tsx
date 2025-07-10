const NameTag = ({ name }: { name: string }) => {
  return (
    <div>
      <div className="px-2 py-1 text-[10px] text-[color:var(--color-black)] bg-[color:var(--color-muted)] w-auto rounded-sm">
        {name}
      </div>
    </div>
  );
};

export default NameTag;
