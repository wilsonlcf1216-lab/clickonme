import { create } from "zustand";
import { departments } from "@/data/departments";

type DepartmentStore = {
  query: string;
  selectedId: string;
  setQuery: (value: string) => void;
  setSelectedId: (id: string) => void;
};

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  query: "",
  selectedId: departments[1].id,
  setQuery: (value) => set({ query: value }),
  setSelectedId: (id) => set({ selectedId: id }),
}));
