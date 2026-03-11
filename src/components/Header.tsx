import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import type { NavigateHandler, Page } from "../types/navigation";
import logo from "../assets/logo.png";
import { motion } from "motion/react";

interface HeaderProps {
  currentPage: Page;
  onNavigate: NavigateHandler;
}

const MOBILE_HEADER_HEIGHT_PX = 80;

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollLockYRef = useRef(0);

  const navigation: { name: string; id: Page }[] = [
    { name: getTranslation(language, "home"), id: "home" },
    { name: getTranslation(language, "gallery"), id: "gallery" },
    { name: getTranslation(language, "prices"), id: "prices" },
    { name: getTranslation(language, "about"), id: "about" },
    { name: getTranslation(language, "contact"), id: "contact" },
  ];

  const toggleLanguage = () => setLanguage(language === "pl" ? "en" : "pl");

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = () => {
    closeMenu();
    onNavigate("home");
  };

  const handleNavigation = (page: Page) => {
    closeMenu();
    onNavigate(page);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    scrollLockYRef.current = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, scrollLockYRef.current);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const mobileMenu =
    typeof document !== "undefined" && isMenuOpen
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={getTranslation(language, "menuOpen")}
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483647,
              width: "100vw",
              height: "100dvh",
              backgroundColor: "#faf9f7",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: `${MOBILE_HEADER_HEIGHT_PX}px`,
                flexShrink: 0,
                backgroundColor: "#faf9f7",
                borderBottom: "1px solid rgba(16, 64, 56, 0.1)",
              }}
            >
              <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-4">
                <button
                  onClick={handleLogoClick}
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="mBar Home"
                >
                  <span className="header-logo-wrapper">
                    <img
                      src={logo}
                      alt="mBar Logo"
                      className="header-logo-img"
                    />
                  </span>
                </button>
                <button
                  onClick={closeMenu}
                  className="p-2 text-primary hover:text-secondary transition-colors"
                  aria-label={getTranslation(language, "menuClose")}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "32px",
                boxSizing: "border-box",
              }}
            >
              <div className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    aria-current={currentPage === item.id ? "page" : undefined}
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
                      closeMenu();
                    }}
                    className="text-lg font-medium text-primary/70 hover:text-primary"
                  >
                    {language === "pl"
                      ? getTranslation(language, "switchToEn")
                      : getTranslation(language, "switchToPl")}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#faf9f7] border-b border-primary/10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="mBar Home"
              >
                <span className="header-logo-wrapper">
                  <img src={logo} alt="mBar Logo" className="header-logo-img" />
                </span>
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  aria-current={currentPage === item.id ? "page" : undefined}
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
                  onClick={() =>
                    setIsMenuOpen((currentIsOpen) => !currentIsOpen)
                  }
                  className="p-2 text-primary hover:text-secondary transition-colors"
                  aria-expanded={isMenuOpen}
                  aria-label={
                    isMenuOpen
                      ? getTranslation(language, "menuClose")
                      : getTranslation(language, "menuOpen")
                  }
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
      {mobileMenu}
    </>
  );
}
