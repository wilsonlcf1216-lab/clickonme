import { Building2, Layers3, LocateFixed, Route } from "lucide-react";
import type { Building, Department, FloorPlan } from "@/data/directory";

type FloorMapProps = {
  floors: FloorPlan[];
  activeFloor: FloorPlan;
  departments: Department[];
  selectedDepartment: Department;
  building: Building;
  onSelect: (id: string) => void;
  onSelectFloor: (floorId: string) => void;
};

export default function FloorMap({
  floors,
  activeFloor,
  departments,
  selectedDepartment,
  building,
  onSelect,
  onSelectFloor,
}: FloorMapProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-500/80">
            Interactive Floor Plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {building.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            3D 疊層視圖會將所選樓層向前拉出，望落更似一棟 building。
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <Layers3 className="h-4 w-4 text-sky-500" />
          3D Stack View
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-[#eef2f6] p-4">
        <div className="relative h-[760px] overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#fdfefe_0%,#eef4fa_100%)]">
          <div className="absolute inset-x-[14%] bottom-[6%] h-[72%] rounded-[40px] border border-slate-300/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(226,232,240,0.78))] shadow-[0_40px_80px_rgba(148,163,184,0.28)]" />
          <div className="absolute inset-y-[8%] left-[12%] w-px bg-slate-300/70" />
          <div className="absolute inset-y-[8%] right-[12%] w-px bg-slate-300/70" />

          {floors.map((floor, index) => {
            const isActiveFloor = floor.id === activeFloor.id;
            const floorDepartments = departments;
            const deckTop = 90 + index * 74;
            const pullOut = isActiveFloor ? 56 : 0;
            const scale = isActiveFloor ? 1 : 0.95 - index * 0.01;
            const deckHeight = isActiveFloor ? 182 : 138;

            return (
              <div
                key={floor.id}
                className="absolute left-[12%] right-[12%]"
                style={{
                  top: `${deckTop}px`,
                  zIndex: floors.length - index + (isActiveFloor ? 20 : 0),
                  transform: `translateX(${pullOut}px) translateY(${isActiveFloor ? -8 : 0}px) scale(${scale})`,
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectFloor(floor.id)}
                  className={`absolute -left-14 top-[44%] z-30 rounded-2xl border px-3 py-2 text-left shadow-sm transition ${
                    isActiveFloor
                      ? "border-sky-300 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-[11px] uppercase tracking-[0.2em]">Floor</span>
                  <span className="block text-sm font-semibold">{floor.label}</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-x-[2%] top-full h-6 rounded-b-[24px] bg-slate-400/18 blur-md" />
                  <div
                    className="absolute inset-x-0 rounded-b-[28px] bg-[linear-gradient(180deg,rgba(148,163,184,0.34),rgba(100,116,139,0.24))]"
                    style={{ top: `${deckHeight - 10}px`, height: "20px" }}
                  />

                  <div
                    className="map-shell relative overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fafc] shadow-[0_20px_40px_rgba(148,163,184,0.16)]"
                    style={{ height: `${deckHeight}px` }}
                  >
                    <Grid />

                    {floor.blocks.map((block) => (
                      <div
                        key={`${floor.id}-${block.left}-${block.top}-${block.width}`}
                        className="absolute rounded-[18px] border border-slate-300 bg-slate-100"
                        style={block}
                      />
                    ))}

                    {floor.hallway.map((lane) => (
                      <div
                        key={`${floor.id}-${lane.left}-${lane.top}-${lane.width}`}
                        className="absolute rounded-[20px] border border-[#d9edf5] bg-[#e4f3fb]"
                        style={lane}
                      />
                    ))}

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
                      <Building2 className="h-4 w-4 text-sky-500" />
                      {floor.label}
                    </div>

                    {isActiveFloor
                      ? floorDepartments.map((department) => {
                          const isActive = department.id === selectedDepartment.id;

                          return (
                            <button
                              key={department.id}
                              type="button"
                              onClick={() => onSelect(department.id)}
                              className="group absolute rounded-[24px] text-left transition"
                              style={department.bounds}
                            >
                              <span
                                className={`absolute inset-0 rounded-[24px] border-2 transition duration-300 ${
                                  isActive ? "animate-pulse-subtle" : "opacity-75 group-hover:opacity-100"
                                }`}
                                style={{
                                  backgroundColor: department.glowColor,
                                  borderColor: department.color,
                                  boxShadow: isActive
                                    ? `0 0 0 1px ${department.color}, 0 8px 32px ${department.glowColor}`
                                    : `0 0 0 1px ${department.color}`,
                                }}
                              />
                              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-slate-800 shadow-sm">
                                {department.code}
                              </span>
                              <span className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/85 px-3 py-2 text-sm text-slate-800 shadow-sm backdrop-blur">
                                {department.shortName}
                              </span>
                              {isActive ? (
                                <span
                                  className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white shadow-lg"
                                  style={{ backgroundColor: department.color }}
                                >
                                  <LocateFixed className="h-4 w-4 text-white" />
                                </span>
                              ) : null}
                            </button>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-4 right-4 rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 text-sm text-slate-800 shadow-[0_12px_40px_rgba(148,163,184,0.22)] backdrop-blur">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-sky-500" />
              <span className="font-medium">Current Focus</span>
            </div>
            <p className="mt-2 text-slate-600">{selectedDepartment.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {building.shortName} · {activeFloor.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Grid() {
  const lines = Array.from({ length: 12 }, (_, index) => index);

  return (
    <>
      {lines.map((line) => (
        <div
          key={`vertical-${line}`}
          className="absolute top-0 h-full border-l border-dashed border-slate-200"
          style={{ left: `${(line + 1) * 7.6}%` }}
        />
      ))}
      {lines.map((line) => (
        <div
          key={`horizontal-${line}`}
          className="absolute left-0 w-full border-t border-dashed border-slate-200"
          style={{ top: `${(line + 1) * 7.6}%` }}
        />
      ))}
    </>
  );
}
