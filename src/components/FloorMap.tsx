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
  selectedDepartment: Department | null;
  routeMode: RouteMode;
  onSelectFloor: (floorId: string) => void;
};

export default function FloorMap({
  floors,
  floor,
  selectedDepartment,
  routeMode,
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
  const stackFloors = [...floors].reverse();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
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

      <div className="grid gap-3 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.28),_rgba(248,250,252,0.98)_55%)] px-4 py-5">
          <div className="relative h-[420px] overflow-hidden">
            {stackFloors.map((item) => {
              const isActive = item.id === floor.id;
              const stackOffset = (floors.length - 1 - item.level) * 14;
              const scale = 0.76 + item.level * 0.008 + (isActive ? 0.08 : 0);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectFloor(item.id)}
                  className="absolute left-1/2 top-0 w-[216px] -translate-x-1/2 transition duration-300"
                  style={{
                    top: `${stackOffset}px`,
                    transform: `translateX(-50%) scale(${scale})`,
                    zIndex: isActive ? floors.length + 10 : item.level + 1,
                    opacity: isActive ? 1 : 0.56 + item.level * 0.015,
                  }}
                >
                  <div
                    className={`overflow-hidden rounded-[22px] border p-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition ${
                      isActive
                        ? "border-sky-300 bg-white shadow-[0_24px_48px_rgba(59,130,246,0.18)]"
                        : "border-slate-200 bg-white/90"
                    }`}
                  >
                    <img
                      src={item.imagePath}
                      alt={item.label}
                      className="h-full w-full object-contain drop-shadow-[0_18px_24px_rgba(148,163,184,0.28)]"
                    />
                  </div>
                  <span
                    className={`mt-2 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold tracking-[0.16em] ${
                      isActive
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-500"
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
          <div className="relative mx-auto aspect-[2384/3370] w-full max-w-[900px]">
            <img
              src={floor.imagePath}
              alt={floor.label}
              className="h-full w-full object-contain drop-shadow-[0_28px_36px_rgba(148,163,184,0.24)]"
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
                  stroke={selectedDepartment.color}
                  strokeWidth="0.72"
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
                    r={index === routePoints.length - 1 ? "0.95" : "0.52"}
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

            {hasDepartmentOverlay ? (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: selectedDepartment.target.x, top: selectedDepartment.target.y }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 scale-[1.9] rounded-full blur-lg"
                    style={{ backgroundColor: `${selectedDepartment.color}66` }}
                  />
                  <div
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-[0_10px_24px_rgba(15,23,42,0.24)]"
                    style={{ backgroundColor: selectedDepartment.color }}
                  >
                    <MapPinned className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ) : null}

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
