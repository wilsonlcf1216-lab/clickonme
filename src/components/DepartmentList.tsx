import { Search } from "lucide-react";
import type { Department, FloorPlan } from "@/data/directory";

type DepartmentListProps = {
  departments: Department[];
  floors: FloorPlan[];
  query: string;
  selectedDepartmentId: string | null;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
};

export default function DepartmentList({
  departments,
  floors,
  query,
  selectedDepartmentId,
  onQueryChange,
  onSelect,
}: DepartmentListProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Department List</h2>

      <label className="group relative mb-4 block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-sky-500" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜尋編號、部門、棟別或樓層"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
        />
      </label>

      <div className="space-y-3">
        {departments.map((department) => {
          const isActive = department.id === selectedDepartmentId;
          const floor = floors.find((item) => item.id === department.floorId);

          return (
            <button
              key={department.id}
              type="button"
              onClick={() => onSelect(department.id)}
              className={`w-full rounded-3xl border px-4 py-4 text-left transition duration-200 ${
                isActive
                  ? "border-sky-200 bg-sky-50 shadow-[0_14px_34px_rgba(59,130,246,0.12)]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.04)]"
                      style={{ backgroundColor: department.color }}
                    />
                    <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-medium tracking-[0.16em] text-slate-500">
                      {department.code}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {department.code}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {department.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  {floor?.label ?? department.floorId}
                </span>
              </div>
            </button>
          );
        })}

        {departments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            搵唔到相符部門，請試下輸入其他編號、名稱、棟別或樓層。
          </div>
        ) : null}
      </div>
    </section>
  );
}
