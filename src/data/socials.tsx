import { SiGithub, SiLeetcode } from "react-icons/si";

export const FaviconIcon = (domain: string) => {
  const Icon = (props: any) => (
    <img 
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} 
      width={props.size || 20} 
      height={props.size || 20} 
      alt={`${domain} logo`} 
      style={{ borderRadius: '4px', objectFit: 'contain' }} 
    />
  );
  Icon.displayName = `FaviconIcon_${domain}`;
  return Icon;
};

export interface SocialProfile {
  name: string;
  handle: string;
  url?: string;
  icon: any;
  stat?: string;
  copyable?: boolean;
}

export const profiles: SocialProfile[] = [
  {
    name: "GitHub",
    handle: "Sourav-IIITBPL",
    url: "https://github.com/Sourav-IIITBPL",
    icon: SiGithub,
  },
  {
    name: "Cyfrin",
    handle: "sourav_dev",
    url: "https://profiles.cyfrin.io/u/sourav_dev",
    icon: FaviconIcon("cyfrin.io"),
  },
  {
    name: "Sherlock",
    handle: "sourav_DEV",
    url: "https://audits.sherlock.xyz/watson/sourav_DEV",
    icon: FaviconIcon("sherlock.xyz"),
  },
  {
    name: "Code4rena",
    handle: "@Sourav_DEV",
    url: "https://code4rena.com/@Sourav_DEV",
    icon: FaviconIcon("code4rena.com"),
  },
  {
    name: "Cantina",
    handle: "0xSourav",
    url: "https://cantina.xyz/u/0xSourav",
    icon: FaviconIcon("cantina.xyz"),
  },
  {
    name: "LeetCode",
    handle: "SouravIIIT",
    url: "https://leetcode.com/u/SouravIIIT",
    icon: SiLeetcode,
    stat: "1868 Rating · Knight",
  },
];

export interface ContactLink {
  label: string;
  value: string;
  url?: string;
  copyable?: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "sourav.dev.official@outlook.com",
    url: "mailto:sourav.dev.official@outlook.com",
    copyable: true,
  },
  {
    label: "Alt Email",
    value: "sourav.dev.officials@gmail.com",
    url: "mailto:sourav.dev.officials@gmail.com",
    copyable: true,
  },
  {
    label: "Discord",
    value: "miracles_25",
    copyable: true,
  },
  {
    label: "Telegram",
    value: "@sourav-developer",
    url: "https://t.me/sourav-developer",
  },
  {
    label: "X",
    value: "@0xSouravAudit",
    url: "https://x.com/0xSouravAudit",
  },
];

export const footerProfiles = [
  { name: "GitHub", url: "https://github.com/Sourav-IIITBPL" },
  { name: "Sherlock", url: "https://audits.sherlock.xyz/watson/sourav_DEV" },
  { name: "Code4rena", url: "https://code4rena.com/@Sourav_DEV" },
  { name: "Cantina", url: "https://cantina.xyz/u/0xSourav" },
  { name: "LinkedIn", url: "https://linkedin.com/in/0xsourav" },
];
