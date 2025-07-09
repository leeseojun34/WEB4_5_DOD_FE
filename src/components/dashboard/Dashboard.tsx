import { Banner } from "./Banner";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex justify-center bg-[color:var(--color-gray-background)]">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <Banner />
        <div className="rounded-[20px] bg-[color:var(--color-white)] w-[335px] h-[146px]"></div>
      </div>
    </div>
  );
};
export default Dashboard;
