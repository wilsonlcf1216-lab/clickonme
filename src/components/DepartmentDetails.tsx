import type { ReactNode } from "react";
import { Building2, MapPinned, Palette } from "lucide-react";
import type { DepartmentArea } from "@/data/departments";

type DepartmentDetailsProps = {
  department: DepartmentArea;
};

export default function DepartmentDetails({
  department,
}: DepartmentDetailsProps) {
  return (
    <aside className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">
          Selected Department
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          {department.code}
        </h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-2xl shadow-[0_16px_28px_rgba(15,23,42,0.28)]"
            style={{ backgroundColor: department.color }}
          />
          <div>
            <p className="text-lg font-semibold text-white">{department.name}</p>
            <p className="text-sm text-slate-400">{department.level}</p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-300">
          {department.description}
        </p>
      </div>

      <div className="grid gap-3">
        <InfoRow
          icon={<MapPinned className="h-4 w-4" />}
          label="互動效果"
          value="按名即時高亮位置"
        />
        <InfoRow
          icon={<Palette className="h-4 w-4" />}
          label="顯示方式"
          value="半透明有色框 + Glow"
        />
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="示意用途"
          value="接待處 / Kiosk / Intranet"
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
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/10 p-2 text-cyan-100">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
    </div>
  );
}
