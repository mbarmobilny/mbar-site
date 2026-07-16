import { useState, useEffect, lazy, Suspense, type ComponentType } from "react";
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
import {
  PAGE_PATHS,
  getPageFromPath,
  getLegacyPageFromHash,
  getCanonicalUrl,
  normalizePath,
} from "./utils/routes";

type LazyModule<P extends object> = {
  default: ComponentType<P>;
};

function isDynamicImportError(error: unknown): error is Error {
  return (
    error instanceof Error &&
    /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk [\w-]+ failed/i.test(
      error.message
    )
  );
}

function lazyWithRetry<P extends object>(
  importer: () => Promise<LazyModule<P>>,
  retryKey: string
) {
  return lazy(async () => {
    try {
      const module = await importer();
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(retryKey);
      }
      return module;
    } catch (error) {
      if (
        typeof window !== "undefined" &&
        isDynamicImportError(error) &&
        window.sessionStorage.getItem(retryKey) !== "1"
      ) {
        window.sessionStorage.setItem(retryKey, "1");
        window.location.reload();
        return new Promise<LazyModule<P>>(() => {});
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(retryKey);
      }
      throw error;
    }
  });
}

const Gallery = lazyWithRetry(
  () => import("./components/Gallery").then((m) => ({ default: m.Gallery })),
  "mbar-lazy-retry:gallery"
);
const PriceList = lazyWithRetry(
  () =>
    import("./components/PriceList").then((m) => ({ default: m.PriceList })),
  "mbar-lazy-retry:pricelist"
);
const About = lazyWithRetry(
  () => import("./components/About").then((m) => ({ default: m.About })),
  "mbar-lazy-retry:about"
);
const ContactForm = lazyWithRetry(
  () =>
    import("./components/ContactForm").then((m) => ({ default: m.ContactForm })),
  "mbar-lazy-retry:contact"
);
const CityLanding = lazyWithRetry(
  () =>
    import("./components/CityLanding").then((m) => ({
      default: m.CityLanding,
    })),
  "mbar-lazy-retry:city"
);

function setMetaContent(selector: string, content: string) {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content);
}

function setMetaById(id: string, content: string) {
  document.getElementById(id)?.setAttribute("content", content);
}

function setLinkHref(id: string, href: string) {
  document.getElementById(id)?.setAttribute("href", href);
}

/** Per-page titles and descriptions (baked into prerendered HTML). */
const PAGE_META: Record<
  Page,
  Record<"pl" | "en", { title: string; description: string }>
> = {
  home: {
    pl: {
      title:
        "mBar — Mobilny bar na wesela i eventy | Leszno · Poznań · Wrocław",
      description:
        "mBar — premium mobilny bar na wesela i eventy. Leszno, Poznań, Wrocław i okolice — dojazd do 100 km. Koktajle autorskie i serwis barowy premium.",
    },
    en: {
      title:
        "mBar — Mobile bar for weddings & events | Leszno · Poznań · Wrocław",
      description:
        "mBar — premium mobile bar for weddings & events. Leszno, Poznań, Wrocław and surroundings — service within 100 km. Craft cocktails & premium bar catering.",
    },
  },
  gallery: {
    pl: {
      title: "Galeria realizacji | mBar — mobilny bar",
      description:
        "Galeria realizacji mBar — koktajle, bar i wydarzenia. Zobacz nasz mobilny bar w akcji na weselach i eventach.",
    },
    en: {
      title: "Gallery | mBar — mobile bar",
      description:
        "mBar portfolio — cocktails, bar setups and events. See our mobile bar in action at weddings and corporate events.",
    },
  },
  prices: {
    pl: {
      title: "Cennik pakietów | mBar — mobilny bar",
      description:
        "Cennik pakietów mobilnego baru mBar — Basic, Pro i Deluxe. Wybierz pakiet na wesele lub event. Leszno, Poznań, Wrocław.",
    },
    en: {
      title: "Pricing | mBar — mobile bar",
      description:
        "mBar mobile bar packages — Basic, Pro and Deluxe. Pick the right package for your wedding or event. Leszno, Poznań, Wrocław.",
    },
  },
  about: {
    pl: {
      title: "O nas | mBar — mobilny bar",
      description:
        "Poznaj mBar — premium mobilny bar z Leszna. 5 lat doświadczenia, autorskie koktajle i krystalicznie czysty lód.",
    },
    en: {
      title: "About | mBar — mobile bar",
      description:
        "Meet mBar — a premium mobile bar based in Leszno, Poland. 5 years of experience, signature cocktails and crystal-clear ice.",
    },
  },
  contact: {
    pl: {
      title: "Kontakt i wycena | mBar — mobilny bar",
      description:
        "Skontaktuj się z mBar — wycena mobilnego baru na wesele lub event. Leszno, Poznań, Wrocław — odpowiadamy w ciągu 24 h.",
    },
    en: {
      title: "Contact & quote | mBar — mobile bar",
      description:
        "Contact mBar — get a quote for a mobile bar at your wedding or event. Leszno, Poznań, Wrocław — we reply within 24 hours.",
    },
  },
  poznan: {
    pl: {
      title: "Mobilny bar Poznań — wesela i eventy | mBar",
      description:
        "Mobilny bar na wesele, event firmowy lub prywatną imprezę w Poznaniu i okolicach. Premium serwis barowy mBar — dojazd z Leszna w cenie.",
    },
    en: {
      title: "Mobile bar Poznań — weddings & events | mBar",
      description:
        "Mobile bar for weddings, corporate and private events in Poznań and the surrounding area. Premium bar service by mBar — travel from Leszno included.",
    },
  },
  wroclaw: {
    pl: {
      title: "Mobilny bar Wrocław — wesela i eventy | mBar",
      description:
        "Mobilny bar na wesele i eventy we Wrocławiu i okolicach. Koktajle premium i profesjonalni barmani — mBar, dojazd z Leszna.",
    },
    en: {
      title: "Mobile bar Wrocław — weddings & events | mBar",
      description:
        "Mobile bar for weddings and events in Wrocław and nearby. Premium cocktails and professional bartenders — mBar, based in Leszno.",
    },
  },
};

export default function App() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window === "undefined") return "home";
    return (
      getLegacyPageFromHash(window.location.hash) ??
      getPageFromPath(window.location.pathname)
    );
  });
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleNavigate = (page: Page, pkg?: string) => {
    setSelectedPackage(pkg ?? "");
    setCurrentPage(page);

    if (
      typeof window !== "undefined" &&
      normalizePath(window.location.pathname) !== PAGE_PATHS[page]
    ) {
      window.history.pushState(
        null,
        "",
        PAGE_PATHS[page] + window.location.search
      );
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // Redirect legacy hash URLs (#gallery etc.) to the new path routes.
    const legacyPage = getLegacyPageFromHash(window.location.hash);
    if (legacyPage) {
      window.history.replaceState(
        null,
        "",
        PAGE_PATHS[legacyPage] + window.location.search
      );
    }

    const syncPageFromLocation = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", syncPageFromLocation);
    return () => window.removeEventListener("popstate", syncPageFromLocation);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const { title, description } = PAGE_META[currentPage][language];
    const canonicalPl = getCanonicalUrl(currentPage);
    const canonicalEn = `${canonicalPl}?lang=en`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent(
      'meta[property="og:locale"]',
      language === "pl" ? "pl_PL" : "en_US"
    );
    setMetaById(
      "meta-og-locale-alternate",
      language === "pl" ? "en_US" : "pl_PL"
    );
    setMetaContent(
      'meta[property="og:url"]',
      language === "pl" ? canonicalPl : canonicalEn
    );
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    // Canonical + hreflang follow the current page (baked in by prerender).
    setLinkHref(
      "link-canonical",
      language === "pl" ? canonicalPl : canonicalEn
    );
    setLinkHref("link-alt-pl", canonicalPl);
    setLinkHref("link-alt-en", canonicalEn);
    setLinkHref("link-alt-xdefault", canonicalPl);
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
      case "poznan":
        return <CityLanding city="poznan" onNavigate={handleNavigate} />;
      case "wroclaw":
        return <CityLanding city="wroclaw" onNavigate={handleNavigate} />;
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
