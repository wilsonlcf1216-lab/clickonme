import { Search, Sparkles } from "lucide-react";
import type { DepartmentArea } from "@/data/departments";

type DepartmentListProps = {
  departments: DepartmentArea[];
  query: string;
  selectedId: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
};

export default function DepartmentList({
  departments,
  query,
  selectedId,
  onQueryChange,
  onSelect,
}: DepartmentListProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">
            Department List
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">定位清單</h2>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-100">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <label className="group relative mb-4 block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-200" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜尋編號或部門名稱"
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/10"
        />
      </label>

      <div className="space-y-3">
        {departments.map((department) => {
          const isActive = department.id === selectedId;

          return (
            <button
              key={department.id}
              type="button"
              onClick={() => onSelect(department.id)}
              className={`w-full rounded-3xl border px-4 py-4 text-left transition duration-200 ${
                isActive
                  ? "border-white/20 bg-white/12 shadow-[0_16px_42px_rgba(15,23,42,0.35)]"
                  : "border-white/8 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.04)]"
                      style={{ backgroundColor: department.color }}
                    />
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] font-medium tracking-[0.16em] text-slate-300">
                      {department.code}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">
                      {department.shortName}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {department.name}
                    </p>
                  </div>
                </div>
                <span className="mt-1 rounded-full border border-white/10 px-2 py-1 text-[11px] tracking-[0.18em] text-slate-400">
                  {department.level}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
