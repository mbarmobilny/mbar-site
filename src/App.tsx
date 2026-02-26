import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

const Gallery = lazy(() => import("./components/Gallery").then((m) => ({ default: m.Gallery })));
const PriceList = lazy(() => import("./components/PriceList").then((m) => ({ default: m.PriceList })));
const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const ContactForm = lazy(() => import("./components/ContactForm").then((m) => ({ default: m.ContactForm })));

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleNavigate = (page: string, pkg?: string) => {
    setCurrentPage(page);
    if (pkg !== undefined) setSelectedPackage(pkg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
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
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center" />}>
            {renderPage()}
          </Suspense>
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
