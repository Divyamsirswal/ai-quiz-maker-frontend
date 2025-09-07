import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type AuthState = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: string) => set({ token }),
            logout: () => set({ token: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);