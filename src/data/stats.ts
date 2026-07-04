export interface Stat {
  label: string;
  value: number;
  suffix: string;
  size: "large" | "medium" | "small";
}

export const stats: Stat[] = [
  { label: "Competitive Audits", value: 20, suffix: "+", size: "large" },
  { label: "Validated Findings", value: 11, suffix: "", size: "large" },
  { label: "Major Projects", value: 4, suffix: "", size: "medium" },
  { label: "DSA Problems Solved", value: 500, suffix: "+", size: "medium" },
  { label: "LeetCode Rating", value: 1868, suffix: "", size: "large" },
  { label: "LeetCode Badge", value: 0, suffix: "Knight", size: "medium" },
];
