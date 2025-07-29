import CreateDepartLocationPage from "@/components/election/CreateDepartLocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 출발 장소 등록",
  description: "이때어때 - 출발 장소 등록",
};

const StartPoint = () => {
  return <CreateDepartLocationPage />;
};

export default StartPoint;
