import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SchoolClassSearch, StudentPerfSearch } from "~/api/school-class";
import { StudentSearch } from "~/api/student";
import { UserSearch } from "~/api/user";

type Filter<T = unknown> = {
  update: (filter: T) => void;
  data: T;
};

interface FileSyncState {
  data: boolean;
  update: (value: boolean) => void;
}

export const useStudentFilterStore = create<Filter<StudentSearch>>((set) => ({
  data: {},
  update: (filter) => set({ data: filter }),
}));

export const useFileSync = create<FileSyncState>()(
  persist(
    (set) => ({
      data: false,
      update: (value) => set({ data: value }),
    }),
    {
      name: "file-sync-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useSchoolClassFilterStore = create<Filter<SchoolClassSearch>>(
  (set) => ({
    data: {},
    update: (filter) => set({ data: filter }),
  })
);

export const useUserFilterStore = create<Filter<UserSearch>>((set) => ({
  data: {},
  update: (filter) => set({ data: filter }),
}));

export const useStudentPerfFilterStore = create<Filter<StudentPerfSearch>>(
  (set) => ({
    data: {},
    update: (filter) => set({ data: filter }),
  })
);
