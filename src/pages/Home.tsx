import { ChevronRight, Compass, MapPinned, PanelLeftClose } from "lucide-react";
import BuildingTabs from "@/components/BuildingTabs";
import DepartmentDetails from "@/components/DepartmentDetails";
import DepartmentList from "@/components/DepartmentList";
import FloorSwitcher from "@/components/FloorSwitcher";
import FloorMap from "@/components/FloorMap";
import { buildings, departments, floorPlans } from "@/data/directory";
import { useDirectoryStore } from "@/store/useDirectoryStore";

export default function Home() {
  const {
    query,
    selectedDepartmentId,
    selectedBuildingId,
    selectedFloorId,
    setQuery,
    selectBuilding,
    selectDepartment,
    selectFloor,
  } = useDirectoryStore();

  const filteredDepartments = departments.filter((department) => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    return (
      department.code.toLowerCase().includes(keyword) ||
      department.name.toLowerCase().includes(keyword) ||
      department.shortName.toLowerCase().includes(keyword) ||
      department.buildingId.toLowerCase().includes(keyword) ||
      department.floorId.toLowerCase().includes(keyword)
    );
  });

  const selectedDepartment =
    departments.find((department) => department.id === selectedDepartmentId) ?? departments[0];
  const selectedBuilding =
    buildings.find((building) => building.id === selectedBuildingId) ?? buildings[0];
  const selectedFloor =
    floorPlans.find((floor) => floor.id === selectedFloorId) ?? floorPlans[0];
  const visibleFloors = floorPlans
    .filter((floor) => floor.buildingId === selectedBuilding.id)
    .sort((left, right) => right.stackOrder - left.stackOrder);
  const visibleDepartments = departments.filter(
    (department) =>
      department.buildingId === selectedBuilding.id && department.floorId === selectedFloor.id,
  );

  return (
    <main className="min-h-screen px-4 py-5 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <section className="mb-5 rounded-[32px] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)] backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.36em] text-sky-500/80">
                Mall Directory Style Prototype
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
                多棟多層商場路線圖風格定位系統
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 lg:text-base">
                示範由 Department List 揀選部門後，自動跳去對應 building 同 floor，
                並以 3D building stack 方式將多層樓疊起，望落更似一棟完整建築。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatusCard label="棟數" value={`${buildings.length} Buildings`} />
              <StatusCard label="樓層數" value={`${floorPlans.length} Floors`} />
              <StatusCard label="互動" value="3D Auto Jump View" />
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Building Navigator</p>
                <h2 className="text-xl font-semibold text-slate-900">棟別切換</h2>
              </div>
            </div>
            <BuildingTabs
              buildings={buildings}
              selectedBuildingId={selectedBuilding.id}
              onSelect={selectBuilding}
            />
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <MapPinned className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Current Target</p>
                <h2 className="text-xl font-semibold text-slate-900">{selectedBuilding.shortName}</h2>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-600">{selectedBuilding.description}</p>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)_300px]">
          <DepartmentList
            departments={filteredDepartments}
            buildings={buildings}
            floors={floorPlans}
            query={query}
            selectedDepartmentId={selectedDepartment.id}
            onQueryChange={setQuery}
            onSelect={selectDepartment}
          />

          <div className="space-y-5">
            <FloorMap
              floors={visibleFloors}
              activeFloor={selectedFloor}
              departments={visibleDepartments}
              selectedDepartment={selectedDepartment}
              building={selectedBuilding}
              onSelect={selectDepartment}
              onSelectFloor={selectFloor}
            />

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(148,163,184,0.18)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-500/80">
                  Flow Preview
                </p>
                <PanelLeftClose className="h-4 w-4 text-slate-500" />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <Step text="揀選部門後，自動跳去對應 building。" />
                <Step text="系統同步切換 floor，並將目標樓層凸出。" />
                <Step text="整棟樓以 3D 疊層方式顯示高亮位置。" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <FloorSwitcher
              floors={visibleFloors}
              selectedFloorId={selectedFloor.id}
              onSelect={selectFloor}
            />

            <DepartmentDetails
              department={selectedDepartment}
              building={selectedBuilding}
              floor={selectedFloor}
            />
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
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mt-0.5 rounded-full border border-sky-200 bg-sky-50 p-1 text-sky-600">
        <ChevronRight className="h-4 w-4" />
      </div>
      <p className="leading-7 text-slate-600">{text}</p>
    </div>
  );
}
