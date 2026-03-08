import { Instagram, Facebook } from "lucide-react";
import { getTranslation } from "../utils/translations";
import { Container } from "./Container";
import { useLanguage } from "../context/LanguageContext";
import { PHONE, EMAIL, INSTAGRAM_URL, FACEBOOK_URL } from "../utils/constants";
import type { NavigateHandler } from "../types/navigation";
import { ContactWithCopy } from "./CopyableContactLink";

interface FooterProps {
  onNavigate: NavigateHandler;
}

export function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-white/10 text-[#faf9f7]">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-4xl font-serif tracking-tight mb-4">mBar</h3>
              <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                {language === "pl"
                  ? "Podnosimy standardy obsługi barmańskiej na Twoim wydarzeniu."
                  : "Elevating the art of bartending for your exclusive events."}
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                © {currentYear} mBar.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-8">
              {language === "pl" ? "Menu" : "Navigation"}
            </h4>
            <ul className="space-y-4">
              {(["home", "gallery", "prices", "about", "contact"] as const).map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(item)}
                      className="text-lg hover:text-secondary transition-colors"
                    >
                      {getTranslation(language, item)}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-8">
              {language === "pl" ? "Kontakt" : "Contact"}
            </h4>
            <ul className="space-y-4">
              <li>
                <ContactWithCopy
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  textToCopy={PHONE.replace(/\s/g, "")}
                  linkClassName="text-lg hover:text-secondary transition-colors"
                >
                  {PHONE}
                </ContactWithCopy>
              </li>
              <li>
                <ContactWithCopy
                  href={`mailto:${EMAIL}`}
                  textToCopy={EMAIL}
                  linkClassName="text-lg hover:text-secondary transition-colors"
                >
                  {EMAIL}
                </ContactWithCopy>
              </li>
              <li className="pt-4 flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-3 border-l border-white/10 pl-8">
            <p className="text-3xl font-serif leading-tight text-white/80">
              {language === "pl"
                ? "Zarezerwuj termin już dziś."
                : "Reserve your date today."}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
