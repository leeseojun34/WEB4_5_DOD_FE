"use client";

import CoordinateContent from "@/components/feature/meeting/coordinate/CoordinateContent";
import GroupHeader from "@/components/layout/GroupHeader";

const CoordinatePage = () => {
  
  return (
    <div className="min-w-[375px] w-full max-w-185 mx-auto relative">
      <div>
        <GroupHeader
          groupName="박준규 팬미팅"
          groupIntroduction="박준규 팬미팅에 오신 것을 환영합니다"
          groupCount={6000}
          clickToInvite={() => console.log("초대함")}
        />
      </div>
      <CoordinateContent />
    </div>
  );
};

export default CoordinatePage;
