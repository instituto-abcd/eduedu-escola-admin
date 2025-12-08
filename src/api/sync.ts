import { useCallback } from "react";
import { API } from "./base";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./api-types";
import { errorNotification } from "~/utils/errorNotification";
import { useFileSync } from "~/stores/filter";

type SyncStatus = {
  totalFiles: number;
  syncedFiles: number;
  percent: number;
  duration: string;
  running: boolean;
  currentOperation: string;
};

type LastSyncResponse = {
  syncedAt: Date;
  daysSinceLastSync: number | null;
  showReminder: boolean;
};

const URL = {
  SYNC_EXAM: "exam",
  SYNC_PLANETS: "planet-sync/sync-all",
  SYNC_STATUS: "planet-sync/sync-status",
  LAST_SYNC: "planet-sync/last-sync",
};

const KEY = {
  EXAM: "EXAM",
  PLANETS: "PLANETS",
  SYNCSTATUS: "SYNC_STATUS",
  LAST_SYNC: "LAST_SYNC",
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

  static async getLastSync() {
    const { data } = await this.api.get<LastSyncResponse>(URL.LAST_SYNC);
    return data;
  }
}

export function useSyncExams(options?: QueryOptions<void, [typeof KEY.EXAM]>) {
  const handler = useCallback(function () {
    return SyncAPI.syncExams();
  }, []);

  return useQuery([KEY.EXAM], handler, options);
}

export function useSyncPlanets(options?: UseMutationOptions) {
  const { data: syncStatus, refetch: refetchSync } = useSyncStatus();
  const { data: syncFilesState, update } = useFileSync();

  return useMutation({
    mutationFn: async () => {
      await SyncAPI.syncPlanets();
    },
    onSuccess: async () => {
      await refetchSync();
    },
    onError: () => {
      errorNotification(
        "Erro na sincronização",
        "Ocorreu um erro durante a sincronização. Verifique sua Chave de acesso."
      );
      update(false);
    },
    ...options,
  });
}

export function useSyncStatus(
  options?: QueryOptions<SyncStatus, [typeof KEY.SYNCSTATUS]>
) {
  const handler = useCallback(async function () {
    return await SyncAPI.getSyncStatus();
  }, []);

  return useQuery([KEY.SYNCSTATUS], handler, options);
}

export function useLastSync(
  options?: QueryOptions<LastSyncResponse, [typeof KEY.LAST_SYNC]>
) {
  const handler = useCallback(function () {
    return SyncAPI.getLastSync();
  }, []);

  return useQuery([KEY.LAST_SYNC], handler, options);
}
