import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  MutationOptions,
  Paginated,
  PaginationParams,
  QueryOptions,
} from "./api-types";
import { API } from "./base";
import { SchoolGrade, SchoolPeriod } from "./school-class";
import { UserStatus } from "~/constants";

type Student = {
  id: string;
  name: string;
  registry: string;
  schoolClassId: string;
  schoolClassName: string;
  schoolPeriod: SchoolPeriod;
  schoolGrade: SchoolGrade;
  cfo?: string;
  sea?: string;
  lct?: string;
  status: UserStatus;
};

type StudentSearch = {
  name?: string;
  schoolClassName?: string;
  schoolPeriod?: SchoolPeriod;
  schoolGrade?: SchoolGrade;
  cfo?: string;
  sea?: string;
  lct?: string;
  status?: UserStatus;
} & PaginationParams;

export type StudentInput = Pick<Student, "name" | "registry" | "schoolClassId">;

const URL = {
  ALL: "/student/all",
  BASE: "/student",
};

const KEY = {
  ALL: "STUDENT_ALL",
  BY_ID: "STUDENT_BY_ID",
};

class StudentAPI extends API {
  static async getAll(params?: StudentSearch) {
    const { data } = await this.api.get<Paginated<Student>>(URL.ALL, {
      params,
    });

    return data;
  }

  static async create(input: StudentInput) {
    const { data } = await this.api.post<Student>(URL.BASE, input);

    return data;
  }

  static async delete(ids: string[]) {
    const { data } = await this.api.delete<{ success: boolean }>(URL.BASE, {
      data: { ids },
    });

    return data;
  }

  static async getOne(id: string) {
    const { data } = await this.api.get<Student>(`${URL.BASE}/${id}`);

    return data;
  }

  static async update(id: string, input: StudentInput) {
    const { data } = await this.api.patch<Student>(`${URL.BASE}/${id}`, input);

    return data;
  }
}

export function useStudentGetAll(
  options?: QueryOptions<
    Paginated<Student>,
    [typeof KEY.ALL, StudentSearch | undefined]
  > & {
    search?: StudentSearch;
  }
) {
  const handler = useCallback(
    function () {
      return StudentAPI.getAll(options?.search);
    },
    [options?.search]
  );

  return useQuery([KEY.ALL, options?.search], handler, options);
}

export function useStudentCreate(
  options?: MutationOptions<StudentInput, Student>
) {
  const handler = useCallback(function (input: StudentInput) {
    return StudentAPI.create(input);
  }, []);

  return useMutation(handler, options);
}

export function useStudentDelete(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return StudentAPI.delete(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useStudentGetOne(
  id: string,
  options?: QueryOptions<Student, [typeof KEY.BY_ID, string]>
) {
  const handler = useCallback(
    function () {
      return StudentAPI.getOne(id);
    },
    [id]
  );

  return useQuery([KEY.BY_ID, id], handler, options);
}

export function useStudentUpdate(
  options?: MutationOptions<{ input: StudentInput; id: string }, Student>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (data: {
    input: StudentInput;
    id: string;
  }) {
    return StudentAPI.update(data.id, data.input);
  },
  []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}
