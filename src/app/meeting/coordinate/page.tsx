"use client";

import CoordinateContent from "@/components/feature/meeting/coordinate/CoordinateContent";
import GroupHeader from "@/components/layout/GroupHeader";

const CoordinatePage = () => {
  return (
    <div className="min-w-[375px] w-full max-w-185 mx-auto relative">
      <div>
        <GroupHeader />
      </div>
      <CoordinateContent />
    </div>
  );
};

export default CoordinatePage;
