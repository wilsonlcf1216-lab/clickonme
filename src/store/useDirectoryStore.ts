import { create } from "zustand";
import {
  defaultDepartmentId,
  departments,
  floorPlans,
  type RouteMode,
} from "@/data/directory";

type DirectoryStore = {
  query: string;
  selectedDepartmentId: string;
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
    const matchingDepartment = departments.find((department) => department.floorId === floorId);
    const floor = floorPlans.find((item) => item.id === floorId);

    if (!floor) {
      return;
    }

    set((state) => ({
      selectedFloorId: floorId,
      selectedDepartmentId: matchingDepartment?.id ?? state.selectedDepartmentId,
    }));
  },
  setRouteMode: (mode) => set({ routeMode: mode }),
}));
