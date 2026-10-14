import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import {
  type CookieConsent,
  applyConsent,
  isConsentRequired,
  onOpenCookieSettings,
  readConsent,
  saveConsent,
} from "../utils/cookieConsent";

// Headless Chrome = the build-time prerender; keep the banner out of the
// static HTML so it does not flash for visitors who already chose.
function isBannerEnabled() {
  return isConsentRequired && !navigator.webdriver;
}

export function CookieBanner() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(
    () => isBannerEnabled() && readConsent() === null
  );

  useEffect(() => {
    if (!isBannerEnabled()) return undefined;

    const consent = readConsent();
    if (consent) applyConsent(consent);

    return onOpenCookieSettings(() => setIsVisible(true));
  }, []);

  const choose = (consent: CookieConsent) => {
    saveConsent(consent);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="cookie-banner"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-text"
        >
          <div>
            <h2 id="cookie-banner-title" className="cookie-banner-title">
              {getTranslation(language, "cookieTitle")}
            </h2>
            <p id="cookie-banner-text" className="cookie-banner-text">
              {getTranslation(language, "cookieText")}
            </p>
          </div>
          {/* Equal weight on purpose: rejecting must be as easy as accepting. */}
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="cookie-banner-btn"
              onClick={() => choose("denied")}
            >
              {getTranslation(language, "cookieReject")}
            </button>
            <button
              type="button"
              className="cookie-banner-btn"
              onClick={() => choose("granted")}
            >
              {getTranslation(language, "cookieAccept")}
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
