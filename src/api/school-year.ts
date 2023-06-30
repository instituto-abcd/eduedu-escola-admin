import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, PaginationParams, QueryOptions } from "./api-types";

export type SchoolYear = {
  id: string;
  name: number;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
  updatedAt: string;
  summary: {
    totalSchoolClasses: number;
    totalStudents: number;
    totalTeachers: number;
    buttonEnabled: boolean;
  };
};

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
  static async getAll(params?: PaginationParams) {
    const { data } = await this.api.get<SchoolYear[]>(URL.ALL, { params });
    return data;
  }

  static async create() {
    const { data } = await this.api.post<SchoolYear>(URL.CREATE);
    return data;
  }

  static async activate(id: string) {
    const { data } = await this.api.put<{ success: boolean }>(URL.ACTIVATE, {
      id,
    });
    return data;
  }

  static async delete() {
    const { data } = await this.api.delete<{ success: boolean }>(URL.DELETE);

    return data;
  }
}

export function useSchoolYearGetAll(
  options?: QueryOptions<SchoolYear[], [typeof KEY.ALL]>
) {
  const handler = useCallback(
    function () {
      const params =
        options?.page || options?.pageSize
          ? {
              "page-number": options.page,
              "page-size": options.pageSize,
            }
          : undefined;

      return SchoolYearAPI.getAll(params);
    },
    [options?.page, options?.pageSize]
  );

  return useQuery([KEY.ALL], handler, options);
}

export function useSchoolYearCreate(
  options?: MutationOptions<void, SchoolYear>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function () {
    return SchoolYearAPI.create();
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.setQueryData<SchoolYear[]>([KEY.ALL], (old) => [
        data,
        ...(old ?? []),
      ]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useSchoolYearDelete(
  options?: MutationOptions<void, { success: boolean }>
) {
  const queryClient = useQueryClient();
  const handler = useCallback(function () {
    return SchoolYearAPI.delete();
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
  options?: MutationOptions<string, { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (id: string) {
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
