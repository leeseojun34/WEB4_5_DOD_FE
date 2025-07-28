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
  redirectUrl: string
) => {
  const router = useRouter();

  useEffect(() => {
    if (!user && !userPending) {
      localStorage.setItem("redirect", redirectUrl);
      router.push(`/auth/login`);
    }
  }, [user, userPending, router, redirectUrl]);
};
