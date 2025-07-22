import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BlurredChevronHeader = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between pt-11 min-h-7 bg-transparent fixed top-0 sm:top-10 left-1/2  -translate-x-1/2  z-10 max-w-[1024px] px-5 sm:px-10 md:px-20">
      <span
        onClick={() => router.back()}
        className="cursor-pointer bg-white/20 backdrop-blur-xs p-2 rounded-full shadow-md transition hover:bg-white/80"
      >
        <ChevronLeft size={20} />
      </span>
    </div>
  );
};
export default BlurredChevronHeader;
