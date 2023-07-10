import { useCallback } from "react";
import { API } from "./base";
import { useQuery } from "@tanstack/react-query";

const KEY = {
  ALL: 'DASHBOARD_ALL'
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

export function useGetBySchoolYear(schoolYear: string
) {
  const handler = useCallback(
    function () {
      return DashboardAPI.getBySchoolYear(schoolYear);
    },
    [schoolYear]
  );

  return useQuery([KEY.ALL, schoolYear], handler);
}