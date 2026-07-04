import {
  SiSolidity, SiEthereum, SiReact, SiTypescript, SiJavascript,
  SiHtml5, SiCss, SiTailwindcss, SiNodedotjs, SiExpress,
  SiPostgresql, SiMysql, SiPolygon, SiBinance, SiRust, SiCplusplus,
  SiGit, SiGithub, SiLinux, SiVercel, SiNetlify, SiChainlink
} from "react-icons/si";
import { FaHardHat, FaCode } from "react-icons/fa";
import { Shield, Code2, Cpu, Wrench, SearchCode, Route } from "lucide-react";

export interface TechItem {
  name: string;
  icon: any;
  color?: string;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    label: "Smart Contracts",
    items: [
      { name: "Solidity", icon: SiSolidity, color: '#363636' },
      { name: "Foundry", icon: Wrench, color: '#9CA3AF' },
      { name: "Hardhat", icon: FaHardHat, color: '#FFFF00' },
      { name: "OpenZeppelin", icon: Shield, color: '#4E5EE4' },
      { name: "Proxy Patterns", icon: Route, color: '#F43F5E' },
      { name: "Gas Optimization", icon: Cpu, color: '#F59E0B' },
    ],
  },
  {
    label: "Security",
    items: [
      { name: "Fuzz Testing", icon: SearchCode, color: '#10B981' },
      { name: "Invariant Testing", icon: Shield, color: '#818CF8' },
      { name: "Slither", icon: SearchCode, color: '#10B981' },
      { name: "Aderyn", icon: Shield, color: '#818CF8' },
      { name: "Mythril", icon: SearchCode, color: '#10B981' },
      { name: "Tenderly", icon: Wrench, color: '#9CA3AF' },
      { name: "Exploit PoC", icon: Code2, color: '#38BDF8' },
    ],
  },
  {
    label: "DeFi",
    items: [
      { name: "AMMs", icon: Route, color: '#F43F5E' },
      { name: "Uniswap V2/V3", icon: SiEthereum, color: '#FF007A' },
      { name: "Aave V3/V4", icon: SiEthereum, color: '#B6509E' },
      { name: "ERC4626 Vaults", icon: Shield, color: '#818CF8' },
      { name: "Lending", icon: Code2, color: '#38BDF8' },
      { name: "Staking", icon: Cpu, color: '#F59E0B' },
      { name: "Protocol Accounting", icon: SearchCode, color: '#10B981' },
      { name: "DEX Routing", icon: Route, color: '#F43F5E' },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, color: '#61DAFB' },
      { name: "TypeScript", icon: SiTypescript, color: '#3178C6' },
      { name: "JavaScript", icon: SiJavascript, color: '#F7DF1E' },
      { name: "HTML5", icon: SiHtml5, color: '#E34F26' },
      { name: "CSS3", icon: SiCss, color: '#1572B6' },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    label: "Web3 / Backend",
    items: [
      { name: "Ethers.js", icon: SiEthereum, color: '#627EEA' },
      { name: "Viem", icon: Code2, color: '#38BDF8' },
      { name: "Wagmi", icon: Code2, color: '#38BDF8' },
      { name: "Web3.js", icon: SiEthereum, color: '#627EEA' },
      { name: "The Graph", icon: Route, color: '#F43F5E' },
      { name: "Chainlink", icon: SiChainlink, color: '#2A5ADA' },
      { name: "Node.js", icon: SiNodedotjs, color: '#339933' },
      { name: "Express.js", icon: SiExpress, color: '#ffffff' },
      { name: "RPCs", icon: Route, color: '#F43F5E' },
      { name: "REST APIs", icon: Code2, color: '#38BDF8' },
      { name: "MySQL", icon: SiMysql, color: '#4479A1' },
      { name: "PostgreSQL", icon: SiPostgresql, color: '#336791' },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Solidity", icon: SiSolidity, color: '#363636' },
      { name: "C++", icon: SiCplusplus, color: '#00599C' },
      { name: "JavaScript", icon: SiJavascript, color: '#F7DF1E' },
      { name: "TypeScript", icon: SiTypescript, color: '#3178C6' },
      { name: "Rust", icon: SiRust, color: '#DEA584' },
      { name: "Java", icon: FaCode, color: '#007396' },
    ],
  },
  {
    label: "Networks",
    items: [
      { name: "Ethereum", icon: SiEthereum, color: '#627EEA' },
      { name: "Arbitrum", icon: Code2, color: '#38BDF8' },
      { name: "Base", icon: Code2, color: '#38BDF8' },
      { name: "Optimism", icon: Code2, color: '#38BDF8' },
      { name: "Polygon", icon: SiPolygon, color: '#8247E5' },
      { name: "BNB Chain", icon: SiBinance, color: '#F3BA2F' },
      { name: "Solana", icon: Code2, color: '#38BDF8' },
      { name: "Wasm", icon: Cpu, color: '#F59E0B' },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: SiGit, color: '#F05032' },
      { name: "GitHub", icon: SiGithub, color: '#ffffff' },
      { name: "Linux", icon: SiLinux, color: '#FCC624' },
      { name: "Vercel", icon: SiVercel, color: '#ffffff' },
      { name: "Netlify", icon: SiNetlify, color: '#00C7B7' },
    ],
  },
];
