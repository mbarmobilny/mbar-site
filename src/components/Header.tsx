import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: getTranslation(language, "home"), id: "home" },
    { name: getTranslation(language, "gallery"), id: "gallery" },
    { name: getTranslation(language, "prices"), id: "prices" },
    { name: getTranslation(language, "about"), id: "about" },
    { name: getTranslation(language, "contact"), id: "contact" },
  ];

  const toggleLanguage = () => setLanguage(language === "pl" ? "en" : "pl");

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#faf9f7] border-b border-primary/10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="mBar Home"
              >
                <span
                  style={{ display: "block", maxWidth: 100, maxHeight: 60 }}
                >
                  <img
                    src={logo}
                    alt="mBar Logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 60,
                      width: "auto",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </span>
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative text-sm font-medium tracking-widest uppercase py-2 transition-colors ${
                    currentPage === item.id
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  }`}
                >
                  {item.name}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-secondary"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="hidden md:flex font-medium tracking-wide text-primary hover:bg-transparent hover:text-secondary p-0 h-auto"
              >
                {language === "pl" ? "EN" : "PL"}
              </Button>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-primary hover:text-secondary transition-colors"
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-40 bg-[#faf9f7] md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-serif text-left py-2 border-b border-primary/5 ${
                    currentPage === item.id
                      ? "text-primary font-medium"
                      : "text-primary/70"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="text-lg font-medium text-primary/70 hover:text-primary"
                >
                  {language === "pl"
                    ? "Switch to English"
                    : "Przełącz na Polski"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
