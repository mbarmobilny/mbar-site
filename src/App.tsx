import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { IceCubeSpinner } from "./components/IceCubeSpinner";
import { ScrollToTop } from "./components/ScrollToTop";
import { useLanguage } from "./context/LanguageContext";
import type { Page } from "./types/navigation";

const Gallery = lazy(() =>
  import("./components/Gallery").then((m) => ({ default: m.Gallery }))
);
const PriceList = lazy(() =>
  import("./components/PriceList").then((m) => ({ default: m.PriceList }))
);
const About = lazy(() =>
  import("./components/About").then((m) => ({ default: m.About }))
);
const ContactForm = lazy(() =>
  import("./components/ContactForm").then((m) => ({ default: m.ContactForm }))
);

const VALID_PAGES: Page[] = ["home", "gallery", "prices", "about", "contact"];

function getPageFromHash(hash: string): Page {
  const normalized = hash.replace(/^#/, "");
  return VALID_PAGES.includes(normalized as Page)
    ? (normalized as Page)
    : "home";
}

function setMetaContent(selector: string, content: string) {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content);
}

export default function App() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    typeof window === "undefined"
      ? "home"
      : getPageFromHash(window.location.hash)
  );
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleNavigate = (page: Page, pkg?: string) => {
    setSelectedPackage(pkg ?? "");
    setCurrentPage(page);

    if (typeof window !== "undefined" && window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncPageFromHash = () => {
      setCurrentPage(getPageFromHash(window.location.hash));
    };

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);
    return () => window.removeEventListener("hashchange", syncPageFromHash);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const pageLabel =
      currentPage === "home"
        ? language === "pl"
          ? "Strona główna"
          : "Home"
        : currentPage === "gallery"
          ? language === "pl"
            ? "Galeria"
            : "Gallery"
          : currentPage === "prices"
            ? language === "pl"
              ? "Pakiety"
              : "Packages"
            : currentPage === "about"
              ? language === "pl"
                ? "O nas"
                : "About"
              : language === "pl"
                ? "Kontakt"
                : "Contact";

    const description =
      language === "pl"
        ? "mBar — premium mobilny bar na wesela, eventy firmowe i prywatne przyjęcia."
        : "mBar — premium mobile bar service for weddings, corporate events and private celebrations.";

    const title =
      currentPage === "home"
        ? "mBar — Premium Mobilny Bar"
        : `mBar — ${pageLabel}`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent(
      'meta[property="og:locale"]',
      language === "pl" ? "pl_PL" : "en_US"
    );
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [currentPage, language]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5,
  };

  const renderPage = () => {
    switch (currentPage) {
      case "gallery":
        return <Gallery />;
      case "prices":
        return <PriceList onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "contact":
        return <ContactForm selectedPackage={selectedPackage} />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Services />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex-grow"
        >
          <Suspense fallback={<IceCubeSpinner />}>{renderPage()}</Suspense>
        </motion.div>
      </AnimatePresence>

      {currentPage !== "contact" && (
        <CallToAction onNavigate={handleNavigate} />
      )}
      <Footer onNavigate={handleNavigate} />
      <ScrollToTop />
      <Toaster position="bottom-right" />
    </div>
  );
}
