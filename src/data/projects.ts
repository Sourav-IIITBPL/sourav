export interface Project {
  slug: string;
  name: string;
  tagline: string;
  repo: string;
  demoUrl?: string;
  logo: string;
  stack: string[];
  overview: string;
  problem: string;
  architecture: string;
  deployment: string;
  challenges: { title: string; solution: string }[];
  roadmap: string[];
}

export const projects: Project[] = [
  {
    slug: "preflight",
    name: "PreFlight",
    tagline: "Pre-Transaction Security Middleware",
    repo: "https://github.com/Sourav-IIITBPL/preflight",
    logo: "/images/preflight-project-logo.png",
    stack: [
      "Solidity",
      "Foundry",
      "Chainlink CRE",
      "React",
      "Viem",
      "Browser Extension",
      "Uniswap V2 Pools",
      "ERC4626",
    ],
    overview:
      "A browser-extension-based transaction security middleware that intercepts a user's transaction before execution across DEX and ERC4626 vault interactions.",
    problem:
      "Users sign DeFi transactions blind, with no independent risk check between wallet and chain.",
    architecture:
      "Hybrid risk validation — off-chain state simulation via Chainlink CRE combined with on-chain protocol guard contracts for invariant and risk analysis; transaction decoding, NFT-based risk reporting, execute/abort decision workflow.",
    deployment: "Deployed across Base, Ethereum, and Arbitrum testnets.",
    challenges: [
      {
        title: "Real-time transaction interception",
        solution:
          "Built a browser extension that hooks into the wallet's transaction signing flow, decoding calldata before submission to identify the target protocol and parameters.",
      },
      {
        title: "Cross-chain risk validation",
        solution:
          "Leveraged Chainlink CRE for off-chain state simulation across multiple networks, avoiding the latency and cost of on-chain simulation for every transaction.",
      },
      {
        title: "NFT-based risk reporting",
        solution:
          "Designed an NFT-minting flow that records risk assessment results on-chain, creating an immutable audit trail of transaction risk evaluations.",
      },
    ],
    roadmap: [
      "Support for additional DeFi protocols beyond DEX and vault interactions",
      "Integration with more wallet providers",
      "Mainnet deployment with production-grade risk scoring models",
      "Community-driven risk parameter governance",
    ],
  },
  {
    slug: "settleone",
    name: "SettleOne",
    tagline: "Yield-Generating Payment Commitment Protocol",
    repo: "https://github.com/Sourav-IIITBPL/settleOne",
    logo: "/images/settleone-project-logo.png",
    stack: [
      "Solidity",
      "Foundry",
      "Chainlink",
      "React",
      "Node.js",
      "Express.js",
      "Viem",
      "DeFi Yield Strategies",
      "Stablecoins",
    ],
    overview:
      "A full-stack payment commitment protocol addressing delayed MSME/B2B payments through escrow-backed on-chain deal enforcement.",
    problem:
      "B2B settlements are slow and trust-dependent; capital sits idle in escrow with no yield.",
    architecture:
      "Solidity contracts for deal lifecycle management, dispute arbitration, delivery verification, settlement, and fund release, with yield-generating stablecoin escrow strategies to improve capital efficiency during locked commitment periods.",
    deployment: "Deployed across multiple testnets.",
    challenges: [
      {
        title: "Capital efficiency during lock periods",
        solution:
          "Integrated yield-generating stablecoin strategies so escrowed funds earn returns while locked, transforming dead capital into productive assets.",
      },
      {
        title: "Dispute resolution without centralized authority",
        solution:
          "Designed an on-chain arbitration mechanism with time-locked escalation paths and evidence submission, enabling trustless dispute resolution.",
      },
      {
        title: "Deal lifecycle complexity",
        solution:
          "Modeled the full payment lifecycle — creation, delivery verification, settlement, dispute, and release — as a state machine with clear transition guards.",
      },
    ],
    roadmap: [
      "Multi-token escrow support beyond stablecoins",
      "Integration with real-world invoice systems",
      "Cross-chain settlement capabilities",
      "Mainnet launch with audited contracts",
    ],
  },
  {
    slug: "dexgateway",
    name: "DexGateway",
    tagline: "Multi-Chain DEX Routing Infrastructure",
    repo: "https://github.com/Sourav-IIITBPL/DexGateway",
    logo: "",
    stack: [
      "Solidity",
      "Foundry",
      "React",
      "Node.js",
      "Express.js",
      "TypeScript",
      "The Graph",
    ],
    overview:
      "Full-stack DEX routing infrastructure integrating 7 Uniswap V2-style DEXes across 9 blockchain networks.",
    problem:
      "Liquidity is fragmented across chains and DEX forks, with no unified routing layer for swaps or LP management.",
    architecture:
      "Unified routing logic for token swaps, liquidity provisioning, and liquidity withdrawal through router abstraction; liquidity discovery, execution routing, and frontend transaction workflows across fragmented liquidity environments.",
    deployment: "Deployed across 9 blockchain networks.",
    challenges: [
      {
        title: "Router abstraction across DEX forks",
        solution:
          "Built a unified router interface that normalizes the differences between Uniswap V2-style DEX implementations, enabling single-API access to 7 different DEXes.",
      },
      {
        title: "Multi-chain liquidity discovery",
        solution:
          "Leveraged The Graph for real-time indexing of liquidity pools across 9 networks, enabling efficient route discovery and best-price execution.",
      },
      {
        title: "Frontend transaction complexity",
        solution:
          "Designed a clean transaction workflow that abstracts chain switching, token approvals, and swap execution into a seamless user experience.",
      },
    ],
    roadmap: [
      "Uniswap V3 concentrated liquidity support",
      "Cross-chain swap aggregation",
      "Advanced routing algorithms for optimal price execution",
      "Analytics dashboard for liquidity providers",
    ],
  },
  {
    slug: "protocol-invariant-checker",
    name: "Protocol Invariant Checker (PIC)",
    tagline: "DeFi Security Framework",
    repo: "https://github.com/Sourav-IIITBPL/protocol-invariant-checker",
    logo: "",
    stack: ["Rust", "CLI", "Security Tooling", "Protocol Analysis"],
    overview:
      "A modular Rust framework for automated DeFi protocol security analysis, invariant testing, and structured audit reporting.",
    problem:
      "Manual invariant checking doesn't scale across protocols with different accounting models.",
    architecture:
      "Protocol-agnostic architecture using a shared Protocol interface, enabling new protocol implementations to plug in; generates standardized security reports with severity classification, vulnerability categorization, and remediation recommendations.",
    deployment: "CLI tool — runs locally against protocol ABIs and state.",
    challenges: [
      {
        title: "Protocol-agnostic interface design",
        solution:
          "Designed a trait-based Protocol interface in Rust that abstracts protocol-specific logic, allowing new protocol analyzers to be added as plug-in modules.",
      },
      {
        title: "Standardized reporting across different vulnerability types",
        solution:
          "Built a structured report generator with severity classification (High/Medium/Low), vulnerability categorization, and actionable remediation recommendations.",
      },
    ],
    roadmap: [
      "Support for more DeFi protocol types (perpetuals, options, bridges)",
      "Integration with on-chain state for live invariant monitoring",
      "Web-based report viewer",
      "Community protocol module contributions",
    ],
  },
];
