import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./api-types";

// type Settings = {
//   id: string;
//   schoolName?: string;
//   synchronizationPlanets: boolean;
//   smtpHostName: string;
//   smtpUserName: string;
//   smtpPassword: string;
//   smtpPort: string;
//   sslIsActive: boolean;
//   schoolId: string;
//   createdAt: string;
//   updatedAt: string;
// };

type SyncStatus = {
  totalFiles: number;
  syncedFiles: number;
  percent: number;
  duration: string;
};

const URL = {
  SYNC_EXAM: "exam",
  SYNC_PLANETS: "planet-sync/sync-all",
  SYNC_STATUS: "planet-sync/sync-status",
};

const KEY = {
  EXAM: "EXAM",
  PLANETS: "PLANETS",
  SYNCSTATUS: "SYNC_STATUS",
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

  static async getSyncStatus() {
    const { data } = await this.api.get<SyncStatus>(URL.SYNC_STATUS);
    return data;
  }
}

export function useSyncExams(options?: QueryOptions<void, [typeof KEY.EXAM]>) {
  const handler = useCallback(function () {
    return SyncAPI.syncExams();
  }, []);

  return useQuery([KEY.EXAM], handler, options);
}

export function useSyncPlanets(options?: MutationOptions<void, void>) {
  const handler = useCallback(function () {
    return SyncAPI.syncPlanets();
  }, []);

  return useMutation(handler, options);
}

export function useSyncStatus(
  options?: QueryOptions<SyncStatus, [typeof KEY.SYNCSTATUS]>
) {
  const handler = useCallback(function () {
    return SyncAPI.getSyncStatus();
  }, []);

  return useQuery([KEY.PLANETS], handler, options);
}
