import { Bubble } from "@/components/ui/Bubble";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[color:var(--color-primary-100)]">
      <div>
        <Bubble size="sm">복잡한 일정 조율, 한 번에 끝내세요🔥</Bubble>
      </div>
    </div>
  );
}
