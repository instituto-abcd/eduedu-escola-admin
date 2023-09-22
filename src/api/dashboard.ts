import { useCallback } from "react";
import { API } from "./base";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { SchoolClass } from "./school-class";

const KEY = {
  ALL: 'DASHBOARD_ALL',
  REPORT_BY_SCHOOL_CLASS: 'REPORT_BY_SCHOOL_CLASS'
}

const URL = {
  ALL: (schoolYearId: string) => `/dashboard/${schoolYearId}`,
};

class DashboardAPI extends API {
  static async getBySchoolYear(schoolYearId: string) {
    const { data } = await this.api.get(URL.ALL(schoolYearId));
    return data;
  }
}

export function useGetBySchoolYear(
  schoolYear: string,
  options?: QueryOptions<SchoolClass, [typeof KEY.REPORT_BY_SCHOOL_CLASS, string]>
) {
  const handler = useCallback(
    function () {
      return DashboardAPI.getBySchoolYear(schoolYear);
    },
    [schoolYear]
  );

  return useQuery([KEY.ALL, schoolYear], handler, options);
}