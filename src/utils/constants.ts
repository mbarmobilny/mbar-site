/**
 * Contact and social URLs.
 * VITE_* env vars are public (exposed to client).
 */
export const PHONE = import.meta.env.VITE_PHONE || "+48578224721";
export const EMAIL = import.meta.env.VITE_EMAIL || "mbarmobilny@gmail.com";
export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as
  | string
  | undefined;
export const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/mbarmobilny";
export const FACEBOOK_URL =
  import.meta.env.VITE_FACEBOOK_URL ||
  "https://www.facebook.com/share/17HJkD8LRt/";
