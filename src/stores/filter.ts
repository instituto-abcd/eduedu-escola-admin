import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SchoolClassSearch, StudentPerfSearch } from "~/api/school-class";
import { StudentSearch } from "~/api/student";
import { UserSearch } from "~/api/user";

type Filter<T = unknown> = {
  update: (filter: T) => void;
  data: T;
};

interface SyncState {
  data: boolean;
  update: (value: boolean) => void;
}

export const useStudentFilterStore = create<Filter<StudentSearch>>((set) => ({
  data: {},
  update: (filter) => set({ data: filter }),
}));

// Planet sync state
export const usePlanetSync = create<SyncState>()(
  persist(
    (set) => ({
      data: false,
      update: (value) => set({ data: value }),
    }),
    {
      name: "planet-sync-storage",
      getStorage: () => localStorage,
    }
  )
);

// Exam sync state
export const useExamSync = create<SyncState>()(
  persist(
    (set) => ({
      data: false,
      update: (value) => set({ data: value }),
    }),
    {
      name: "exam-sync-storage",
      getStorage: () => localStorage,
    }
  )
);

// Legacy alias for backward compatibility (deprecated)
export const useFileSync = usePlanetSync;

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
