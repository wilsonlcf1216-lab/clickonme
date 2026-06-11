import { DoorOpen, Navigation } from "lucide-react";
import DepartmentList from "@/components/DepartmentList";
import FloorMap from "@/components/FloorMap";
import { departments, floorPlans, routeModes } from "@/data/directory";
import { useDirectoryStore } from "@/store/useDirectoryStore";

export default function Home() {
  const {
    query,
    selectedDepartmentId,
    selectedFloorId,
    routeMode,
    setQuery,
    selectDepartment,
    selectFloor,
    setRouteMode,
  } = useDirectoryStore();

  const filteredDepartments = departments.filter((department) => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    return (
      department.code.toLowerCase().includes(keyword) ||
      department.name.toLowerCase().includes(keyword) ||
      department.floorId.toLowerCase().includes(keyword)
    );
  });

  const selectedDepartment =
    departments.find((department) => department.id === selectedDepartmentId) ?? departments[0];
  const activeFloorId = selectedDepartment.floorId || selectedFloorId;
  const selectedFloor =
    floorPlans.find((floor) => floor.id === activeFloorId) ??
    floorPlans.find((floor) => floor.id === selectedFloorId) ??
    floorPlans[0];

  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 md:px-6">
      <div className="mx-auto max-w-[1600px]">
        <section className="mb-4 flex flex-wrap items-center justify-end gap-2">
          {routeModes.map((mode) => {
            const isActive = mode.id === routeMode;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setRouteMode(mode.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {mode.id === "lift" ? (
                  <Navigation className="h-4 w-4" />
                ) : (
                  <DoorOpen className="h-4 w-4" />
                )}
                {mode.label}
              </button>
            );
          })}
        </section>

        <section className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <DepartmentList
            departments={filteredDepartments}
            floors={floorPlans}
            query={query}
            selectedDepartmentId={selectedDepartment.id}
            onQueryChange={setQuery}
            onSelect={selectDepartment}
          />

          <div className="space-y-4">
            <FloorMap
              floors={floorPlans}
              floor={selectedFloor}
              selectedDepartment={selectedDepartment}
              routeMode={routeMode}
              onSelectFloor={selectFloor}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
