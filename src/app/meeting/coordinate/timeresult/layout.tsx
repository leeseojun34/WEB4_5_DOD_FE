import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  min-h-screen relative pb-32 pt-8 max-w-[740px] mx-auto overflow-hidden px-5">
      <div className="hidden sm:block">
        <Header />
      </div>

      <HeaderTop />
      {children}
      <div className="block sm:hidden">
        <Footer />
      </div>
    </div>
  );
}
