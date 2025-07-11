"use client";
import { logout } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess() {
      router.push("/");
    },
  });

  return (
    <button
      className=" w-full bg-[color:var(--color-white)] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold  cursor-pointer max-w-[700px] "
      style={{ boxShadow: "var(--shadow-common)" }}
      onClick={() => mutation.mutate()}
    >
      로그아웃
    </button>
  );
};
export default LogoutButton;
