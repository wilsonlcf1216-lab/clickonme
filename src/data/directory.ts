import {
  generatedDepartmentSeeds,
  generatedLiftSeeds,
} from "@/data/generatedOverlays";

export type MapPoint = {
  x: string;
  y: string;
};

export type LiftGroup = {
  id: string;
  code: string;
  color: string;
  floorId: string;
  position: MapPoint;
  batch: "upper" | "lower" | "special";
};

export type FloorPlan = {
  id: string;
  label: string;
  level: number;
  imagePath: string;
  entrance: MapPoint;
  lifts: LiftGroup[];
};

export type Department = {
  id: string;
  code: string;
  name: string;
  floorId: string;
  color: string;
  target: MapPoint;
  preferredLiftIds: string[];
  routeFromEntrance: MapPoint[];
  routeFromLift: MapPoint[];
  markerVisibility?: "always" | "selected";
  source?: "manual" | "generated";
};

export type RouteMode = "entrance" | "lift";

type GeneratedDepartmentSeed = (typeof generatedDepartmentSeeds)[number];

const fallbackEntrance: MapPoint = { x: "50%", y: "50%" };
const manualDepartmentColors = [
  "#f59e0b",
  "#22c55e",
  "#14b8a6",
  "#8b5cf6",
  "#10b981",
  "#06b6d4",
  "#60a5fa",
  "#3b82f6",
  "#ec4899",
  "#f97316",
  "#84cc16",
  "#6366f1",
];

const floorCatalog: Array<Pick<FloorPlan, "id" | "label" | "imagePath">> = [
  { id: "b02", label: "B02", imagePath: "floorplates/b02.png" },
  { id: "b01", label: "B01", imagePath: "floorplates/b01.png" },
  { id: "gf", label: "G/F", imagePath: "floorplates/gf.png" },
  { id: "1f", label: "1/F", imagePath: "floorplates/1f.png" },
  { id: "2f", label: "2/F", imagePath: "floorplates/2f.png" },
  { id: "3f", label: "3/F", imagePath: "floorplates/3f.png" },
  { id: "4f", label: "4/F", imagePath: "floorplates/4f.png" },
  { id: "5f", label: "5/F", imagePath: "floorplates/5f.png" },
  { id: "6f", label: "6/F", imagePath: "floorplates/6f.png" },
  { id: "7f", label: "7/F", imagePath: "floorplates/7f.png" },
  { id: "8f", label: "8/F", imagePath: "floorplates/8f.png" },
  { id: "9f", label: "9/F", imagePath: "floorplates/9f.png" },
  { id: "10f", label: "10/F", imagePath: "floorplates/10f.png" },
  { id: "11f", label: "11/F", imagePath: "floorplates/11f.png" },
  { id: "12f", label: "12/F", imagePath: "floorplates/12f.png" },
  { id: "13f", label: "13/F", imagePath: "floorplates/13f.png" },
  { id: "14f", label: "14/F", imagePath: "floorplates/14f.png" },
  { id: "15f", label: "15/F", imagePath: "floorplates/15f.png" },
  { id: "16f", label: "16/F", imagePath: "floorplates/16f.png" },
  { id: "17f", label: "17/F", imagePath: "floorplates/17f.png" },
  { id: "18f", label: "18/F", imagePath: "floorplates/18f.png" },
  { id: "19f", label: "19/F", imagePath: "floorplates/19f.png" },
];

const floorEntrances: Record<string, MapPoint> = {
  gf: { x: "86%", y: "55%" },
  "1f": { x: "86%", y: "50%" },
  "2f": { x: "83%", y: "56%" },
};

const manualFloorLifts: Record<string, LiftGroup[]> = {
  gf: [
    { id: "sn-core-gf", code: "SN", color: "#0ea5e9", floorId: "gf", position: { x: "52.3%", y: "28.6%" }, batch: "upper" },
    { id: "h-core-gf", code: "H", color: "#facc15", floorId: "gf", position: { x: "51.6%", y: "37.9%" }, batch: "upper" },
    { id: "s-core-gf", code: "S", color: "#fde047", floorId: "gf", position: { x: "51.1%", y: "46.7%" }, batch: "upper" },
    { id: "l-core-gf", code: "L", color: "#eab308", floorId: "gf", position: { x: "51.3%", y: "55.5%" }, batch: "upper" },
    { id: "a5-gf", code: "A5", color: "#f97316", floorId: "gf", position: { x: "13.3%", y: "31.1%" }, batch: "special" },
    { id: "ht-core-gf", code: "HT", color: "#ef4444", floorId: "gf", position: { x: "52.2%", y: "58.2%" }, batch: "lower" },
    { id: "sw-core-gf", code: "SW", color: "#06b6d4", floorId: "gf", position: { x: "47.0%", y: "67.3%" }, batch: "lower" },
    { id: "se-core-gf", code: "SE", color: "#06b6d4", floorId: "gf", position: { x: "59.8%", y: "67.3%" }, batch: "lower" },
  ],
  "1f": [
    { id: "sn-core-1f", code: "SN", color: "#0ea5e9", floorId: "1f", position: { x: "53.1%", y: "29.8%" }, batch: "upper" },
    { id: "h-core-1f", code: "H", color: "#94a3b8", floorId: "1f", position: { x: "52.3%", y: "38.8%" }, batch: "upper" },
    { id: "s-core-1f", code: "S", color: "#94a3b8", floorId: "1f", position: { x: "51.6%", y: "47.0%" }, batch: "upper" },
    { id: "l-core-1f", code: "L", color: "#eab308", floorId: "1f", position: { x: "52.4%", y: "55.3%" }, batch: "upper" },
    { id: "a5-1f", code: "A5", color: "#f97316", floorId: "1f", position: { x: "13.1%", y: "29.6%" }, batch: "special" },
    { id: "ht-core-1f", code: "HT", color: "#ef4444", floorId: "1f", position: { x: "52.0%", y: "58.5%" }, batch: "lower" },
    { id: "sw-core-1f", code: "SW", color: "#06b6d4", floorId: "1f", position: { x: "47.3%", y: "66.8%" }, batch: "lower" },
    { id: "se-core-1f", code: "SE", color: "#06b6d4", floorId: "1f", position: { x: "59.3%", y: "66.8%" }, batch: "lower" },
  ],
  "2f": [
    { id: "sn-core-2f", code: "SN", color: "#0ea5e9", floorId: "2f", position: { x: "53.0%", y: "29.4%" }, batch: "upper" },
    { id: "h-core-2f", code: "H", color: "#94a3b8", floorId: "2f", position: { x: "52.1%", y: "38.6%" }, batch: "upper" },
    { id: "s-core-2f", code: "S", color: "#94a3b8", floorId: "2f", position: { x: "51.5%", y: "46.4%" }, batch: "upper" },
    { id: "l-core-2f", code: "L", color: "#eab308", floorId: "2f", position: { x: "52.3%", y: "55.1%" }, batch: "upper" },
    { id: "a5-2f", code: "A5", color: "#f97316", floorId: "2f", position: { x: "13.3%", y: "29.8%" }, batch: "special" },
    { id: "ht-core-2f", code: "HT", color: "#ef4444", floorId: "2f", position: { x: "52.0%", y: "58.8%" }, batch: "lower" },
    { id: "sw-core-2f", code: "SW", color: "#06b6d4", floorId: "2f", position: { x: "47.2%", y: "67.2%" }, batch: "lower" },
    { id: "se-core-2f", code: "SE", color: "#06b6d4", floorId: "2f", position: { x: "59.4%", y: "67.1%" }, batch: "lower" },
  ],
};

function percentToNumber(value: string): number {
  return parseFloat(value);
}

function formatPercent(value: number): string {
  const clamped = Math.max(3, Math.min(97, value));
  return `${clamped.toFixed(1)}%`;
}

function toPoint(x: number, y: number): MapPoint {
  return { x: formatPercent(x), y: formatPercent(y) };
}

function liftFamily(code: string): string {
  if (code.startsWith("SN")) return "SN";
  if (code.startsWith("SW")) return "SW";
  if (code.startsWith("SE")) return "SE";
  if (code.startsWith("HT")) return "HT";
  if (code.startsWith("WW")) return "WW";
  if (code.startsWith("CH")) return "CH";
  if (code.startsWith("CT")) return "CT";
  if (code.startsWith("U")) return "U";
  if (code.startsWith("H")) return "H";
  if (code.startsWith("L")) return "L";
  if (code.startsWith("S")) return "S";
  if (code.startsWith("A")) return "A";
  if (code.startsWith("E")) return "E";
  return code;
}

function liftColor(code: string): string {
  const family = liftFamily(code);

  switch (family) {
    case "SN":
      return "#0ea5e9";
    case "SW":
    case "SE":
      return "#06b6d4";
    case "HT":
      return "#ef4444";
    case "H":
      return "#94a3b8";
    case "L":
      return "#eab308";
    case "S":
      return "#fde047";
    case "A":
      return "#f97316";
    case "E":
      return "#8b5cf6";
    case "WW":
      return "#22c55e";
    case "CH":
    case "CT":
      return "#f43f5e";
    case "U":
      return "#6366f1";
    default:
      return "#64748b";
  }
}

function liftBatch(code: string): LiftGroup["batch"] {
  const family = liftFamily(code);

  if (family === "SN" || family === "H" || family === "L" || family === "S") {
    return "upper";
  }

  if (family === "SE" || family === "SW" || family === "HT") {
    return "lower";
  }

  return "special";
}

function distanceBetween(first: MapPoint, second: MapPoint): number {
  return Math.hypot(
    percentToNumber(first.x) - percentToNumber(second.x),
    percentToNumber(first.y) - percentToNumber(second.y),
  );
}

function dedupeLiftGroups(groups: LiftGroup[]): LiftGroup[] {
  const seen = new Set<string>();

  return groups.filter((group) => {
    const key = [
      group.code,
      formatPercent(percentToNumber(group.position.x)),
      formatPercent(percentToNumber(group.position.y)),
    ].join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildOrthogonalRoute(
  start: MapPoint,
  end: MapPoint,
  anchorX?: number,
): MapPoint[] {
  const startX = percentToNumber(start.x);
  const startY = percentToNumber(start.y);
  const endX = percentToNumber(end.x);
  const endY = percentToNumber(end.y);
  const pivotX = anchorX ?? endX;
  const route: MapPoint[] = [start];

  if (Math.abs(pivotX - startX) > 1.2) {
    route.push(toPoint(pivotX, startY));
  }

  if (Math.abs(endY - startY) > 1.2) {
    route.push(toPoint(pivotX, endY));
  }

  if (Math.abs(endX - pivotX) > 1.2 || Math.abs(endY - startY) <= 1.2) {
    route.push(end);
  }

  return route.filter((point, index, list) => {
    if (index === 0) {
      return true;
    }

    const previous = list[index - 1];
    return previous.x !== point.x || previous.y !== point.y;
  });
}

function generatedDepartmentColor(seed: GeneratedDepartmentSeed): string {
  const sum = `${seed.floorId}-${seed.code}-${seed.name}`
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return manualDepartmentColors[sum % manualDepartmentColors.length];
}

function buildGeneratedFloorLifts(): Record<string, LiftGroup[]> {
  const mapped = generatedLiftSeeds.reduce<Record<string, LiftGroup[]>>((accumulator, seed) => {
    const liftGroup: LiftGroup = {
      id: seed.id,
      code: seed.code,
      color: liftColor(seed.code),
      floorId: seed.floorId,
      position: seed.position,
      batch: liftBatch(seed.code),
    };

    accumulator[seed.floorId] = [...(accumulator[seed.floorId] ?? []), liftGroup];
    return accumulator;
  }, {});

  return Object.fromEntries(
    Object.entries(mapped).map(([floorId, groups]) => [
      floorId,
      dedupeLiftGroups(groups),
    ]),
  );
}

const generatedFloorLifts = buildGeneratedFloorLifts();

export const floorPlans: FloorPlan[] = floorCatalog.map((floor, index) => ({
  ...floor,
  level: index,
  entrance: floorEntrances[floor.id] ?? fallbackEntrance,
  lifts: dedupeLiftGroups([
    ...(manualFloorLifts[floor.id] ?? []),
    ...(generatedFloorLifts[floor.id] ?? []),
  ]),
}));

function nearestLiftIds(floorId: string, target: MapPoint, count = 2): string[] {
  const lifts = floorPlans.find((item) => item.id === floorId)?.lifts ?? [];

  return lifts
    .slice()
    .sort(
      (first, second) =>
        distanceBetween(first.position, target) - distanceBetween(second.position, target),
    )
    .slice(0, count)
    .map((lift) => lift.id);
}

function generatedRouteFromEntrance(
  floorId: string,
  target: MapPoint,
  preferredLiftIds: string[],
): MapPoint[] {
  const floor = floorPlans.find((item) => item.id === floorId);
  const primaryLift = floor?.lifts.find((lift) => lift.id === preferredLiftIds[0]);
  const anchorX = primaryLift
    ? percentToNumber(primaryLift.position.x)
    : percentToNumber(target.x);

  return buildOrthogonalRoute(floor?.entrance ?? fallbackEntrance, target, anchorX);
}

function generatedRouteFromLift(
  floorId: string,
  target: MapPoint,
  preferredLiftIds: string[],
): MapPoint[] {
  const floor = floorPlans.find((item) => item.id === floorId);
  const primaryLift = floor?.lifts.find((lift) => lift.id === preferredLiftIds[0]);

  if (!primaryLift) {
    return [];
  }

  return buildOrthogonalRoute(primaryLift.position, target, percentToNumber(primaryLift.position.x));
}

const manualDepartments: Department[] = [
  {
    id: "dept-gf-ae",
    code: "10.02",
    name: "Accident & Emergency Services",
    floorId: "gf",
    color: "#f59e0b",
    target: { x: "79.2%", y: "44.1%" },
    preferredLiftIds: ["s-core-gf", "l-core-gf"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "55%" },
      { x: "80.5%", y: "55%" },
      { x: "80.5%", y: "45.5%" },
      { x: "79.2%", y: "44.1%" },
    ],
    routeFromLift: [
      { x: "51.1%", y: "46.7%" },
      { x: "66%", y: "46.7%" },
      { x: "74%", y: "44.8%" },
      { x: "79.2%", y: "44.1%" },
    ],
  },
  {
    id: "dept-gf-rad",
    code: "09.01",
    name: "Radiology / Diagnostic MRI / CT Scanners / Ultrasonography",
    floorId: "gf",
    color: "#22c55e",
    target: { x: "49.7%", y: "80.5%" },
    preferredLiftIds: ["sw-core-gf", "se-core-gf"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "55%" },
      { x: "72%", y: "55%" },
      { x: "72%", y: "73%" },
      { x: "54%", y: "73%" },
      { x: "49.7%", y: "80.5%" },
    ],
    routeFromLift: [
      { x: "47.0%", y: "67.3%" },
      { x: "47.0%", y: "73%" },
      { x: "49.7%", y: "80.5%" },
    ],
  },
  {
    id: "dept-gf-reception",
    code: "10.01.154",
    name: "Reception",
    floorId: "gf",
    color: "#14b8a6",
    target: { x: "34.6%", y: "61.8%" },
    preferredLiftIds: ["a5-gf", "sw-core-gf"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "55%" },
      { x: "63%", y: "55%" },
      { x: "44%", y: "55%" },
      { x: "34.6%", y: "61.8%" },
    ],
    routeFromLift: [
      { x: "47.0%", y: "67.3%" },
      { x: "40.8%", y: "67.3%" },
      { x: "34.6%", y: "61.8%" },
    ],
  },
  {
    id: "dept-1f-sopc",
    code: "04.08",
    name: "SOPC - Private Clinic",
    floorId: "1f",
    color: "#8b5cf6",
    target: { x: "48.5%", y: "45.8%" },
    preferredLiftIds: ["s-core-1f", "l-core-1f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "50%" },
      { x: "69%", y: "50%" },
      { x: "54%", y: "50%" },
      { x: "48.5%", y: "45.8%" },
    ],
    routeFromLift: [
      { x: "51.6%", y: "47.0%" },
      { x: "48.5%", y: "47.0%" },
      { x: "48.5%", y: "45.8%" },
    ],
  },
  {
    id: "dept-1f-pharmacy",
    code: "08.01",
    name: "Pharmacy",
    floorId: "1f",
    color: "#10b981",
    target: { x: "85.8%", y: "31.5%" },
    preferredLiftIds: ["sn-core-1f", "h-core-1f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "50%" },
      { x: "86%", y: "31.5%" },
      { x: "85.8%", y: "31.5%" },
    ],
    routeFromLift: [
      { x: "52.3%", y: "38.8%" },
      { x: "68%", y: "38.8%" },
      { x: "80%", y: "31.5%" },
      { x: "85.8%", y: "31.5%" },
    ],
  },
  {
    id: "dept-1f-foodcourt",
    code: "12.03",
    name: "Cafeteria - Food Court",
    floorId: "1f",
    color: "#06b6d4",
    target: { x: "16.5%", y: "22.5%" },
    preferredLiftIds: ["a5-1f", "sn-core-1f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "86%", y: "50%" },
      { x: "54%", y: "50%" },
      { x: "26%", y: "50%" },
      { x: "16.5%", y: "22.5%" },
    ],
    routeFromLift: [
      { x: "13.1%", y: "29.6%" },
      { x: "16.5%", y: "29.6%" },
      { x: "16.5%", y: "22.5%" },
    ],
  },
  {
    id: "dept-2f-it",
    code: "20.02",
    name: "IT & Communications (PABX)",
    floorId: "2f",
    color: "#60a5fa",
    target: { x: "79.6%", y: "22.8%" },
    preferredLiftIds: ["sn-core-2f", "h-core-2f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "83%", y: "56%" },
      { x: "83%", y: "28%" },
      { x: "79.6%", y: "22.8%" },
    ],
    routeFromLift: [
      { x: "52.1%", y: "38.6%" },
      { x: "65%", y: "38.6%" },
      { x: "76%", y: "22.8%" },
      { x: "79.6%", y: "22.8%" },
    ],
  },
  {
    id: "dept-2f-histo",
    code: "07.02",
    name: "Pathology - Histopathology",
    floorId: "2f",
    color: "#3b82f6",
    target: { x: "13.8%", y: "69.4%" },
    preferredLiftIds: ["a5-2f", "sw-core-2f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "83%", y: "56%" },
      { x: "56%", y: "56%" },
      { x: "28%", y: "56%" },
      { x: "13.8%", y: "69.4%" },
    ],
    routeFromLift: [
      { x: "47.2%", y: "67.2%" },
      { x: "28%", y: "67.2%" },
      { x: "13.8%", y: "69.4%" },
    ],
  },
  {
    id: "dept-2f-chem",
    code: "27.03",
    name: "CUHK Chemical Pathology",
    floorId: "2f",
    color: "#ec4899",
    target: { x: "84.2%", y: "49.8%" },
    preferredLiftIds: ["se-core-2f", "ht-core-2f"],
    markerVisibility: "always",
    source: "manual",
    routeFromEntrance: [
      { x: "83%", y: "56%" },
      { x: "84.2%", y: "56%" },
      { x: "84.2%", y: "49.8%" },
    ],
    routeFromLift: [
      { x: "59.4%", y: "67.1%" },
      { x: "72%", y: "67.1%" },
      { x: "84.2%", y: "49.8%" },
    ],
  },
];

const manualDepartmentKeys = new Set(
  manualDepartments.map((department) => `${department.floorId}|${department.code}`),
);

const generatedDepartments: Department[] = generatedDepartmentSeeds
  .filter((seed) => !manualDepartmentKeys.has(`${seed.floorId}|${seed.code}`))
  .map((seed) => {
    const preferredLiftIds = nearestLiftIds(seed.floorId, seed.target);

    return {
      id: seed.id,
      code: seed.code,
      name: seed.name,
      floorId: seed.floorId,
      color: generatedDepartmentColor(seed),
      target: seed.target,
      preferredLiftIds,
      routeFromEntrance: generatedRouteFromEntrance(
        seed.floorId,
        seed.target,
        preferredLiftIds,
      ),
      routeFromLift: generatedRouteFromLift(seed.floorId, seed.target, preferredLiftIds),
      markerVisibility: "selected",
      source: "generated",
    };
  });

export const departments: Department[] = [...manualDepartments, ...generatedDepartments];

export const routeModes: Array<{ id: RouteMode; label: string }> = [
  { id: "lift", label: "Lift" },
  { id: "entrance", label: "Entry" },
];

export const defaultDepartmentId = departments[0].id;
