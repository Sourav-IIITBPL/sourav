export interface Achievement {
  year: string;
  title: string;
  description: string;
  certificatePath?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    year: "2024",
    title: "Smart India Hackathon",
    description: "National-level participant, team lead",
    certificatePath: "/certificates/smartindia.jpg",
  },
  {
    year: "2024",
    title: "AlgoUniversity Tech Fellowship",
    description: "Selected cohort member",
    certificatePath: "/certificates/algoUniversity2024.png",
  },
  {
    year: "2025",
    title: "AlgoUniversity Tech Fellowship",
    description: "2nd cohort",
    certificatePath: "/certificates/algoUniversityDP.pdf",
  },
  {
    year: "2025",
    title: "HER DAO Rust Cohort 1",
    description: "Learner",
  },
  {
    year: "2026",
    title: "HackVision",
    description: "Top 100 finalist team of 400+",
    certificatePath: "/certificates/hackvision.pdf",
  },
  {
    year: "Ongoing",
    title: "Cyfrin Updraft Web3 Courses",
    description: "Advanced Solidity, Security, and Protocol Testing courses",
    link: "https://profiles.cyfrin.io/u/sourav_dev",
  },
];
