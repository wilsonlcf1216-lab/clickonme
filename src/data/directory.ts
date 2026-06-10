export type MapRect = {
  left: string;
  top: string;
  width: string;
  height: string;
};

export type Building = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export type FloorPlan = {
  id: string;
  buildingId: string;
  label: string;
  title: string;
  hallway: MapRect[];
  blocks: MapRect[];
};

export type Department = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  buildingId: string;
  floorId: string;
  color: string;
  glowColor: string;
  description: string;
  bounds: MapRect;
};

export const buildings: Building[] = [
  {
    id: "tower-a",
    name: "Research Tower A",
    shortName: "Tower A",
    description: "主診斷及實驗空間集中區，偏向西翼布局。",
  },
  {
    id: "tower-b",
    name: "Clinical Tower B",
    shortName: "Tower B",
    description: "臨床研究及支援空間集中區，偏向東翼布局。",
  },
];

export const floorPlans: FloorPlan[] = [
  {
    id: "a-2f",
    buildingId: "tower-a",
    label: "2/F",
    title: "Tower A - Level 2",
    hallway: [
      { left: "0%", top: "46%", width: "100%", height: "10%" },
      { left: "41%", top: "0%", width: "10%", height: "100%" },
    ],
    blocks: [
      { left: "5%", top: "8%", width: "28%", height: "20%" },
      { left: "57%", top: "9%", width: "28%", height: "20%" },
      { left: "10%", top: "66%", width: "22%", height: "17%" },
      { left: "57%", top: "68%", width: "29%", height: "16%" },
    ],
  },
  {
    id: "a-3f",
    buildingId: "tower-a",
    label: "3/F",
    title: "Tower A - Level 3",
    hallway: [
      { left: "0%", top: "45%", width: "100%", height: "12%" },
      { left: "35%", top: "0%", width: "12%", height: "100%" },
    ],
    blocks: [
      { left: "8%", top: "8%", width: "24%", height: "18%" },
      { left: "10%", top: "30%", width: "26%", height: "46%" },
      { left: "54%", top: "14%", width: "30%", height: "58%" },
      { left: "58%", top: "76%", width: "24%", height: "11%" },
    ],
  },
  {
    id: "b-gf",
    buildingId: "tower-b",
    label: "G/F",
    title: "Tower B - Ground Floor",
    hallway: [
      { left: "0%", top: "46%", width: "100%", height: "11%" },
      { left: "48%", top: "4%", width: "8%", height: "90%" },
    ],
    blocks: [
      { left: "8%", top: "10%", width: "27%", height: "18%" },
      { left: "63%", top: "8%", width: "22%", height: "22%" },
      { left: "12%", top: "67%", width: "22%", height: "15%" },
      { left: "60%", top: "65%", width: "26%", height: "18%" },
    ],
  },
  {
    id: "b-1f",
    buildingId: "tower-b",
    label: "1/F",
    title: "Tower B - Level 1",
    hallway: [
      { left: "0%", top: "45%", width: "100%", height: "12%" },
      { left: "46%", top: "0%", width: "10%", height: "100%" },
    ],
    blocks: [
      { left: "7%", top: "9%", width: "25%", height: "18%" },
      { left: "61%", top: "8%", width: "24%", height: "20%" },
      { left: "8%", top: "63%", width: "25%", height: "19%" },
      { left: "60%", top: "64%", width: "25%", height: "18%" },
    ],
  },
];

export const departments: Department[] = [
  {
    id: "dept-2703",
    code: "27.03",
    name: "CUHK - Microbiology",
    shortName: "Microbiology",
    buildingId: "tower-a",
    floorId: "a-3f",
    color: "#8f74ff",
    glowColor: "rgba(143, 116, 255, 0.22)",
    description: "位於 Tower A 3/F 左上區域，適合用紫色高亮顯示。",
    bounds: { left: "10%", top: "10%", width: "22%", height: "16%" },
  },
  {
    id: "dept-0703",
    code: "07.03",
    name: "Pathology - Microbiology",
    shortName: "Pathology",
    buildingId: "tower-a",
    floorId: "a-3f",
    color: "#f174bf",
    glowColor: "rgba(241, 116, 191, 0.22)",
    description: "位於 Tower A 3/F 左側主功能區，展示較大範圍高亮。",
    bounds: { left: "10%", top: "31%", width: "26%", height: "44%" },
  },
  {
    id: "dept-2701",
    code: "27.01",
    name: "CUHK - Basic / Translational Research and Clinical Research Facilities",
    shortName: "Clinical Research",
    buildingId: "tower-a",
    floorId: "a-3f",
    color: "#34c96d",
    glowColor: "rgba(52, 201, 109, 0.22)",
    description: "位於 Tower A 3/F 右側大片研究空間。",
    bounds: { left: "54%", top: "16%", width: "30%", height: "56%" },
  },
  {
    id: "dept-1205",
    code: "12.05",
    name: "Genomics Lab Support",
    shortName: "Genomics Support",
    buildingId: "tower-a",
    floorId: "a-2f",
    color: "#44b6ff",
    glowColor: "rgba(68, 182, 255, 0.20)",
    description: "位於 Tower A 2/F 北側，示範跨樓層自動跳位。",
    bounds: { left: "57%", top: "10%", width: "27%", height: "18%" },
  },
  {
    id: "dept-g012",
    code: "G0.12",
    name: "Reception & Visitor Center",
    shortName: "Reception",
    buildingId: "tower-b",
    floorId: "b-gf",
    color: "#ffb64d",
    glowColor: "rgba(255, 182, 77, 0.22)",
    description: "位於 Tower B G/F 入口附近，適合作為訪客導覽目標。",
    bounds: { left: "63%", top: "9%", width: "21%", height: "19%" },
  },
  {
    id: "dept-1052",
    code: "10.52",
    name: "Imaging Preparation Suite",
    shortName: "Imaging Suite",
    buildingId: "tower-b",
    floorId: "b-1f",
    color: "#ff7f93",
    glowColor: "rgba(255, 127, 147, 0.20)",
    description: "位於 Tower B 1/F 東南角，示範第二棟樓切換。",
    bounds: { left: "60%", top: "64%", width: "25%", height: "18%" },
  },
];

export const defaultDepartmentId = departments[1].id;
