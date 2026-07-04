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
    year: "2026",
    title: "HER DAO Rust Cohort 1",
    description: "Graduated from the Rust cohort of HER DAO",
  },
  {
    year: "2026",
    title: "HackVision",
    description: "Top 100 finalist team of 400+",
    certificatePath: "/certificates/hackvision.pdf",
  },
  {
    year: "2025-26",
    title: "Cyfrin Updraft Web3 Courses",
    description: "Advanced Solidity, Security, and Protocol Testing courses",
    link: "https://profiles.cyfrin.io/u/sourav_dev",
  },
  {
    year: "2025",
    title: "Tech Knockout - IIIT Bhopal",
    description: "Participant in technical competition",
    certificatePath: "/certificates/Tech Knockout-IIITBPL.pdf",
  },
  {
    year: "2024",
    title: "Chanakya Neeti Hackathon",
    description: "Hackathon Participant",
    certificatePath: "/certificates/chanakyaneeti.pdf",
  },
  {
    year: "2024",
    title: "EY Hackathon",
    description: "Hackathon Participant",
    certificatePath: "/certificates/eyhackathon.pdf",
  },
  {
    year: "2024",
    title: "EY Hackathon - Round 1",
    description: "Successfully cleared round 1",
    certificatePath: "/certificates/eyround1.pdf",
  },
  {
    year: "2024",
    title: "IBM Certification",
    description: "Technical Certification",
    certificatePath: "/certificates/ibm2024.png",
  },
  {
    year: "2024",
    title: "NxtWave Certification",
    description: "Technical Certification",
    certificatePath: "/certificates/nxtwave.png",
  },
];
