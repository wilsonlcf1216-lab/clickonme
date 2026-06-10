export type DepartmentArea = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
  glowColor: string;
  description: string;
  level: string;
  bounds: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

export const departments: DepartmentArea[] = [
  {
    id: "dept-2703",
    code: "27.03",
    name: "CUHK - Microbiology",
    shortName: "Microbiology",
    color: "#b28cff",
    glowColor: "rgba(178, 140, 255, 0.34)",
    description: "位於左上方，適合做成較短而集中的高亮區塊。",
    level: "3/F West Wing",
    bounds: {
      left: "10.5%",
      top: "8%",
      width: "21%",
      height: "23%",
    },
  },
  {
    id: "dept-0703",
    code: "07.03",
    name: "Pathology - Microbiology",
    shortName: "Pathology",
    color: "#ef79de",
    glowColor: "rgba(239, 121, 222, 0.30)",
    description: "位於左側主區域，面積最大，適合做垂直延展式高亮框。",
    level: "3/F West Spine",
    bounds: {
      left: "9.5%",
      top: "34%",
      width: "28%",
      height: "41%",
    },
  },
  {
    id: "dept-2701",
    code: "27.01",
    name: "CUHK - Basic / Translational Research and Clinical Research Facilities",
    shortName: "Clinical Research",
    color: "#33e06c",
    glowColor: "rgba(51, 224, 108, 0.28)",
    description: "位於右側大片區域，示範用半透明綠色框突顯主要功能空間。",
    level: "3/F East Wing",
    bounds: {
      left: "56%",
      top: "18%",
      width: "28%",
      height: "58%",
    },
  },
];
