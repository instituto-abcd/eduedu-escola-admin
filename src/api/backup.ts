import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { API } from "./base";
import { MutationOptions } from "./api-types";

type RestoreResponse = {
  success: boolean;
};

const URL = {
  BASE: "backup",
  RESTORE: "backup/restore",
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
