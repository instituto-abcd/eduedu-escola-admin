import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "./base";
import { MutationOptions, QueryOptions } from "./api-types";

type RestoreResponse = {
  success: boolean;
};

export type BackupSchedule = {
  enabled: boolean;
  /** 0 = domingo ... 6 = sábado */
  dayOfWeek: number;
  hour: number;
  minute: number;
  retentionCount: number;
  /** Fuso em que o dia e a hora são interpretados; definido por ambiente. */
  timeZone: string;
  lastRunAt: string | null;
  lastRunFile: string | null;
  lastError: string | null;
  nextRunAt: string | null;
  /**
   * A janela desta semana passou sem backup (computador desligado, por
   * exemplo) e ele será feito na próxima verificação, sem esperar a semana
   * seguinte.
   */
  overdue: boolean;
  running: boolean;
};

export type BackupScheduleInput = Partial<
  Pick<
    BackupSchedule,
    "enabled" | "dayOfWeek" | "hour" | "minute" | "retentionCount"
  >
>;

const URL = {
  BASE: "backup",
  RESTORE: "backup/restore",
  SCHEDULE: "backup/schedule",
};

const KEY = {
  SCHEDULE: "BACKUP_SCHEDULE",
};

class BackupAPI extends API {
  static async create() {
    const { data } = await this.api.get<string>(URL.BASE);
    return data;
  }

  static async restoreByFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await this.api.post<RestoreResponse>(
      URL.RESTORE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }

  static async getSchedule() {
    const { data } = await this.api.get<BackupSchedule>(URL.SCHEDULE);
    return data;
  }

  static async updateSchedule(input: BackupScheduleInput) {
    const { data } = await this.api.put<BackupSchedule>(URL.SCHEDULE, input);
    return data;
  }
}

export function useBackupCreate(options?: MutationOptions<void, string>) {
  const handler = useCallback(function () {
    return BackupAPI.create();
  }, []);

  return useMutation(handler, options);
}

export function useBackupRestoreByFile(
  options?: MutationOptions<File, RestoreResponse>
) {
  const handler = useCallback(function (file: File) {
    return BackupAPI.restoreByFile(file);
  }, []);

  return useMutation(handler, options);
}

export function useBackupSchedule(
  options?: QueryOptions<BackupSchedule, [typeof KEY.SCHEDULE]>
) {
  const handler = useCallback(function () {
    return BackupAPI.getSchedule();
  }, []);

  return useQuery([KEY.SCHEDULE], handler, options);
}

export function useBackupScheduleUpdate(
  options?: MutationOptions<BackupScheduleInput, BackupSchedule>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (input: BackupScheduleInput) {
    return BackupAPI.updateSchedule(input);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.setQueryData([KEY.SCHEDULE], data);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}
