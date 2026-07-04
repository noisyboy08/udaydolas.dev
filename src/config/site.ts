import { USER } from "@/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://udayy.tech",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Components",
    href: "/components",
  },
];

export const SOURCE_CODE_GITHUB_REPO = "noisyboy08/udaydolas-portfolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/noisyboy08";

export const UTM_PARAMS = {
  utm_source: "udayy.tech",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
