import { Search } from "lucide-react";
import type { Department, FloorPlan } from "@/data/directory";

type DepartmentListProps = {
  departments: Department[];
  floors: FloorPlan[];
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
};

export default function DepartmentList({
  departments,
  floors,
  query,
  onQueryChange,
  onSelect,
}: DepartmentListProps) {
  const primaryMatch = departments[0];
  const totalMatches = departments.length;
  const hasQuery = query.trim().length > 0;
  const primaryFloor = primaryMatch
    ? floors.find((item) => item.id === primaryMatch.floorId)
    : null;
  const canJump = hasQuery && Boolean(primaryMatch);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
      <form
        className="flex flex-col gap-3 xl:flex-row xl:items-center"
        onSubmit={(event) => {
          event.preventDefault();

          if (primaryMatch) {
            onSelect(primaryMatch.id);
          }
        }}
      >
        <label className="group relative block xl:min-w-[420px] xl:flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-sky-500" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search department code / name / floor"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Search Only
          </span>
          {hasQuery ? (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              {totalMatches} Match{totalMatches === 1 ? "" : "es"}
            </span>
          ) : (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Enter Code / Name
            </span>
          )}
          <button
            type="submit"
            disabled={!canJump}
            className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
              canJump
                ? "border border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300"
                : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            Jump
          </button>
        </div>
      </form>

      {hasQuery && primaryMatch ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Best Match
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: primaryMatch.color }}
            />
            <span className="font-semibold text-slate-900">{primaryMatch.code}</span>
            <span className="text-slate-500">{primaryMatch.name}</span>
            <span className="rounded-full border border-sky-200 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-700">
              {primaryFloor?.label ?? primaryMatch.floorId}
            </span>
          </span>
        </div>
      ) : null}

      {hasQuery && !primaryMatch ? (
        <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
          搵唔到相符 department，試下其他 code、名稱或者樓層。
        </div>
      ) : null}
    </section>
  );
}
