import Footer from "@/components/layout/Footer";
import HeaderTop from "@/components/layout/HeaderTop";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col ">
        <HeaderTop fontColor="black" backward={true} icon="plus">
          워크스페이스 관리
        </HeaderTop>
        <div className="px-5 pt-25">{children}</div>
      </div>

      <Footer />
    </>
  );
}
export default layout;
