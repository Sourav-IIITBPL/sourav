export interface AuditEntry {
  protocol: string;
  platform: "Sherlock" | "Code4rena" | "Cantina";
  category: string;
  severity: string[];
  status: "Validated";
  time: string;
  rank: string;
  findings: number;
  findingSummary: string;
  technologies: string[];
  link: string;
}

export interface AuditArchive {
  protocol: string;
  platform: "Sherlock" | "Code4rena" | "Cantina";
  date: string;
  link: string;
}

export const validatedFindings: AuditEntry[] = [
  {
    protocol: "USG-Tangent",
    platform: "Sherlock",
    category: "Staking Protocol",
    severity: ["Medium"],
    status: "Validated",
    time: "Aug 2025",
    rank: "62",
    findings: 1,
    findingSummary:
      "First depositor captures accrued staking rewards, breaking reward distribution fairness.",
    technologies: ["Staking", "Rewards", "Accounting"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-08-usg-tangent-submissions.md#m-1-first-depositor-will-capture-accrued-rewards-for-stakers",
  },
  {
    protocol: "Ammplify",
    platform: "Sherlock",
    category: "AMM / Maker Protocol",
    severity: ["Medium"],
    status: "Validated",
    time: "Sept 2025",
    rank: "75",
    findings: 1,
    findingSummary:
      "Asset creation griefing permanently exhausts maker position limits for victims.",
    technologies: ["AMM", "Maker", "DoS"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-09-ammplify-submissions.md#m-1--denial-of-service-griefing-attacker-can-force-create-maker-assets-for-a-victim-exhausting-max_assets_per_owner-and-blocking-legitimate-maker-positions",
  },
  {
    protocol: "Super DCA Liquidity Network",
    platform: "Sherlock",
    category: "DCA / Liquidity Network",
    severity: ["High"],
    status: "Validated",
    time: "Sept 2025",
    rank: "52",
    findings: 1,
    findingSummary:
      "Same-block stake/unstake front-running enables indefinite reward distribution denial-of-service.",
    technologies: ["Staking", "MEV", "Rewards"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-09-super-dca-submissions.md#h-1-keepermev-can-indefinitely-block-reward-distribution-by-same-block-stakeunstake-front-run-accruereward-dos",
  },
  {
    protocol: "Hybra Finance",
    platform: "Code4rena",
    category: "DEX Infrastructure",
    severity: ["High", "QA"],
    status: "Validated",
    time: "Oct 2025",
    rank: "31",
    findings: 6,
    findingSummary:
      "First-depositor frontrun permanently prevents share minting, causing protocol-wide deposit denial-of-service.",
    technologies: ["ERC4626", "Vaults", "DoS"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-10-hybra-finance-submissions.md",
  },
  {
    protocol: "Flying Tulip",
    platform: "Sherlock",
    category: "Spot Trading / Lending",
    severity: [""],
    status: "Validated",
    time: "Jan 2026",
    rank: "213",
    findings: 0,
    findingSummary:
      "",
    technologies: ["Spot Trading", "Lending", "Accounting"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-01-flying-tulip-submissions.md",
  },
  {
    protocol: "VII Finance",
    platform: "Cantina",
    category: "AMM / Lending Protocol",
    severity: ["Medium"],
    status: "Validated",
    time: "Jan 2026",
    rank: "25",
    findings: 1,
    findingSummary:
      "Broken yield smoothing invariant enables profitable just-in-time liquidity exploitation.",
    technologies: ["AMM", "Lending", "Yield"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-01-VII-Finance-submissions.md#m1---broken-yield-smoothing-invariant-enables-jit-liquidity-exploitation",
  },
  {
    protocol: "Chainlink Payment Abstraction V2",
    platform: "Code4rena",
    category: "Oracle Protocol",
    severity: ["Low"],
    status: "Validated",
    time: "Mar 2026",
    rank: "",
    findings: 1,
    findingSummary:
      "Auction settlement can be blocked when a single eligible asset fails minimum auction validation.",
    technologies: ["Chainlink", "Automation", "Auctions"],
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-03-chainlink-submissions.md#l1---performupkeep-reverts-entirely-when-any-eligible-asset-fails-the-minimum-auction-size-check-blocking-live-auction-endings-and-locking-auctioned-funds-in-the-contract",
  },
];

export const auditArchive: AuditArchive[] = [
  {
    protocol: "Morpheus",
    platform: "Code4rena",
    date: "2025-08",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-08-morpheus-submissions.md",
  },
  {
    protocol: "USG Tangent",
    platform: "Sherlock",
    date: "2025-08",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-08-usg-tangent-submissions.md",
  },
  {
    protocol: "Ammplify",
    platform: "Sherlock",
    date: "2025-09",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-09-ammplify-submissions.md",
  },
  {
    protocol: "Summer.fi Governance V2",
    platform: "Sherlock",
    date: "2025-09",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-09-summer-fi-governance-v2-submissions.md",
  },
  {
    protocol: "Super DCA",
    platform: "Sherlock",
    date: "2025-09",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-09-super-dca-submissions.md",
  },
  {
    protocol: "Centrifuge Protocol V3.1",
    platform: "Sherlock",
    date: "2025-10",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-10-centrifuge-protocol-v3-1-submissions.md",
  },
  {
    protocol: "Covenant",
    platform: "Code4rena",
    date: "2025-10",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-10-covenant-submissions.md",
  },
  {
    protocol: "Hybra Finance",
    platform: "Code4rena",
    date: "2025-10",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-10-hybra-finance-submissions.md",
  },
  {
    protocol: "Index.fun Order Book",
    platform: "Sherlock",
    date: "2025-10",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-10-index-fun-order-book-contest-submissions.md",
  },
  {
    protocol: "Aave V4",
    platform: "Sherlock",
    date: "2025-11",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-11-aave-v4-submissions.md",
  },
  {
    protocol: "Ekubo",
    platform: "Code4rena",
    date: "2025-11",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-11-ekubo-submissions.md",
  },
  {
    protocol: "stNXM by EaseDeFi",
    platform: "Sherlock",
    date: "2025-11",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-11-stnxm-by-easedefi-submissions.md",
  },
  {
    protocol: "SukukFi",
    platform: "Code4rena",
    date: "2025-11",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-11-sukukfi-submissions.md",
  },
  {
    protocol: "Monolith Stablecoin Factory",
    platform: "Sherlock",
    date: "2025-12",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2025-12-monolith-stablecoin-factory-submissions.md",
  },
  {
    protocol: "VII Finance",
    platform: "Cantina",
    date: "2026-01",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-01-VII-Finance-submissions.md",
  },
  {
    protocol: "Fluid DEX V2",
    platform: "Sherlock",
    date: "2026-01",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-01-fluid-dex-v2-submissions.md",
  },
  {
    protocol: "Flying Tulip",
    platform: "Sherlock",
    date: "2026-01",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-01-flying-tulip-submissions.md",
  },
  {
    protocol: "Chainlink Payment Abstraction V2",
    platform: "Code4rena",
    date: "2026-03",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-03-chainlink-submissions.md",
  },
  {
    protocol: "Macro",
    platform: "Sherlock",
    date: "2026-04",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-04-macro-submissions.md",
  },
  {
    protocol: "Monetrix",
    platform: "Code4rena",
    date: "2026-04",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-04-monetrix-submissions.md",
  },
  {
    protocol: "dreLabs",
    platform: "Sherlock",
    date: "2026-06",
    link: "https://github.com/Sourav-IIITBPL/audits/blob/main/competitive-audits/2026-06-dre-labs-submissions.md",
  },
];


export const securityKnowledge = [
  {
    title: "Reentrancy",
    description: "Cross-function, cross-contract, read-only reentrancy, and CEI-based mitigation patterns",
  },
  {
    title: "Flash Loan Attacks",
    description: "Atomic capital attacks, state manipulation, and flash loan-assisted exploit chains",
  },
  {
    title: "Oracle Manipulation",
    description: "TWAP manipulation, Chainlink staleness, low-liquidity pricing, and multi-oracle validation",
  },
  {
    title: "ERC4626 Vault Security",
    description: "Share inflation, donation attacks, first depositor exploits, and rounding vulnerabilities",
  },
  {
    title: "AMM Security",
    description: "Swap accounting, liquidity invariants, reserve manipulation, and fee calculation correctness",
  },
  {
    title: "Cross-Chain Messaging",
    description: "LayerZero messaging, replay attacks, endpoint trust assumptions, and state consistency",
  },
  {
    title: "Bridge Security",
    description: "Mint/burn correctness, message verification, relayer assumptions, and bridge accounting",
  },
  {
    title: "Permit & Signature Security",
    description: "EIP-2612, Permit2, nonce management, replay protection, and signature validation",
  },
  {
    title: "Access Control",
    description: "RBAC, Ownable patterns, privilege escalation, initializer protection, and admin safety",
  },
  {
    title: "Upgradeable Contracts",
    description: "UUPS, Transparent proxies, storage layout collisions, initialization, and upgrade safety",
  },
  {
    title: "Precision & Rounding",
    description: "Fixed-point math, precision loss, truncation bias, dust accumulation, and decimal mismatches",
  },
  {
    title: "Integer Arithmetic",
    description: "Overflow, underflow, unsafe casting, signed/unsigned conversion, and unchecked math",
  },
  {
    title: "Denial of Service",
    description: "Gas griefing, revert griefing, unbounded loops, block gas limits, and stuck funds",
  },
  {
    title: "MEV & Front-Running",
    description: "Sandwich attacks, transaction ordering, commit-reveal schemes, and slippage protection",
  },
  {
    title: "Token Integration",
    description: "Non-standard ERC20s, fee-on-transfer, rebasing, blacklisting, and callback-enabled tokens",
  },
  {
    title: "External Call Safety",
    description: "Low-level calls, delegatecall risks, return-value validation, and callback assumptions",
  },
  {
    title: "Liquidation Logic",
    description: "Collateral valuation, health factor calculation, liquidation incentives, and bad debt",
  },
  {
    title: "Staking & Reward Systems",
    description: "Reward accounting, emission schedules, checkpointing, and distribution correctness",
  },
  {
    title: "Invariant Testing",
    description: "Stateful fuzzing, protocol invariants, differential testing, and adversarial simulation",
  }
];

export const methodologySteps = [
  "Reconnaissance",
  "Architecture Analysis",
  "Threat Modeling",
  "Protocol Accounting",
  "Attack Surface Analysis",
  "Invariant Identification",
  "Manual Code Review",
  "Fuzz & Invariant Testing",
  "Proof of Concept",
  "Report Writing",
];
