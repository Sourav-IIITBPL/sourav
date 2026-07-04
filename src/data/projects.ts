export interface Project {
  slug: string;
  name: string;
  tagline: string;

  repo: string;
  demoUrl?: string; //optional chaining 
  logo: string;

  stack: string[];

  overview: string;
  problem: string;
  architecture: string;
  deployment: string;

  metrics: {
    label: string;
    value: string;
  }[];

  keyFeatures: string[];

  challenges: {
    title: string;
    solution: string;
  }[];

  roadmap: string[];
}

export const projects: Project[] = [
{
  slug: "preflight",

  name: "PreFlight",

  tagline: "Zero-Trust DeFi Transaction Firewall",

  repo: "https://github.com/Sourav-IIITBPL/preflight",

  logo: "/images/preflight-project-logo.png",

  stack: [
    "Solidity",
    "Foundry",
    "OpenZeppelin Contracts",
    "TypeScript",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Viem",
    "EtherJs",
    "Wagmi",
    "Chainlink CRE",
    "Chainlink Automation",
    "Browser Extension",
    "ERC4626",
    "Uniswap V2 Pools",
    "NFT",
    "RPC",
    "Sepolia",
  ],

  overview:
    "PreFlight is a protocol-aware transaction firewall that protects users before they sign blockchain transactions. It combines browser-based transaction interception, off-chain fork simulation, and on-chain protocol guards to detect malicious behavior, validate protocol invariants, and provide actionable risk insights before execution.",

  problem:
    "Modern wallets expose only low-level transaction data, forcing users to approve complex DeFi interactions without understanding hidden token transfers, malicious approvals, unsafe execution paths, or protocol-specific risks.",

  architecture:
"Browser extension intercepts transaction requests → calldata decoding identifies protocol actions → Chainlink CRE performs fork-based state simulation → on-chain Guard contracts validate protocol-specific invariants → Risk Engine aggregates findings → Risk Report NFT is minted → user chooses to execute or reject the transaction.",
  
deployment:
    "Deployed across Ethereum Sepolia, Base Sepolia, and Arbitrum Sepolia with protocol-aware security guards supporting Uniswap V2 pools and ERC-4626 vaults.",

  metrics: [
    {
      label: "Networks",
      value: "3",
    },
    {
      label: "Protocol Types",
      value: "DEX • ERC4626",
    },
    {
      label: "Security Guards",
      value: "4",
    },
    {
      label: "Simulation",
      value: "Fork-based",
    },
    {
      label: "Risk Reports",
      value: "NFT",
    },
  ],

  keyFeatures: [
    "Browser-based transaction interception before wallet confirmation",
    "Fork-based transaction simulation powered by Chainlink CRE",
    "Protocol-aware on-chain Guard contracts",
    "Hybrid risk engine combining off-chain simulation with on-chain validation",
    "Risk Report NFT generation with immutable on-chain records",
    "Support for Uniswap V2 liquidity pools and ERC-4626 vaults",
    "Multi-network deployment across Ethereum, Base, and Arbitrum testnets",
  ],

  challenges: [
    {
      title: "Real-Time Transaction Interception",
      solution:
        "Developed a browser extension capable of intercepting wallet transaction requests, decoding calldata in real time, identifying protocol interactions, and extracting execution context before user approval.",
    },
    {
      title: "Fork-Based Security Simulation",
      solution:
        "Integrated Chainlink CRE to execute transactions against forked blockchain state, enabling protocol-aware security analysis without incurring the latency and cost of on-chain execution.",
    },
    {
      title: "Protocol-Aware Risk Validation",
      solution:
        "Designed modular Guard contracts that validate protocol-specific invariants across DEX and ERC-4626 interactions while combining off-chain simulation results into a unified security assessment.",
    },
    {
      title: "Immutable Risk Reporting",
      solution:
        "Built an NFT-based reporting pipeline that permanently stores transaction metadata, detected vulnerabilities, confidence scores, and simulation outcomes, creating an auditable security trail.",
    },
  ],

  roadmap: [
    "Expand protocol support to lending, perpetuals, staking, and cross-chain applications.",
    "Integrate with additional EVM-compatible wallets and account abstraction flows.",
    "Deploy production-ready infrastructure across Ethereum mainnet and major Layer-2 networks.",
    "Introduce community-governed protocol risk models and configurable security policies.",
    "Leverage AI-assisted transaction explainability for intuitive and contextual risk analysis.",
  ],
},
{
  slug: "settleone",

  name: "SettleOne",

  tagline: "Yield-Enabled Payment Commitment Protocol",

  repo: "https://github.com/Sourav-IIITBPL/settleOne",

  logo: "/images/settleone-project-logo.png",

  stack: [
    "Solidity",
    "Foundry",
    "Chainlink Automation",
    "OpenZeppelin Contracts",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Viem",
    "EtherJs",
    "Wagmi",
    "Stablecoins",
    "ERC4626",
    "ERC20",
    "B2B Payments",
    "Aave Yield",
    "DeFi Yield Strategies",
  ],

  overview:
    "SettleOne is a decentralized payment commitment protocol designed for MSME and B2B settlements. It combines escrow-backed payment commitments with yield-generating vaults, allowing locked capital to remain productive while enforcing transparent settlement, delivery verification, and dispute resolution on-chain.",

  problem:
    "Traditional B2B payments rely on trust, manual reconciliation, and centralized intermediaries. Funds remain idle during settlement periods, disputes are expensive to resolve, and neither buyers nor sellers have cryptographically verifiable guarantees throughout the transaction lifecycle.",

  architecture:
  "Buyer locks stablecoins into EscrowVault → Funds are allocated to ERC-4626 yield vaults during the commitment period → Seller fulfills delivery obligations → Delivery verification or dispute resolution determines settlement outcome → Protocol state machine enforces valid transitions → Principal, generated yield, and protocol fees are distributed → Escrow is finalized and the payment commitment is completed.",

  deployment:
    "Actively developed on Ethereum Sepolia.",

  metrics: [
    {
      label: "Settlement Model",
      value: "Escrow-based",
    },
    {
      label: "Yield Strategy",
      value: "ERC4626",
    },
    {
      label: "Deal Types",
      value: "Digital • Physical",
    },
    {
      label: "Settlement",
      value: "On-chain",
    },
    {
      label: "Dispute Resolution",
      value: "Protocol-native",
    },
  ],

  keyFeatures: [
    "Escrow-backed payment commitments",
    "Yield generation on locked stablecoin capital",
    "Protocol-managed payment lifecycle",
    "Digital and physical goods settlement support",
    "On-chain dispute resolution workflow",
    "State-machine driven settlement engine",
    "ERC-4626 vault integration for capital efficiency",
    "Deterministic release and settlement logic",
  ],

  challenges: [
    {
      title: "Capital Efficiency During Settlement",
      solution:
        "Integrated ERC-4626 yield vaults so escrowed stablecoins continue generating yield throughout the payment commitment period instead of remaining idle.",
    },
    {
      title: "Trust-Minimized Dispute Resolution",
      solution:
        "Designed a protocol-native dispute workflow with deterministic state transitions, configurable dispute windows, and evidence-driven settlement paths for both digital and physical deliveries.",
    },
    {
      title: "Complex Payment Lifecycle",
      solution:
        "Modeled every payment commitment as a finite-state machine governing commitment, delivery verification, settlement, dispute handling, cancellation, and fund release while enforcing protocol invariants at each transition.",
    },
    {
      title: "Secure Yield Distribution",
      solution:
        "Designed accounting logic to separate principal, generated yield, platform fees, and beneficiary payouts while maintaining accurate escrow balances throughout the protocol lifecycle.",
    },
  ],
   
  roadmap: [
    "Support multiple ERC-4626 vault providers and yield strategies.",
    "Support multi-chain payment commitments across major EVM ecosystems.",
    "Integrate decentralized identity and business reputation systems.",
    "Introduce programmable settlement conditions and milestone-based payments.",
    "Launch protocol governance and audited production deployment.",
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
    "TypeScript",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "The Graph",
    "EtherJs",
    "Uniswap V2",
  ],

  overview:
    "DexGateway is a full-stack multi-chain DEX routing infrastructure that unifies liquidity discovery, token swaps, and liquidity management across multiple Uniswap V2-compatible decentralized exchanges through a single protocol-agnostic interface.",

  problem:
    "Liquidity is fragmented across blockchain networks and Uniswap V2 forks, forcing users and applications to integrate different router contracts, APIs, and transaction workflows for each DEX implementation.",

  architecture:
    "User selects swap or liquidity operation → Router abstraction identifies the target DEX and network → Backend indexes liquidity pools through The Graph → Best execution path is constructed → Unified router executes swaps or liquidity operations → Frontend manages approvals, network switching, transaction execution, and user feedback.",

  deployment:
    "Deployed across various EVM-compatible blockchain testnet networks with support for seven Uniswap V2-style decentralized exchanges.",

  metrics: [
    {
      label: "Networks",
      value: "5",
    },
    {
      label: "DEX Integrations",
      value: "7",
    },
    {
      label: "AMM Standard",
      value: "Uniswap V & its forks",
    },
    {
      label: "Liquidity Indexing",
      value: "The Graph",
    },
    {
      label: "Operations",
      value: "Swap • Add LP • Remove LP",
    },
  ],

  keyFeatures: [
    "Unified router abstraction across multiple Uniswap V2 forks",
    "Multi-chain token swap execution",
    "Cross-network liquidity discovery",
    "Liquidity provisioning and withdrawal",
    "Real-time pool indexing through The Graph",
    "Protocol-agnostic transaction workflows",
    "Automatic network and router selection",
    "Developer-friendly routing infrastructure",
  ],

  challenges: [
    {
      title: "Router Abstraction",
      solution:
        "Designed a protocol-agnostic router layer that normalizes differences across multiple Uniswap V2 implementations, enabling a consistent interface for swaps and liquidity management.",
    },
    {
      title: "Multi-Chain Liquidity Discovery",
      solution:
        "Integrated The Graph to continuously index liquidity pools across supported networks, enabling efficient pool discovery and routing decisions without directly querying on-chain state.",
    },
    {
      title: "Cross-Protocol Transaction Flow",
      solution:
        "Built a unified transaction pipeline that abstracts token approvals, router selection, network switching, calldata generation, and transaction execution into a seamless developer and user experience.",
    },
    {
      title: "Scalable Integration Architecture",
      solution:
        "Structured the routing infrastructure around modular protocol adapters, allowing additional DEX integrations to be introduced with minimal changes to the core routing engine.",
    },
  ],

  roadmap: [
    "Support Uniswap V3 concentrated liquidity pools.",
    "Introduce cross-chain swap aggregation and bridge-aware routing.",
    "Implement advanced pathfinding and price optimization algorithms.",
    "Expand support to additional AMM protocols beyond Uniswap V2.",
    "Provide SDKs and APIs for third-party protocol integrations.",
  ],
},

{
  slug: "protocol-invariant-checker",

  name: "Protocol Invariant Checker (PIC)",

  tagline: "Protocol Security Analysis Framework",

  repo: "https://github.com/Sourav-IIITBPL/protocol-invariant-checker",

  logo: "",

  stack: [
    "Rust",
    "CLI",
    "Protocol Analysis",
    "Invariant Testing",
    "Security Tooling",
    "ERC4626 Vaults Invariants",
    "Uniswap V2 Invariants",
    "Solana Protocol Invariants",
  ],

  overview:
    "Protocol Invariant Checker (PIC) is a modular Rust-based security analysis framework that automates protocol invariant validation, deterministic state simulation, and structured security reporting. It enables protocol-specific security analyzers to share a common architecture while simplifying the development of reusable security tooling.",

  problem:
    "Modern DeFi protocols implement unique accounting models and protocol invariants, making manual security analysis difficult to scale and challenging to standardize across different protocol categories.",

  architecture:
    "CLI loads protocol configuration → Protocol registry resolves the appropriate analyzer → Shared Protocol trait executes protocol-specific invariant validation → Simulation engine evaluates deterministic state transitions → Security engine detects invariant violations → Structured report generator produces categorized findings with severity classification and remediation guidance.",

  deployment:
    "Cross-platform Rust CLI designed for local protocol analysis with an extensible architecture for future integration into automated security pipelines.",

  metrics: [
    {
      label: "Language",
      value: "Rust",
    },
    {
      label: "Interface",
      value: "CLI",
    },
    {
      label: "Architecture",
      value: "Modular",
    },
    {
      label: "Analysis",
      value: "Invariant-driven",
    },
    {
      label: "Reporting",
      value: "Structured",
    },
  ],

  keyFeatures: [
    "Protocol-agnostic security analysis architecture",
    "Trait-based modular protocol interface",
    "Deterministic invariant validation",
    "Reusable protocol analyzer modules",
    "Structured vulnerability reporting",
    "Severity classification and remediation guidance",
    "Extensible plugin architecture for new protocol types",
    "Developer-friendly Rust CLI workflow",
  ],

  challenges: [
    {
      title: "Protocol-Agnostic Architecture",
      solution:
        "Designed a trait-based Protocol interface that abstracts protocol-specific security logic while allowing new protocol analyzers to integrate through reusable modular components.",
    },
    {
      title: "Generalized Invariant Engine",
      solution:
        "Developed a shared invariant evaluation engine capable of validating protocol-specific accounting rules without coupling the framework to a single DeFi protocol design.",
    },
    {
      title: "Reusable Security Reporting",
      solution:
        "Implemented a standardized reporting system that classifies detected issues, groups vulnerabilities by category, and generates actionable remediation guidance independent of protocol implementation.",
    },
    {
      title: "Scalable Framework Design",
      solution:
        "Structured the framework around independent registries, analyzers, simulation modules, and reporting components, enabling future protocol support without modifying the core engine.",
    },
  ],

  roadmap: [
    "Expand support to AMMs, lending protocols, staking systems, bridges, perpetuals, and options.",
    "Integrate Foundry and on-chain state for live protocol analysis.",
    "Introduce differential testing and advanced stateful fuzzing workflows.",
    "Provide machine-readable JSON reports and CI/CD integration.",
    "Develop a web dashboard for interactive security reports and protocol visualization.",
  ],
},
];
