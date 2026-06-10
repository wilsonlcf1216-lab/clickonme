import { Layers3, LocateFixed, Route } from "lucide-react";
import type { Department, FloorPlan } from "@/data/directory";

type FloorMapProps = {
  floor: FloorPlan;
  departments: Department[];
  selectedDepartment: Department;
  onSelect: (id: string) => void;
};

export default function FloorMap({
  floor,
  departments,
  selectedDepartment,
  onSelect,
}: FloorMapProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-500/80">
            Interactive Floor Plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {floor.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <Layers3 className="h-4 w-4 text-sky-500" />
          Mall Directory View
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-[#eef2f6] p-4">
        <div className="map-shell relative aspect-[4/3] overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8fafc]">
          <Grid />

          {floor.blocks.map((block) => (
            <div
              key={`${block.left}-${block.top}-${block.width}`}
              className="absolute rounded-[18px] border border-slate-300 bg-slate-100"
              style={block}
            />
          ))}

          {floor.hallway.map((lane) => (
            <div
              key={`${lane.left}-${lane.top}-${lane.width}`}
              className="absolute rounded-[20px] border border-[#d9edf5] bg-[#e4f3fb]"
              style={lane}
            />
          ))}

          {departments.map((department) => {
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
          })}

          <div className="absolute bottom-4 right-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-[0_12px_40px_rgba(148,163,184,0.22)] backdrop-blur">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-sky-500" />
              <span className="font-medium">Current Focus</span>
            </div>
            <p className="mt-2 text-slate-600">{selectedDepartment.name}</p>
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
