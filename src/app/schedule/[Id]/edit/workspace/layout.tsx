"use client";

import WorkspaceBottomSheet from "@/components/feature/schedule/edit/workspace/WorkspaceBottomSheet";
import Footer from "@/components/layout/Footer";
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
        <HeaderTop
          fontColor="black"
          backward={true}
          icon="plus"
          clickPlusHandler={handlePlusClick}
        >
          워크스페이스 관리
        </HeaderTop>
        <div className="px-5 pt-25">{children}</div>
      </div>
      <Footer />
      {isOpen && <WorkspaceBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
export default Layout;
