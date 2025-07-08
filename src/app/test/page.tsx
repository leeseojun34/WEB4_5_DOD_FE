import { Bubble } from "@/components/ui/Bubble";

export default function page() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Bubble size="lg">
        대나무 행주 모임이
        <br />
        생성되었습니다 🎉
      </Bubble>
    </div>
  );
}
