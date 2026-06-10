import { Layers3, LocateFixed } from "lucide-react";
import type { DepartmentArea } from "@/data/departments";

type FloorMapProps = {
  departments: DepartmentArea[];
  selectedDepartment: DepartmentArea;
  onSelect: (id: string) => void;
};

const structuralBlocks = [
  "left-[4%] top-[4%] h-[16%] w-[27%]",
  "left-[35%] top-[7%] h-[10%] w-[20%]",
  "left-[61%] top-[5%] h-[24%] w-[27%]",
  "left-[40%] top-[24%] h-[12%] w-[13%]",
  "left-[67%] top-[34%] h-[18%] w-[18%]",
  "left-[7%] top-[79%] h-[12%] w-[38%]",
  "left-[57%] top-[81%] h-[10%] w-[31%]",
];

export default function FloorMap({
  departments,
  selectedDepartment,
  onSelect,
}: FloorMapProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">
            Interactive Floor Plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            3/F Department Locator
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          <Layers3 className="h-4 w-4 text-cyan-200" />
          Prototype View
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#c9ced7] p-4">
        <div className="map-shell relative aspect-[4/3] overflow-hidden rounded-[24px] border border-slate-700/30 bg-[#d8dce2]">
          <Grid />

          {structuralBlocks.map((className) => (
            <div
              key={className}
              className={`absolute rounded-[18px] border border-slate-900/20 bg-slate-800/35 ${className}`}
            />
          ))}

          <div className="absolute left-[34%] top-[0%] h-full w-[13%] bg-cyan-100/70" />
          <div className="absolute left-[0%] top-[46%] h-[13%] w-full bg-cyan-100/55" />

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
                      ? `0 0 0 1px ${department.color}, 0 0 44px ${department.glowColor}`
                      : `0 0 0 1px ${department.color}`,
                  }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white">
                  {department.code}
                </span>
                <span className="absolute bottom-3 left-3 right-3 rounded-2xl bg-slate-950/65 px-3 py-2 text-sm text-white backdrop-blur">
                  {department.shortName}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white shadow-[0_12px_40px_rgba(2,6,23,0.35)] backdrop-blur">
            <div className="flex items-center gap-2">
              <LocateFixed className="h-4 w-4 text-cyan-200" />
              <span className="font-medium">Current Focus</span>
            </div>
            <p className="mt-2 text-slate-300">{selectedDepartment.name}</p>
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
          className="absolute top-0 h-full border-l border-dashed border-slate-900/25"
          style={{ left: `${(line + 1) * 7.6}%` }}
        />
      ))}
      {lines.map((line) => (
        <div
          key={`horizontal-${line}`}
          className="absolute left-0 w-full border-t border-dashed border-slate-900/25"
          style={{ top: `${(line + 1) * 7.6}%` }}
        />
      ))}
    </>
  );
}
