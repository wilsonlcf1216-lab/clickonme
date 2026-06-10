import { Building2 } from "lucide-react";
import type { Building } from "@/data/directory";

type BuildingTabsProps = {
  buildings: Building[];
  selectedBuildingId: string;
  onSelect: (buildingId: string) => void;
};

export default function BuildingTabs({
  buildings,
  selectedBuildingId,
  onSelect,
}: BuildingTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {buildings.map((building) => {
        const isActive = building.id === selectedBuildingId;

        return (
          <button
            key={building.id}
            type="button"
            onClick={() => onSelect(building.id)}
            className={`flex items-center gap-3 rounded-full border px-4 py-3 text-left transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`rounded-full p-2 ${
                isActive ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              <Building2 className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.2em] opacity-70">
                Building
              </span>
              <span className="block text-sm font-semibold">{building.shortName}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
