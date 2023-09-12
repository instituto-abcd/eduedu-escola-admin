import { create } from "zustand";
import { SchoolClassSearch } from "~/api/school-class";
import { StudentSearch } from "~/api/student";
import { UserSearch } from "~/api/user";

type Filter<T = unknown> = {
  update: (filter: T) => void;
  data: T;
};

export const useStudentFilterStore = create<Filter<StudentSearch>>((set) => ({
  data: {},
  update: (filter) => set({ data: filter }),
}));

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
