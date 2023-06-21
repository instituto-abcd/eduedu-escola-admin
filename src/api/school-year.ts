import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions } from "./api-types";

export type SchoolYear = {
  id: string;
  name: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type SchoolYearInput = Pick<SchoolYear, "name" | "status">;

const KEY = {
  ALL: "SCHOOL_YEAR_ALL",
};

const URL = {
  ALL: "/school-year/all",
  CREATE: "/school-year",
  DELETE: "/school-year",
  ACTIVATE: "/school-year/activate",
};

class SchoolYearAPI extends API {
  static async getAll() {
    const { data } = await this.api.get<SchoolYear>(URL.ALL);
    return data;
  }

  static async create(input?: SchoolYearInput) {
    const { data } = await this.api.post<SchoolYear>(URL.CREATE, input);
    return data;
  }

  static async activate(itemId: string[]) {
    const { data } = await this.api.put<{ success: boolean }>(URL.ACTIVATE, {
      id: itemId,
    });
    return data;
  }

  static async delete(itemIds: string[]) {
    const { data } = await this.api.delete<{ success: boolean }>(URL.DELETE, {
      data: { ids: itemIds },
    });

    return data;
  }
}

export function useSchoolYearGetAll() {
  const handler = useCallback(
    function () {
      return SchoolYearAPI.getAll();
    },
    []
  );

  return useQuery([KEY.ALL], handler);
}

export function useSchoolYearCreate(options?: MutationOptions<SchoolYearInput, SchoolYear>) {
  const handler = useCallback(function () {
    return SchoolYearAPI.create();
  }, []);

  return useMutation(handler, options);
}

export function useSchoolYearDelete(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return SchoolYearAPI.delete(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useSchoolYearActivate(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (id: string[]) {
    return SchoolYearAPI.activate(id);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}
