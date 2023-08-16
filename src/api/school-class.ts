import { useCallback } from "react";
import { API } from "./base";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, Paginated, QueryOptions } from "./api-types";
import { User } from "./user";
import { SchoolYear } from "./school-year";
import { Student } from "./student";

export type SchoolGrade =
  | "CHILDREN"
  | "FIRST_GRADE"
  | "SECOND_GRADE"
  | "THIRD_GRADE";
export type SchoolPeriod = "MORNING" | "AFTERNOON" | "FULL";

export type SchoolClass = {
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
  STUDENT_DESTINATION: "SCHOOL_CLASS_STUDENT_DESTINATION",
  STUDENT_BY_SCHOOLCLASS: "STUDENT_BY_SCHOOLCLASS"
} as const;

const URL = {
  ALL: "/schoolClass/all",
  CREATE: "/schoolClass",
  DELETE: "/schoolClass",
  GET: (id: string) => `/schoolClass/${id}`,
  UPDATE: (id: string) => `/schoolClass/${id}`,
  SHEET: "/schoolClass/students/spreadsheet-template",
  UPLOAD_SHEET: (id: string) => `/schoolClass/${id}/students/spreadsheet`,
  DESTINY_STUDENTS: (destinyID: string) => `/schoolClass/${destinyID}/students`,
  STUDENTS_BY_SCHOOLCLASS: (schoolClassId: string) => `/schoolClass/${schoolClassId}/students`
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

  static async studentsBySchoolclass(schoolClassId: string) {
    const { data } = await this.api.get(URL.STUDENTS_BY_SCHOOLCLASS(schoolClassId))
    return data
  }

  static async studentsDestiny(destinyID: string, form: { originId: string, studentIds: string[] }) {
    const { data } = await this.api.post(URL.DESTINY_STUDENTS(destinyID), form)
    return data
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

export function useStudentsBySchoolclass(
  schoolClassId: string,
  options?: QueryOptions<Array<Student>, [typeof KEY.STUDENT_BY_SCHOOLCLASS, string]>) {
  const handler = useCallback(
    function () {
      return SchoolClassAPI.studentsBySchoolclass(schoolClassId)
    },
    [schoolClassId]
  )

  return useQuery([KEY.STUDENT_BY_SCHOOLCLASS, schoolClassId], handler, options)
}

export function useStudentsDestiny(
  options?: MutationOptions<
    { destinationId: string; form: { originId: string, studentIds: string[] }; },
    {}
  >
) {

  const queryClient = new QueryClient()

  const handler = useCallback(function (data: {
    destinationId: string;
    form: { originId: string, studentIds: string[] };
  }) {
    return SchoolClassAPI.studentsDestiny(data.destinationId, data.form);
  },
    []);

  return useMutation(handler, {
    ...options,
    async onSuccess(data, variables, ctx) {
      await queryClient.invalidateQueries([KEY.STUDENT_BY_SCHOOLCLASS, KEY.STUDENT_DESTINATION])
      options?.onSuccess?.(data, variables, ctx)
    }
  });
}