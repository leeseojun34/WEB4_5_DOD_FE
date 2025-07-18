import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  resetUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
