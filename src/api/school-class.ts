import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, Paginated, QueryOptions } from "./api-types";
import { User } from "./user";
import { SchoolYear } from "./school-year";

export type SchoolGrade =
  | "CHILDREN"
  | "FIRST_GRADE"
  | "SECOND_GRADE"
  | "THIRD_GRADE";
export type SchoolPeriod = "MORNING" | "AFTERNOON" | "FULL";

type SchoolClass = {
  id: string;
  name: string;
  schoolGrade: SchoolGrade;
  schoolPeriod: SchoolPeriod;
  teachers: User[];
  schoolYear: SchoolYear;
};

export type SchoolClassInput = Pick<
  SchoolClass,
  "name" | "schoolGrade" | "schoolPeriod"
> & {
  schoolYearId: string;
  teacherIds: string[];
};

type SchoolClassSearch = {
  "page-number"?: number;
  "page-size"?: number;
  name?: string;
  schoolGrade?: string;
  schoolPeriod?: string;
  schoolYearId?: string;
  teacherIds?: any;
};

const KEY = {
  ALL: "SCHOOL_CLASS_ALL",
  BY_ID: "SCHOOL_CLASS_BY_ID",
} as const;

const URL = {
  ALL: "/schoolClass/all",
  CREATE: "/schoolClass",
  DELETE: "/schoolClass",
  GET: (id: string) => `/schoolClass/${id}`,
  UPDATE: (id: string) => `/schoolClass/${id}`,
  SHEET: "/schoolClass/students/spreadsheet-template",
  UPLOAD_SHEET: (id: string) => `/schoolClass/${id}/students/spreadsheet`,
};

export class SchoolClassAPI extends API {
  static async getAll(params?: SchoolClassSearch) {
    const { data } = await this.api.get<Paginated<SchoolClass>>(URL.ALL, {
      params,
    });
    return data;
  }

  static async create(input?: SchoolClassInput) {
    const { data } = await this.api.post<SchoolClass>(URL.CREATE, input);
    return data;
  }

  static async delete(schoolClassId: string[]) {
    const { data } = await this.api.delete<{ success: boolean }>(URL.DELETE, {
      data: { ids: schoolClassId },
    });

    return data;
  }

  static async get(id: string) {
    const { data } = await this.api.get<SchoolClass>(URL.GET(id));
    return data;
  }

  static async update(
    schoolClassId: string,
    input?: Partial<SchoolClassInput>
  ) {
    const { data } = await this.api.patch<SchoolClass>(
      URL.UPDATE(schoolClassId),
      input
    );
    return data;
  }

  static async uploadStudentsSheet(sheet: File, id: string) {
    const formData = new FormData();
    formData.append('file', sheet);

    const { data } = await this.api.post(URL.UPLOAD_SHEET(id), formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

    return data;
  }
}

export function useSchoolClassGetAll(
  options?: QueryOptions<
    Paginated<SchoolClass>,
    [string, SchoolClassSearch | undefined]
  > & { search?: SchoolClassSearch }
) {
  const handler = useCallback(
    function () {
      return SchoolClassAPI.getAll(options?.search);
    },
    [options?.search]
  );

  return useQuery([KEY.ALL, options?.search], handler, options);
}

export function useSchoolClassCreate(
  options?: MutationOptions<SchoolClassInput, SchoolClass>
) {
  const handler = useCallback(function (input: SchoolClassInput) {
    return SchoolClassAPI.create(input);
  }, []);

  return useMutation(handler, options);
}

export function useSchoolClassDelete(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return SchoolClassAPI.delete(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useGetSchoolClass(
  classId: string,
  options?: QueryOptions<SchoolClass, [typeof KEY.BY_ID, string]>
) {
  const handler = useCallback(
    function () {
      return SchoolClassAPI.get(classId);
    },
    [classId]
  );

  return useQuery([KEY.BY_ID, classId], handler, options);
}

export function useSchoolClassUpdate(
  options?: MutationOptions<
    { input: Partial<SchoolClassInput>; schoolClassId: string },
    SchoolClass
  >
) {
  const handler = useCallback(function (data: {
    schoolClassId: string;
    input: SchoolClassInput;
  }) {
    return SchoolClassAPI.update(data.schoolClassId, data.input);
  },
    []);

  return useMutation(handler, options);
}

export function sheetDownloadUrl() {
  return SchoolClassAPI.api.defaults.baseURL + URL.SHEET;
}