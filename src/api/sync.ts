import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./api-types";

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

const URL = {
  SYNC_EXAM: "exam",
  SYNC_PLANETS: "planet-sync/sync-all",
};

const KEY = {
  EXAM: "EXAM",
  PLANETS: "PLANETS",
};

class SyncAPI extends API {

  static async syncExams() {
    const { data } = await this.api.get(URL.SYNC_EXAM);
    return data;
  }

  static async syncPlanets() {
    const { data } = await this.api.post(URL.SYNC_PLANETS);
    return data;
  }

}

export function useSyncExams(
  options?: QueryOptions<void, [typeof KEY.EXAM]>
) {  
  const handler = useCallback(function () {
    return SyncAPI.syncExams();
  }, []);

  return useQuery([KEY.EXAM], handler, options);
}

export function useSyncPlanets(
  options?: MutationOptions<void, void>
) {  
  const handler = useCallback(function () {
    return SyncAPI.syncPlanets();
  }, []);

  return useMutation(handler, options);
}
