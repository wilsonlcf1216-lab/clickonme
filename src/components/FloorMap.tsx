import { Layers3, MapPinned, Navigation } from "lucide-react";
import {
  type Department,
  type FloorPlan,
  type LiftGroup,
  type RouteMode,
} from "@/data/directory";

type FloorMapProps = {
  floors: FloorPlan[];
  floor: FloorPlan;
  departmentsOnFloor: Department[];
  selectedDepartment: Department | null;
  routeMode: RouteMode;
  onSelectDepartment: (departmentId: string) => void;
  onSelectFloor: (floorId: string) => void;
};

export default function FloorMap({
  floors,
  floor,
  departmentsOnFloor,
  selectedDepartment,
  routeMode,
  onSelectDepartment,
  onSelectFloor,
}: FloorMapProps) {
  const hasDepartmentOverlay = selectedDepartment?.floorId === floor.id;
  const routePoints = hasDepartmentOverlay
    ? routeMode === "entrance"
      ? selectedDepartment.routeFromEntrance
      : selectedDepartment.routeFromLift
    : [];
  const routePath = routePoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${parseFloat(point.x)} ${parseFloat(point.y)}`)
    .join(" ");
  const highlightedLiftIds = new Set(
    hasDepartmentOverlay ? selectedDepartment.preferredLiftIds : [],
  );
  const visibleDepartmentMarkers = departmentsOnFloor.filter(
    (department) =>
      department.markerVisibility !== "selected" || department.id === selectedDepartment?.id,
  );
  const stackFloors = [...floors].reverse();
  const towerMinHeight = Math.max(760, floors.length * 28 + 210);
  const towerStep = 28;
  const towerFrameHeight = "calc(100vh - 230px)";

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_24px_64px_rgba(148,163,184,0.18)] xl:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
          {floors.map((item) => {
            const isActive = item.id === floor.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectFloor(item.id)}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  isActive
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-500">
            <Layers3 className="h-4 w-4 text-sky-500" />
            {floor.label}
          </div>
          {hasDepartmentOverlay ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-500">
              <Navigation className="h-4 w-4 text-sky-500" />
              {routeMode === "lift" ? "Lift Route" : "Entry Route"}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[400px_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.26),_rgba(248,250,252,0.98)_40%,_rgba(241,245,249,0.98)_100%)] px-4 py-5">
          <div
            className="relative overflow-hidden"
            style={{ minHeight: `${towerMinHeight}px`, height: towerFrameHeight }}
          >
            <div className="absolute inset-x-12 bottom-8 top-8 rounded-[40px] bg-gradient-to-b from-white/68 via-slate-100/54 to-slate-200/42" />
            {stackFloors.map((item) => {
              const isActive = item.id === floor.id;
              const stackIndex = floors.length - 1 - item.level;
              const stackOffset = 20 + stackIndex * towerStep;
              const plateOpacity = isActive ? 1 : Math.max(0.56, 0.98 - stackIndex * 0.015);
              const slabTransform =
                "perspective(1200px) rotateX(67deg) rotateZ(-28deg) scale(0.98)";

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectFloor(item.id)}
                  className="absolute left-1/2 top-0 w-[250px] -translate-x-1/2 transition duration-300"
                  style={{
                    top: `${stackOffset}px`,
                    transform: "translateX(-50%)",
                    zIndex: isActive ? floors.length + 10 : item.level + 1,
                    opacity: plateOpacity,
                  }}
                >
                  <div className="relative h-[128px]">
                    <div
                      className="absolute inset-0 origin-center"
                      style={{ transform: slabTransform }}
                    >
                      <div
                        className={`absolute bottom-[-11px] left-[14px] right-[22px] h-[14px] rounded-b-[12px] ${
                          isActive ? "bg-sky-400/70" : "bg-slate-400/58"
                        }`}
                      />
                      <div
                        className={`absolute bottom-[-9px] right-[4px] top-[8px] w-[18px] rounded-r-[10px] ${
                          isActive ? "bg-sky-100/88" : "bg-slate-200/92"
                        }`}
                        style={{ transform: "skewY(-34deg)" }}
                      />
                      <div
                        className={`absolute bottom-[-9px] left-[2px] top-[8px] w-[16px] rounded-l-[10px] ${
                          isActive ? "bg-white/98" : "bg-white/95"
                        }`}
                        style={{ transform: "skewY(34deg)" }}
                      />
                      <div
                        className={`relative overflow-hidden rounded-[18px] border p-1.5 shadow-[0_16px_30px_rgba(15,23,42,0.14)] transition ${
                          isActive
                            ? "border-sky-300 bg-white shadow-[0_16px_28px_rgba(59,130,246,0.14)]"
                            : "border-slate-300/80 bg-white/94"
                        }`}
                      >
                        <div
                          className={`absolute inset-x-0 top-0 h-[7px] ${
                            isActive ? "bg-sky-300/75" : "bg-slate-300/70"
                          }`}
                        />
                        <img
                          src={item.imagePath}
                          alt={item.label}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <span
                    className={`absolute left-[calc(100%+6px)] top-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[10px] font-semibold tracking-[0.16em] shadow-sm ${
                      isActive
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white/92 text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.18),_rgba(248,250,252,1)_58%)] p-3">
          <div
            className="relative mx-auto flex w-full items-center justify-center"
            style={{ minHeight: `${towerMinHeight}px`, height: towerFrameHeight }}
          >
            <img
              src={floor.imagePath}
              alt={floor.label}
              className="h-auto max-h-[calc(100vh-270px)] w-full object-contain"
            />

            {hasDepartmentOverlay ? (
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d={routePath}
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="1.38"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.98"
                />
                <path
                  d={routePath}
                  fill="none"
                  stroke={selectedDepartment.color}
                  strokeWidth="0.82"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={routeMode === "entrance" ? "0" : "1.6 1.1"}
                  opacity="0.96"
                />
                {routePoints.map((point, index) => (
                  <circle
                    key={`${point.x}-${point.y}-${index}`}
                    cx={parseFloat(point.x)}
                    cy={parseFloat(point.y)}
                    r={index === routePoints.length - 1 ? "1.05" : "0.62"}
                    fill="white"
                  />
                ))}
                {routePoints.map((point, index) => (
                  <circle
                    key={`inner-${point.x}-${point.y}-${index}`}
                    cx={parseFloat(point.x)}
                    cy={parseFloat(point.y)}
                    r={index === routePoints.length - 1 ? "0.72" : "0.42"}
                    fill={selectedDepartment.color}
                  />
                ))}
              </svg>
            ) : null}

            {floor.lifts.map((lift) => (
              <LiftMarker
                key={lift.id}
                lift={lift}
                highlighted={highlightedLiftIds.has(lift.id)}
              />
            ))}

            {visibleDepartmentMarkers.map((department) => {
              const isSelected = selectedDepartment?.id === department.id;

              return (
                <button
                  key={department.id}
                  type="button"
                  onClick={() => onSelectDepartment(department.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: department.target.x, top: department.target.y }}
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isSelected ? "scale-[2.2] blur-lg" : "scale-[1.7] blur-md"
                      }`}
                      style={{ backgroundColor: `${department.color}${isSelected ? "66" : "4D"}` }}
                    />
                    <div
                      className={`relative flex items-center gap-1 rounded-full border px-2 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition ${
                        isSelected ? "border-white bg-white/96" : "border-white/80 bg-white/88"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center rounded-full ${
                          isSelected ? "h-8 w-8" : "h-6 w-6"
                        }`}
                        style={{ backgroundColor: department.color }}
                      >
                        <MapPinned
                          className={`${isSelected ? "h-4 w-4" : "h-3.5 w-3.5"} text-white`}
                        />
                      </div>
                      <span
                        className={`font-semibold uppercase tracking-[0.14em] ${
                          isSelected ? "text-[10px] text-slate-800" : "text-[9px] text-slate-600"
                        }`}
                      >
                        {department.code}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/94 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {hasDepartmentOverlay ? selectedDepartment.code : floor.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type LiftMarkerProps = {
  lift: LiftGroup;
  highlighted: boolean;
};

function LiftMarker({ lift, highlighted }: LiftMarkerProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: lift.position.x, top: lift.position.y }}
    >
      <div
        className={`rounded-2xl border px-2 py-1.5 shadow-sm transition ${
          highlighted
            ? "scale-110 border-white shadow-[0_12px_28px_rgba(15,23,42,0.22)]"
            : "border-white/70"
        }`}
        style={{ backgroundColor: highlighted ? lift.color : `${lift.color}D9` }}
      >
        <div className="mb-1 flex gap-[2px]">
          <span className="h-[2px] w-3 rounded-full bg-white/90" />
          <span className="h-[2px] w-2 rounded-full bg-white/90" />
        </div>
        <div className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          {lift.code}
        </div>
      </div>
    </div>
  );
}
