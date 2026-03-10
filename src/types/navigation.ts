/** Shared navigation primitives used across the single-page app. */
export type Page = "home" | "gallery" | "prices" | "about" | "contact";

/** Shared type for page navigation handler. Used by Header, Footer, Hero, CallToAction, PriceList. */
export type NavigateHandler = (page: Page, pkg?: string) => void;
