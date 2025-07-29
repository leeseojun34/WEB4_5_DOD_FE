const GlobalLoading = () => {
  return (
    <div className="bg-[color:var(--color-white)] w-full min-h-screen justify-center items-center flex flex-col">
      <video autoPlay loop muted playsInline className="w-50 h-50">
        <source src="/loading.mp4" />
      </video>
      <div className="font-[TTTogether] text-black">...LOADING</div>
    </div>
  );
};

export default GlobalLoading;
