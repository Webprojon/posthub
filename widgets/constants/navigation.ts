import { RiGithubLine, RiLinkedinLine, RiTwitterXLine } from "react-icons/ri";
import { IconType } from "react-icons";

export type NavLink = {
  label: string;
  href: string;
};

export type NetworkLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Create Post", href: "/create" },
];

export const NETWORK_LINKS: NetworkLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: RiGithubLine,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: RiLinkedinLine,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: RiTwitterXLine,
  },
];
