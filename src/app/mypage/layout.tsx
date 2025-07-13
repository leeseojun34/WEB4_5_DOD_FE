import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-[var(--color-gray-background)]">
        <div className="hidden lg:flex">
          <Header />
        </div>
        <HeaderTop fontColor="black" backward={true}></HeaderTop>

        <div className="w-full px-10 pt-[8vh] max-w-[740px] mx-auto">
          {children}
        </div>
      </div>
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
}
export default layout;
