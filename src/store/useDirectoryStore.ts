import { create } from "zustand";
import {
  defaultDepartmentId,
  departments,
  floorPlans,
  type RouteMode,
} from "@/data/directory";

type DirectoryStore = {
  query: string;
  selectedDepartmentId: string | null;
  selectedFloorId: string;
  routeMode: RouteMode;
  setQuery: (value: string) => void;
  selectDepartment: (id: string) => void;
  selectFloor: (floorId: string) => void;
  setRouteMode: (mode: RouteMode) => void;
};

const initialDepartment =
  departments.find((department) => department.id === defaultDepartmentId) ?? departments[0];

export const useDirectoryStore = create<DirectoryStore>((set) => ({
  query: "",
  selectedDepartmentId: initialDepartment.id,
  selectedFloorId: initialDepartment.floorId,
  routeMode: "lift",
  setQuery: (value) => set({ query: value }),
  selectDepartment: (id) => {
    const department = departments.find((item) => item.id === id);

    if (!department) {
      return;
    }

    set({
      selectedDepartmentId: department.id,
      selectedFloorId: department.floorId,
    });
  },
  selectFloor: (floorId) => {
    const floor = floorPlans.find((item) => item.id === floorId);

    if (!floor) {
      return;
    }

    set(() => ({
      selectedFloorId: floorId,
      selectedDepartmentId: null,
    }));
  },
  setRouteMode: (mode) => set({ routeMode: mode }),
}));
