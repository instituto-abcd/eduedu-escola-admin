import { useCallback } from "react";
import { API } from "./base";
import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "./api-types";
import { useUserStore } from "~/stores/user";
import { decodeJwt } from "~/utils/decodeJwt";
import { z } from "zod";

export type UserLogin = Pick<UserAuth, "email" | "password">;
export type RequestPasswordResetInput = Pick<UserAuth, "email">;
export type UserChangePassword = Pick<
  UserAuth,
  "token" | "password" | "passwordConfirmation"
>;

type UserAuth = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  token?: string;
};

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  document: string;
  accessToken: string;
};

const URL = {
  AUTH: "/auth",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

class AuthAPI extends API {
  static async login(input?: UserLogin) {
    const { data } = await this.api.post<LoginResponse>(URL.AUTH, input);
    return data;
  }

  static async requestPasswordReset(input?: RequestPasswordResetInput) {
    const { data } = await this.api.post(URL.RESET_PASSWORD, input);
    return data;
  }

  static async changePassword(params?: UserChangePassword) {
    const { data } = await this.api.post(URL.CHANGE_PASSWORD, params);
    return data;
  }
}

export function useAuthLogin(
  options?: MutationOptions<UserLogin, LoginResponse>
) {
  const handler = useCallback(function (data: UserLogin) {
    return AuthAPI.login(data);
  }, []);

  return useMutation(handler, {
    ...options,

    onSuccess: (data, vars, ctx) => {
      const tokenValidation = z.object({
        email: z.string().email(),
        profile: z.enum(["DIRECTOR", "TEACHER"]),
        iat: z.number(),
      });

      const token = decodeJwt(data.accessToken) as z.infer<
        typeof tokenValidation
      >;

      tokenValidation.parse(token);

      useUserStore.setState({ ...data, profile: token.profile });
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useRequestPasswordReset(
  options?: MutationOptions<RequestPasswordResetInput, UserAuth>
) {
  const handler = useCallback(function (data: RequestPasswordResetInput) {
    return AuthAPI.requestPasswordReset(data);
  }, []);

  return useMutation(handler, options);
}

export function useUserChangePassword(
  options?: MutationOptions<UserChangePassword, UserAuth>
) {
  const handler = useCallback(function (data: UserChangePassword) {
    return AuthAPI.changePassword(data);
  }, []);

  return useMutation(handler, options);
}
