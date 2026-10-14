import { GA_ID } from "./constants";

/**
 * Cookie consent for Google Analytics (art. 399 PKE, RODO): GA is loaded only
 * after the visitor accepts the cookie banner. index.html sets Google Consent
 * Mode to "denied" before any tag runs, so a GA snippet injected outside the
 * app (e.g. Netlify snippet injection) cannot store cookies without consent.
 */

export type CookieConsent = "granted" | "denied";

/** Also read by the inline Consent Mode script in index.html and 404.html. */
const STORAGE_KEY = "mbar-cookie-consent";
const OPEN_SETTINGS_EVENT = "mbar:open-cookie-settings";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag.js only understands the Arguments object, not a plain array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  window.gtag(...args);
}

/** The banner is shown only when there is something to consent to. */
export const isConsentRequired = Boolean(GA_ID);

export function readConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function saveConsent(consent: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    /* ignore */
  }
  applyConsent(consent);
}

export function applyConsent(consent: CookieConsent) {
  gtag("consent", "update", { analytics_storage: consent });
  if (consent === "granted") loadGoogleAnalytics();
  else deleteAnalyticsCookies();
}

function loadGoogleAnalytics() {
  if (!GA_ID) return;
  // Already on the page (loaded earlier, or injected by Netlify).
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  gtag("js", new Date());
  gtag("config", GA_ID);
}

/** GA sets _ga / _ga_<ID> on the root domain; expire them on withdrawal. */
function deleteAnalyticsCookies() {
  const { hostname } = window.location;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}`;
  }
}

/** Reopens the banner so the visitor can change their choice (footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(listener: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, listener);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, listener);
}
