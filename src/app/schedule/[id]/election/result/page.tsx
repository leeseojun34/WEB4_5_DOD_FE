import ShowMiddleLocationPage from "@/components/election/ShowMiddleLocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 중간 장소 투표 결과",
  description: "이때어때 - 중간 장소 투표 결과",
};

const ElectionResult = () => {
  return <ShowMiddleLocationPage />;
};

export default ElectionResult;
