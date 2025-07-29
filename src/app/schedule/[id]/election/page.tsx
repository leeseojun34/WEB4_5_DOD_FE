import VoteMiddleLocationPage from "@/components/election/VoteMiddleLocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 중간 장소 투표",
  description: "이때어때 - 중간 장소 투표",
};

const ElectionSpot = () => {
  return <VoteMiddleLocationPage />;
};

export default ElectionSpot;
