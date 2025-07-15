"use client";

import CoordinateContent from "@/components/feature/meeting/coordinate/CoordinateContent";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";

const CoordinatePage = () => {
  return (
    <section>
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        groupName="박준규 팬미팅"
        groupIntroduction="박준규 팬미팅에 오신 것을 환영합니다"
        groupCount={6000}
        clickToInvite={() => console.log("초대함")}
      />
      <div className="min-w-[375px] w-full max-w-185 mx-auto relative">
        <CoordinateContent />
      </div>
    </section>
  );
};

export default CoordinatePage;
