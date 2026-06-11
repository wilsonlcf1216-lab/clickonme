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
            <div className="absolute inset-x-10 bottom-3 top-4 rounded-[44px] bg-gradient-to-b from-slate-200/40 via-slate-300/20 to-slate-400/30 blur-xl" />
            <div className="absolute left-1/2 top-10 h-[calc(100%-96px)] w-[154px] -translate-x-1/2 rounded-[28px] bg-gradient-to-b from-white/80 via-slate-100/70 to-slate-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
            <div
              className="absolute left-[calc(50%-80px)] top-[64px] h-[calc(100%-128px)] w-[26px] rounded-l-[20px] bg-gradient-to-b from-slate-200/85 to-slate-400/75"
              style={{ transform: "skewY(36deg)" }}
            />
            <div
              className="absolute left-[calc(50%+54px)] top-[64px] h-[calc(100%-128px)] w-[26px] rounded-r-[20px] bg-gradient-to-b from-slate-100/85 to-slate-300/75"
              style={{ transform: "skewY(-36deg)" }}
            />
            <div className="absolute left-1/2 top-10 h-[calc(100%-108px)] w-[8px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-100 via-slate-300/80 to-slate-400/70" />
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
                          className="h-full w-full object-contain drop-shadow-[0_10px_16px_rgba(148,163,184,0.22)]"
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
              className="h-auto max-h-[calc(100vh-270px)] w-full object-contain drop-shadow-[0_28px_36px_rgba(148,163,184,0.24)]"
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
