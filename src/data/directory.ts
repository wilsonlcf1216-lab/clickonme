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
};

export type RouteMode = "entrance" | "lift";

export const floorPlans: FloorPlan[] = [
  {
    id: "gf",
    label: "G/F",
    imagePath: "floorplans/gf.png",
    entrance: { x: "86%", y: "55%" },
    lifts: [
      { id: "sn-core-gf", code: "SN", color: "#0ea5e9", floorId: "gf", position: { x: "52.3%", y: "28.6%" }, batch: "upper" },
      { id: "h-core-gf", code: "H", color: "#facc15", floorId: "gf", position: { x: "51.6%", y: "37.9%" }, batch: "upper" },
      { id: "s-core-gf", code: "S", color: "#fde047", floorId: "gf", position: { x: "51.1%", y: "46.7%" }, batch: "upper" },
      { id: "l-core-gf", code: "L", color: "#eab308", floorId: "gf", position: { x: "51.3%", y: "55.5%" }, batch: "upper" },
      { id: "a5-gf", code: "A5", color: "#f97316", floorId: "gf", position: { x: "13.3%", y: "31.1%" }, batch: "special" },
      { id: "ht-core-gf", code: "HT", color: "#ef4444", floorId: "gf", position: { x: "52.2%", y: "58.2%" }, batch: "lower" },
      { id: "sw-core-gf", code: "SW", color: "#06b6d4", floorId: "gf", position: { x: "47.0%", y: "67.3%" }, batch: "lower" },
      { id: "se-core-gf", code: "SE", color: "#06b6d4", floorId: "gf", position: { x: "59.8%", y: "67.3%" }, batch: "lower" },
    ],
  },
  {
    id: "1f",
    label: "1/F",
    imagePath: "floorplans/1f.png",
    entrance: { x: "86%", y: "50%" },
    lifts: [
      { id: "sn-core-1f", code: "SN", color: "#0ea5e9", floorId: "1f", position: { x: "53.1%", y: "29.8%" }, batch: "upper" },
      { id: "h-core-1f", code: "H", color: "#94a3b8", floorId: "1f", position: { x: "52.3%", y: "38.8%" }, batch: "upper" },
      { id: "s-core-1f", code: "S", color: "#94a3b8", floorId: "1f", position: { x: "51.6%", y: "47.0%" }, batch: "upper" },
      { id: "l-core-1f", code: "L", color: "#eab308", floorId: "1f", position: { x: "52.4%", y: "55.3%" }, batch: "upper" },
      { id: "a5-1f", code: "A5", color: "#f97316", floorId: "1f", position: { x: "13.1%", y: "29.6%" }, batch: "special" },
      { id: "ht-core-1f", code: "HT", color: "#ef4444", floorId: "1f", position: { x: "52.0%", y: "58.5%" }, batch: "lower" },
      { id: "sw-core-1f", code: "SW", color: "#06b6d4", floorId: "1f", position: { x: "47.3%", y: "66.8%" }, batch: "lower" },
      { id: "se-core-1f", code: "SE", color: "#06b6d4", floorId: "1f", position: { x: "59.3%", y: "66.8%" }, batch: "lower" },
    ],
  },
  {
    id: "2f",
    label: "2/F",
    imagePath: "floorplans/2f.png",
    entrance: { x: "83%", y: "56%" },
    lifts: [
      { id: "sn-core-2f", code: "SN", color: "#0ea5e9", floorId: "2f", position: { x: "53.0%", y: "29.4%" }, batch: "upper" },
      { id: "h-core-2f", code: "H", color: "#94a3b8", floorId: "2f", position: { x: "52.1%", y: "38.6%" }, batch: "upper" },
      { id: "s-core-2f", code: "S", color: "#94a3b8", floorId: "2f", position: { x: "51.5%", y: "46.4%" }, batch: "upper" },
      { id: "l-core-2f", code: "L", color: "#eab308", floorId: "2f", position: { x: "52.3%", y: "55.1%" }, batch: "upper" },
      { id: "a5-2f", code: "A5", color: "#f97316", floorId: "2f", position: { x: "13.3%", y: "29.8%" }, batch: "special" },
      { id: "ht-core-2f", code: "HT", color: "#ef4444", floorId: "2f", position: { x: "52.0%", y: "58.8%" }, batch: "lower" },
      { id: "sw-core-2f", code: "SW", color: "#06b6d4", floorId: "2f", position: { x: "47.2%", y: "67.2%" }, batch: "lower" },
      { id: "se-core-2f", code: "SE", color: "#06b6d4", floorId: "2f", position: { x: "59.4%", y: "67.1%" }, batch: "lower" },
    ],
  },
];

export const departments: Department[] = [
  {
    id: "dept-gf-ae",
    code: "10.02",
    name: "Accident & Emergency Services",
    floorId: "gf",
    color: "#f59e0b",
    target: { x: "79.2%", y: "44.1%" },
    preferredLiftIds: ["s-core-gf", "l-core-gf"],
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

export const routeModes: Array<{ id: RouteMode; label: string }> = [
  { id: "lift", label: "Lift" },
  { id: "entrance", label: "Entry" },
];

export const defaultDepartmentId = departments[0].id;
