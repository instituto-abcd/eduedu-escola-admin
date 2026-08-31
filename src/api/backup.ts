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
  FILES: "backup/files",
};

const KEY = {
  SCHEDULE: "BACKUP_SCHEDULE",
  FILES: "BACKUP_FILES",
};

class BackupAPI extends API {
  static async create() {
    const { data } = await this.api.get<string>(URL.BASE);
    return data;
  }

  static async listFiles() {
    const { data } = await this.api.get<string[]>(URL.FILES);
    return data;
  }

  // O arquivo vem como blob e é salvo pelo navegador. É o único caminho
  // para o backup sair da máquina: ele é gravado dentro do container do
  // backend, e quem opera o computador da escola não vai usar `docker cp`.
  static async download(fileName: string) {
    const { data } = await this.api.get<Blob>(
      `${URL.FILES}/${encodeURIComponent(fileName)}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(data);

    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    } finally {
      // Sem o revoke o blob fica retido na memória da aba até o reload —
      // e um backup pode ter centenas de MB.
      window.URL.revokeObjectURL(url);
    }

    return fileName;
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

export function useBackupFiles(
  options?: QueryOptions<string[], [typeof KEY.FILES]>
) {
  const handler = useCallback(function () {
    return BackupAPI.listFiles();
  }, []);

  return useQuery([KEY.FILES], handler, options);
}

export function useBackupDownload(options?: MutationOptions<string, string>) {
  const handler = useCallback(function (fileName: string) {
    return BackupAPI.download(fileName);
  }, []);

  return useMutation(handler, options);
}

export function useBackupCreate(options?: MutationOptions<void, string>) {
  const queryClient = useQueryClient();

  const handler = useCallback(function () {
    return BackupAPI.create();
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.invalidateQueries([KEY.FILES]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
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
