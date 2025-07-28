"use client";

import WorkspaceBottomSheet from "@/components/feature/schedule/edit/workspace/WorkspaceBottomSheet";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import React, { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlusClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col ">
        <div className="hidden sm:block">
          <Header />
        </div>
        <HeaderTop
          fontColor="black"
          backward={true}
          icon="plus"
          clickPlusHandler={handlePlusClick}
        >
          워크스페이스 관리
        </HeaderTop>
        <div className="flex flex-col w-full min-h-screen relative pb-32 pt-25 sm:pt-40 max-w-[740px] mx-auto px-5">
          {children}
        </div>
      </div>
      <div className="block sm:hidden">
        <Footer />
      </div>
      {isOpen && <WorkspaceBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
export default Layout;
