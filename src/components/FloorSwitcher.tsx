import { Layers3 } from "lucide-react";
import type { FloorPlan } from "@/data/directory";

type FloorSwitcherProps = {
  floors: FloorPlan[];
  selectedFloorId: string;
  onSelect: (floorId: string) => void;
};

export default function FloorSwitcher({
  floors,
  selectedFloorId,
  onSelect,
}: FloorSwitcherProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_46px_rgba(148,163,184,0.12)]">
      <div className="mb-3 flex items-center gap-2 text-slate-700">
        <span className="rounded-xl bg-slate-100 p-2">
          <Layers3 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Floor Switcher</p>
          <p className="text-sm font-semibold">選擇樓層</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 xl:flex-col">
        {floors.map((floor) => {
          const isActive = floor.id === selectedFloorId;

          return (
            <button
              key={floor.id}
              type="button"
              onClick={() => onSelect(floor.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <span className="block text-xs uppercase tracking-[0.2em] opacity-70">
                Floor
              </span>
              <span className="block text-sm font-semibold">{floor.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
