import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./api-types";
import { User, UserInput } from "./user";
import { LoginResponse } from "./auth";
import { useUserStore } from "~/stores/user";
import { decodeJwt } from "~/utils/decodeJwt";
import { z } from "zod";

type Settings = {
  id: string;
  schoolName?: string;
  synchronizationPlanets: boolean;
  smtpHostName: string;
  smtpUserName: string;
  smtpPassword: string;
  smtpPort: string;
  sslIsActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
};

export type SettingsUpdateInput = Omit<
  Settings,
  "id" | "createdAt" | "updatedAt" | "schoolId"
>;

type SettingsStatus = {
  completedSchoolSetup: boolean;
  completedOwnerSetup: boolean;
};

const URL = {
  BASE: "system-configuration",
  STATUS: "system-configuration/status",
  OWNER: "system-configuration/owner",
  SCHOOL_NAME: "system-configuration/school/name",
};

const KEY = {
  BASE: "SYSTEM_CONFIGURATION",
  STATUS: "SYSTEM_CONFIGURATION_STATUS",
};

class SettingsAPI extends API {
  static async get() {
    const { data } = await this.api.get<Settings>(URL.BASE);
    return data;
  }

  static async update(input: SettingsUpdateInput) {
    const { data } = await this.api.put<Settings>(URL.BASE, input);

    return data;
  }

  static async getStatus() {
    const { data } = await this.api.get<SettingsStatus>(URL.STATUS);
    return data;
  }

  static async createOwner(input: UserInput) {
    const { data } = await this.api.post<LoginResponse>(URL.OWNER, input);
    return data;
  }

  static async updateSchoolName(schoolName: string) {
    const { data } = await this.api.put<Settings>(URL.SCHOOL_NAME, {
      schoolName,
    });
    return data;
  }
}

export function useSettingsGet(
  options?: QueryOptions<Settings, [typeof KEY.BASE]>
) {
  const handler = useCallback(function () {
    return SettingsAPI.get();
  }, []);

  return useQuery([KEY.BASE], handler, options);
}

export function useSettingsUpdate(
  options?: MutationOptions<SettingsUpdateInput, Settings>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (input: SettingsUpdateInput) {
    return SettingsAPI.update(input);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      queryClient.setQueryData([KEY.BASE], data);
      await queryClient.invalidateQueries([KEY.STATUS]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useSettingsGetStatus(
  options?: QueryOptions<SettingsStatus, [typeof KEY.STATUS]>
) {
  const handler = useCallback(function () {
    return SettingsAPI.getStatus();
  }, []);

  return useQuery([KEY.STATUS], handler, options);
}

export function useSettingsCreateOwner(
  options?: MutationOptions<UserInput, LoginResponse>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (input: UserInput) {
    return SettingsAPI.createOwner(input);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.STATUS]);
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
