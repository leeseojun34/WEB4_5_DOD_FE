import StartVotePage from "@/components/election/StartVotePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 중간 장소 찾기",
  description: "이때어때 - 중간 장소 찾기",
};

const ElectionStart = () => {
  return <StartVotePage />;
};

export default ElectionStart;
