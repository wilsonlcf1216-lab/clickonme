import { create } from "zustand";
import { defaultDepartmentId, departments, floorPlans } from "@/data/directory";

type DirectoryStore = {
  query: string;
  selectedDepartmentId: string;
  selectedBuildingId: string;
  selectedFloorId: string;
  setQuery: (value: string) => void;
  selectDepartment: (id: string) => void;
  selectBuilding: (buildingId: string) => void;
  selectFloor: (floorId: string) => void;
};

const initialDepartment =
  departments.find((department) => department.id === defaultDepartmentId) ?? departments[0];

export const useDirectoryStore = create<DirectoryStore>((set) => ({
  query: "",
  selectedDepartmentId: initialDepartment.id,
  selectedBuildingId: initialDepartment.buildingId,
  selectedFloorId: initialDepartment.floorId,
  setQuery: (value) => set({ query: value }),
  selectDepartment: (id) => {
    const department = departments.find((item) => item.id === id);

    if (!department) {
      return;
    }

    set({
      selectedDepartmentId: department.id,
      selectedBuildingId: department.buildingId,
      selectedFloorId: department.floorId,
    });
  },
  selectBuilding: (buildingId) => {
    const buildingFloors = floorPlans
      .filter((floor) => floor.buildingId === buildingId)
      .sort((left, right) => right.stackOrder - left.stackOrder);
    const nextFloor = buildingFloors[0];
    const matchingDepartment = departments.find(
      (department) =>
        department.buildingId === buildingId && department.floorId === nextFloor?.id,
    );

    set((state) => ({
      selectedBuildingId: buildingId,
      selectedFloorId: nextFloor?.id ?? state.selectedFloorId,
      selectedDepartmentId: matchingDepartment?.id ?? state.selectedDepartmentId,
    }));
  },
  selectFloor: (floorId) => {
    const matchingDepartment = departments.find((department) => department.floorId === floorId);
    const floor = floorPlans.find((item) => item.id === floorId);

    if (!floor) {
      return;
    }

    set((state) => ({
      selectedBuildingId: floor.buildingId,
      selectedFloorId: floorId,
      selectedDepartmentId: matchingDepartment?.id ?? state.selectedDepartmentId,
    }));
  },
}));
