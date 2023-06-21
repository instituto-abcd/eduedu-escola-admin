import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponse } from "../api/auth";
import { UserProfile } from "~/constants";

type UserStore = LoginResponse & {
  profile: UserProfile;
  isUserAuthenticated: () => boolean;
};

export const useUserStore = create<UserStore>()(
  persist(
    (_, get) => ({
      accessToken: "",
      document: "",
      email: "",
      id: "",
      name: "",
      profile: "" as UserProfile,
      isUserAuthenticated: () => Boolean(get().accessToken),
    }),
    {
      name: "user_state",
    }
  )
);
