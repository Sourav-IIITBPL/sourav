export interface AuditEntry {
  protocol: string;
  platform: "Sherlock" | "Code4rena" | "Cantina";
  category: string;
  status: string;
  findingSummary?: string;
  link: string;
}

export const validatedFindings: AuditEntry[] = [
  {
    protocol: "dreLabs",
    platform: "Sherlock",
    category: "Lending",
    status: "Findings Validated",
    findingSummary: "Critical lending pool accounting vulnerability",
    link: "#",
  },
  {
    protocol: "Macro",
    platform: "Sherlock",
    category: "AMM",
    status: "Findings Validated",
    findingSummary: "AMM swap routing edge case",
    link: "#",
  },
  {
    protocol: "Monetrix",
    platform: "Code4rena",
    category: "Vaults",
    status: "Findings Validated",
    findingSummary: "ERC4626 vault share inflation",
    link: "#",
  },
  {
    protocol: "Chainlink",
    platform: "Code4rena",
    category: "Oracle",
    status: "Findings Validated",
    findingSummary: "Price feed staleness check bypass",
    link: "#",
  },
];

export const auditArchive: AuditEntry[] = [
  {
    protocol: "dreLabs",
    platform: "Sherlock",
    category: "Lending",
    status: "Findings Validated",
    link: "#",
  },
  {
    protocol: "Macro",
    platform: "Sherlock",
    category: "AMM",
    status: "Findings Validated",
    link: "#",
  },
  {
    protocol: "Monetrix",
    platform: "Code4rena",
    category: "Vaults",
    status: "Findings Validated",
    link: "#",
  },
];

export const securityKnowledge = [
  {
    title: "Reentrancy",
    description: "Cross-function and cross-contract reentrancy detection and prevention patterns",
  },
  {
    title: "Flash Loan Attacks",
    description: "Identifying flash loan-vulnerable state transitions and oracle dependencies",
  },
  {
    title: "Oracle Manipulation",
    description: "TWAP manipulation, Chainlink staleness, and multi-oracle fallback strategies",
  },
  {
    title: "ERC4626 Vault Exploits",
    description: "Share inflation, donation attacks, and rounding-direction vulnerabilities",
  },
  {
    title: "LayerZero / Cross-Chain Messaging",
    description: "Message replay, endpoint trust assumptions, and cross-chain state consistency",
  },
  {
    title: "Permit & Signature Replay",
    description: "EIP-2612 permit front-running, signature malleability, and nonce management",
  },
  {
    title: "Protocol Accounting",
    description: "Invariant-based accounting verification across lending, staking, and vault protocols",
  },
  {
    title: "Access Control",
    description: "Role-based access patterns, privilege escalation, and initializer vulnerabilities",
  },
  {
    title: "Fuzz & Invariant Testing",
    description: "Stateful fuzzing campaigns, invariant definition, and edge-case coverage strategies",
  },
];

export const methodologySteps = [
  "Recon",
  "Threat Modeling",
  "Protocol Accounting Analysis",
  "Attack Surface Mapping",
  "Invariant Mapping",
  "Fuzz/Invariant Testing",
  "PoC Development",
  "Report Writing",
];
