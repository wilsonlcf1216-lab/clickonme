import { ChevronRight, PanelLeftClose } from "lucide-react";
import DepartmentDetails from "@/components/DepartmentDetails";
import DepartmentList from "@/components/DepartmentList";
import FloorMap from "@/components/FloorMap";
import { departments } from "@/data/departments";
import { useDepartmentStore } from "@/store/useDepartmentStore";

export default function Home() {
  const { query, selectedId, setQuery, setSelectedId } = useDepartmentStore();

  const filteredDepartments = departments.filter((department) => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    return (
      department.code.toLowerCase().includes(keyword) ||
      department.name.toLowerCase().includes(keyword) ||
      department.shortName.toLowerCase().includes(keyword)
    );
  });

  const selectedDepartment =
    departments.find((department) => department.id === selectedId) ?? departments[0];

  return (
    <main className="min-h-screen px-4 py-5 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <section className="mb-5 rounded-[32px] border border-white/10 bg-slate-950/65 px-6 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.36em] text-cyan-200/75">
                Department Highlight System
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white lg:text-5xl">
                部門定位 prototype 畫面示意圖
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
                示範由 Department List 揀選部門，喺平面圖上即時顯示半透明有色框，
                用作接待處、部門查詢屏幕或者內部樓層定位系統。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatusCard label="樓層" value="3/F Layout" />
              <StatusCard label="部門數" value={`${departments.length} Areas`} />
              <StatusCard label="互動" value="Click to Highlight" />
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)_320px]">
          <DepartmentList
            departments={filteredDepartments}
            query={query}
            selectedId={selectedDepartment.id}
            onQueryChange={setQuery}
            onSelect={setSelectedId}
          />

          <FloorMap
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedId}
          />

          <div className="space-y-5">
            <DepartmentDetails department={selectedDepartment} />

            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                  Flow Preview
                </p>
                <PanelLeftClose className="h-4 w-4 text-cyan-100" />
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <Step text="用戶由清單揀選部門名稱或輸入搜尋字。" />
                <Step text="系統比對部門顏色、名稱及平面圖座標。" />
                <Step text="右側平面圖顯示半透明高亮框及當前資訊。" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type StatusCardProps = {
  label: string;
  value: string;
};

function StatusCard({ label, value }: StatusCardProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mt-0.5 rounded-full border border-cyan-300/20 bg-cyan-300/10 p-1 text-cyan-100">
        <ChevronRight className="h-4 w-4" />
      </div>
      <p className="leading-7">{text}</p>
    </div>
  );
}
