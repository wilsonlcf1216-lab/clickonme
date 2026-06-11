import { useEffect, useMemo, useRef } from "react";
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

  const keyword = query.trim().toLowerCase();
  const filteredDepartments = departments.filter((department) => {
    if (!keyword) {
      return false;
    }

    return (
      department.code.toLowerCase().includes(keyword) ||
      department.name.toLowerCase().includes(keyword) ||
      department.floorId.toLowerCase().includes(keyword)
    );
  });
  const exactDepartmentMatch = useMemo(
    () =>
      departments.find((department) => {
        if (!keyword) {
          return false;
        }

        return (
          department.code.toLowerCase() === keyword ||
          department.name.toLowerCase() === keyword
        );
      }) ?? null,
    [keyword],
  );
  const autoSelectedMatch =
    exactDepartmentMatch ?? (filteredDepartments.length === 1 ? filteredDepartments[0] : null);
  const autoSelectedMatchId = autoSelectedMatch?.id ?? null;
  const lastAutoSelectedMatchId = useRef<string | null>(null);

  useEffect(() => {
    if (!autoSelectedMatchId) {
      lastAutoSelectedMatchId.current = null;
      return;
    }

    if (lastAutoSelectedMatchId.current === autoSelectedMatchId) {
      return;
    }

    lastAutoSelectedMatchId.current = autoSelectedMatchId;
    selectDepartment(autoSelectedMatchId);
  }, [autoSelectedMatchId, selectDepartment]);

  const selectedDepartment =
    departments.find((department) => department.id === selectedDepartmentId) ?? null;
  const selectedFloor =
    floorPlans.find((floor) => floor.id === selectedFloorId) ?? floorPlans[0];
  const visibleDepartment =
    selectedDepartment?.floorId === selectedFloor.id ? selectedDepartment : null;

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

        <section className="mb-4">
          <DepartmentList
            departments={filteredDepartments}
            floors={floorPlans}
            query={query}
            onQueryChange={setQuery}
            onSelect={selectDepartment}
          />
        </section>

        <FloorMap
          floors={floorPlans}
          floor={selectedFloor}
          departmentsOnFloor={departments.filter(
            (department) => department.floorId === selectedFloor.id,
          )}
          selectedDepartment={visibleDepartment}
          routeMode={routeMode}
          onSelectDepartment={selectDepartment}
          onSelectFloor={selectFloor}
        />
      </div>
    </main>
  );
}
