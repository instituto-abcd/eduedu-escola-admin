import { useCallback } from "react";
import { Paginated, PaginationParams, QueryOptions } from "./api-types";
import { API } from "./base";
import { useQuery } from "@tanstack/react-query";

type Audit = {
  id: string;
  userId: string;
  action: string;
  entity: string;
  createdAt: Date;
};

type AuditFilterOptions = Partial<Pick<Audit, "userId" | "entity" | "action">>;

const URL = { BASE: "/audit" } as const;
const KEY = { BASE: "AUDIT" } as const;

class AuditAPI extends API {
  static async get(params?: AuditFilterOptions & PaginationParams) {
    const { data } = await this.api.get<Paginated<Audit>>(URL.BASE, { params });
    return data;
  }
}

export function useAuditGet(
  options?: QueryOptions<
    Paginated<Audit>,
    [typeof KEY.BASE, number, AuditFilterOptions | undefined]
  > & { filter?: AuditFilterOptions }
) {
  const handler = useCallback(
    function () {
      return AuditAPI.get({
        "page-number": options?.page ?? 1,
        "page-size": options?.pageSize ?? 10,
        ...options?.filter,
      });
    },
    [options?.page, options?.pageSize, options?.filter]
  );

  return useQuery(
    [KEY.BASE, options?.page ?? 1, options?.filter],
    handler,
    options
  );
}
