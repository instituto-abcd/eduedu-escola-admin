import { useCallback } from "react";
import { API } from "./base";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { QueryOptions } from "./api-types";
import { errorNotification } from "~/utils/errorNotification";
import { usePlanetSync, useExamSync } from "~/stores/filter";

export type SyncStatus = {
  totalFiles: number;
  syncedFiles: number;
  totalPlanets?: number;
  syncedPlanets?: number;
  percent: number;
  duration: string;
  running: boolean;
  currentOperation: string;
};

export type LastSyncResponse = {
  syncedAt: Date;
  daysSinceLastSync: number | null;
  showReminder: boolean;
};

type SyncPlanetResponse = {
  success: boolean;
  planetsSynced: number;
  planetsUpdated: number;
};

type SyncExamResponse = {
  success: boolean;
  examsSynced: number;
  examsUpdated: number;
};

const URL = {
  // Planet sync endpoints
  SYNC_PLANETS: "planet-sync/sync",
  PLANET_SYNC_STATUS: "planet-sync/sync-status",
  PLANET_LAST_SYNC: "planet-sync/last-sync",
  // Exam sync endpoints
  SYNC_EXAMS: "exam/sync",
  EXAM_SYNC_STATUS: "exam/sync-status",
  EXAM_LAST_SYNC: "exam/last-sync",
};

const KEY = {
  PLANETS: "PLANETS",
  EXAMS: "EXAMS",
  PLANET_SYNC_STATUS: "PLANET_SYNC_STATUS",
  EXAM_SYNC_STATUS: "EXAM_SYNC_STATUS",
  PLANET_LAST_SYNC: "PLANET_LAST_SYNC",
  EXAM_LAST_SYNC: "EXAM_LAST_SYNC",
};

class SyncAPI extends API {
  // Planet sync
  static async syncPlanets() {
    const { data } = await this.api.post<SyncPlanetResponse>(URL.SYNC_PLANETS);
    return data;
  }

  static async getPlanetSyncStatus() {
    const { data } = await this.api.get<SyncStatus>(URL.PLANET_SYNC_STATUS);
    return data;
  }

  static async getPlanetLastSync() {
    const { data } = await this.api.get<LastSyncResponse>(URL.PLANET_LAST_SYNC);
    return data;
  }

  // Exam sync
  static async syncExams() {
    const { data } = await this.api.post<SyncExamResponse>(URL.SYNC_EXAMS);
    return data;
  }

  static async getExamSyncStatus() {
    const { data } = await this.api.get<SyncStatus>(URL.EXAM_SYNC_STATUS);
    return data;
  }

  static async getExamLastSync() {
    const { data } = await this.api.get<LastSyncResponse>(URL.EXAM_LAST_SYNC);
    return data;
  }
}

// Planet sync hooks
export function useSyncPlanets(options?: UseMutationOptions) {
  const { refetch: refetchSync } = usePlanetSyncStatus({ enabled: false });
  const { update } = usePlanetSync();

  return useMutation({
    mutationFn: async () => {
      await SyncAPI.syncPlanets();
    },
    onSuccess: async () => {
      await refetchSync();
    },
    onError: () => {
      errorNotification(
        "Erro na sincronização de planetas",
        "Tente novamente daqui alguns segundos."
      );
      update(false);
    },
    ...options,
  });
}

export function usePlanetSyncStatus(
  options?: QueryOptions<SyncStatus, [typeof KEY.PLANET_SYNC_STATUS]>,
) {
  const handler = useCallback(async function () {
    return await SyncAPI.getPlanetSyncStatus();
  }, []);

  return useQuery([KEY.PLANET_SYNC_STATUS], handler, options);
}

export function usePlanetLastSync(
  options?: QueryOptions<LastSyncResponse, [typeof KEY.PLANET_LAST_SYNC]>,
) {
  const handler = useCallback(function () {
    return SyncAPI.getPlanetLastSync();
  }, []);

  return useQuery([KEY.PLANET_LAST_SYNC], handler, options);
}

// Exam sync hooks
export function useSyncExams(options?: UseMutationOptions) {
  const { refetch: refetchSync } = useExamSyncStatus({ enabled: false });
  const { update } = useExamSync();

  return useMutation({
    mutationFn: async () => {
      await SyncAPI.syncExams();
    },
    onSuccess: async () => {
      await refetchSync();
    },
    onError: () => {
      errorNotification(
        "Erro na sincronização de provas",
        "Tente novamente daqui alguns segundos."
      );
      update(false);
    },
    ...options,
  });
}

export function useExamSyncStatus(
  options?: QueryOptions<SyncStatus, [typeof KEY.EXAM_SYNC_STATUS]>,
) {
  const handler = useCallback(async function () {
    return await SyncAPI.getExamSyncStatus();
  }, []);

  return useQuery([KEY.EXAM_SYNC_STATUS], handler, options);
}

export function useExamLastSync(
  options?: QueryOptions<LastSyncResponse, [typeof KEY.EXAM_LAST_SYNC]>,
) {
  const handler = useCallback(function () {
    return SyncAPI.getExamLastSync();
  }, []);

  return useQuery([KEY.EXAM_LAST_SYNC], handler, options);
}

// Legacy aliases for backward compatibility (deprecated)
export const useSyncStatus = usePlanetSyncStatus;
export const useLastSync = usePlanetLastSync;
