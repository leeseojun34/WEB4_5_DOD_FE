import Image from "next/image";
import loadingImage from "@/assets/images/rabbit_walking_through.gif";

const GlobalLoading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[var(--color-gray-background)]">
      <Image src={loadingImage} alt="loading" className="object-contain" />
    </div>
  );
};

export default GlobalLoading;
