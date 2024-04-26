import { useCallback } from "react";
import { API } from "./base";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions } from "./api-types";
import type { SchoolGrade } from "./school-class";

export type SchoolClassReport = {
  id: string;
  name: string;
  studentsCounter: number;
  examPerformance: {
    percentage: number;
    axis: "ES" | "LS" | "EA";
    color: string;
  }[];
  planetPerformance: {
    percentage: number;
    axis: "ES" | "LS" | "EA";
  }[];
};

export type SchoolGradeResponse = {
  id: string;
  name: SchoolGrade;
  teachersCounter: number;
  schoolClassesCounter: number;
  studentsCounter: number;
  schoolClasses: SchoolClassReport[];
};

export type DashboardResponse = {
  schoolYear: number;
  teachersCounter: number;
  schoolClassesCounter: number;
  studentsCounter: number;
  schoolGrades: SchoolGradeResponse[];
};

const KEY = {
  ALL: "DASHBOARD_ALL",
  REPORT_BY_SCHOOL_CLASS: "REPORT_BY_SCHOOL_CLASS",
};

const URL = {
  ALL: (schoolYearId: string) => `/dashboard/${schoolYearId}`,
};

class DashboardAPI extends API {
  static async getBySchoolYear(schoolYearId: string) {
    const { data } = await this.api.get<DashboardResponse>(
      URL.ALL(schoolYearId),
    );
    return data;
  }
}

export function useGetDashboard(
  schoolYear: string,
  options?: QueryOptions<
    DashboardResponse,
    [typeof KEY.REPORT_BY_SCHOOL_CLASS, string]
  >,
) {
  const handler = useCallback(
    function() {
      return DashboardAPI.getBySchoolYear(schoolYear);
    },
    [schoolYear],
  );

  return useQuery([KEY.ALL, schoolYear], handler, options);
}