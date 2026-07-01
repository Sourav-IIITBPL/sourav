export interface TechCategory {
  label: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    label: "Smart Contracts",
    items: [
      "Solidity",
      "Foundry",
      "Hardhat",
      "OpenZeppelin",
      "Proxy Patterns",
      "Gas Optimization",
    ],
  },
  {
    label: "Security",
    items: [
      "Fuzz Testing",
      "Invariant Testing",
      "Slither",
      "Aderyn",
      "Mythril",
      "Tenderly",
      "Exploit PoC Dev",
    ],
  },
  {
    label: "DeFi",
    items: [
      "AMMs",
      "Uniswap V2/V3",
      "Aave V3/V4",
      "ERC4626 Vaults",
      "Lending",
      "Staking",
      "Protocol Accounting",
      "DEX Routing",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "TypeScript",
      "JavaScript (ESM)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    label: "Web3 / Backend",
    items: [
      "Ethers.js",
      "Viem",
      "Wagmi",
      "Web3.js",
      "The Graph",
      "Chainlink",
      "Node.js",
      "Express.js",
      "RPCs",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    label: "Languages",
    items: [
      "Solidity",
      "C++",
      "JavaScript",
      "TypeScript",
      "Rust",
      "Java (basic)",
    ],
  },
  {
    label: "Networks",
    items: [
      "Ethereum",
      "Arbitrum",
      "Base",
      "Optimism",
      "Polygon",
      "BNB Chain",
      "Solana",
      "Wasm",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Linux", "Vercel", "Netlify"],
  },
];
