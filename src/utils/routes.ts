import type { Page } from "../types/navigation";

export const SITE_ORIGIN = "https://mbar.events";

/**
 * Path-based routes (Polish slugs for SEO).
 * Keep in sync with public/sitemap.xml and scripts/prerender.mjs.
 */
export const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  gallery: "/galeria",
  prices: "/cennik",
  about: "/o-nas",
  contact: "/kontakt",
  poznan: "/mobilny-bar-poznan",
  wroclaw: "/mobilny-bar-wroclaw",
};

const PATH_TO_PAGE = new Map<string, Page>(
  (Object.entries(PAGE_PATHS) as [Page, string][]).map(([page, path]) => [
    path,
    page,
  ])
);

/** Old hash routes (#gallery etc.) — redirected to path routes on load. */
const LEGACY_HASH_TO_PAGE: Partial<Record<string, Page>> = {
  home: "home",
  gallery: "gallery",
  prices: "prices",
  about: "about",
  contact: "contact",
};

/** Collapse trailing slashes so "/cennik/" resolves like "/cennik". */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function getPageFromPath(pathname: string): Page {
  return PATH_TO_PAGE.get(normalizePath(pathname)) ?? "home";
}

export function getLegacyPageFromHash(hash: string): Page | null {
  return LEGACY_HASH_TO_PAGE[hash.replace(/^#/, "")] ?? null;
}

/** Absolute canonical URL (without query) for a page. */
export function getCanonicalUrl(page: Page): string {
  const path = PAGE_PATHS[page];
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}
