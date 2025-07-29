import Toast from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UserType {
  email: string;
  id: string;
  name: string;
  profileImageNumber: number;
  provider: string;
  role: string;
}

export const useAuthRedirect = (
  user: UserType,
  userPending: boolean,
  redirectUrl: string,
  fromInvite: boolean
) => {
  const router = useRouter();

  useEffect(() => {
    if (!user && !userPending) {
      if (fromInvite) {
        localStorage.setItem("redirect", redirectUrl);
      }
      Toast("로그인 후 이용해주세요");
      router.push(`/auth/login`);
    }
  }, [user, userPending, router, redirectUrl, fromInvite]);
};
