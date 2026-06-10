import type { ReactNode } from "react";
import { Building2, MapPinned, Navigation, Palette } from "lucide-react";
import type { Building, Department, FloorPlan } from "@/data/directory";

type DepartmentDetailsProps = {
  department: Department;
  building?: Building;
  floor?: FloorPlan;
};

export default function DepartmentDetails({
  department,
  building,
  floor,
}: DepartmentDetailsProps) {
  return (
    <aside className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-sky-500/80">
          Selected Department
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          {department.code}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-2xl shadow-[0_16px_28px_rgba(15,23,42,0.28)]"
            style={{ backgroundColor: department.color }}
          />
          <div>
            <p className="text-lg font-semibold text-slate-900">{department.name}</p>
            <p className="text-sm text-slate-500">
              {building?.shortName} · {floor?.label}
            </p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          {department.description}
        </p>
      </div>

      <div className="grid gap-3">
        <InfoRow
          icon={<MapPinned className="h-4 w-4" />}
          label="互動效果"
          value="按名即時跳到對應棟別與樓層"
        />
        <InfoRow
          icon={<Palette className="h-4 w-4" />}
          label="顯示方式"
          value="淡色底圖 + 半透明高亮框 + Marker"
        />
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="目前位置"
          value={`${building?.name ?? department.buildingId} / ${floor?.title ?? department.floorId}`}
        />
        <InfoRow
          icon={<Navigation className="h-4 w-4" />}
          label="示意用途"
          value="商場 directory / 接待處 / Kiosk / Intranet"
        />
      </div>
    </aside>
  );
}

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-2 text-sky-600">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}
