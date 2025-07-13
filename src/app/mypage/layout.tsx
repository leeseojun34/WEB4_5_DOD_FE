import Footer from "@/components/layout/Footer";
import HeaderTop from "@/components/layout/HeaderTop";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-[var(--color-gray-background)]">
        <HeaderTop fontColor="black" backward={true}></HeaderTop>
        <div className="px-10 pt-[8vh]">{children}</div>
      </div>

      <Footer />
    </>
  );
}
export default layout;
