import { motion } from "motion/react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { SwissButton } from "./ui/SwissButton";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { cityContent, CITY_NAMES, type CityKey } from "../utils/cityContent";
import { SITE_ORIGIN, PAGE_PATHS } from "../utils/routes";
import { PHONE } from "../utils/constants";
import type { NavigateHandler } from "../types/navigation";

interface CityLandingProps {
  city: CityKey;
  onNavigate: NavigateHandler;
}

/** Local-SEO landing page for a serviced city (Poznań / Wrocław). */
export function CityLanding({ city, onNavigate }: CityLandingProps) {
  const { language } = useLanguage();
  const copy = cityContent[city][language];

  const services = [
    { title: "weddings", desc: "weddingsDesc" },
    { title: "corporate", desc: "corporateDesc" },
    { title: "privateParties", desc: "privatePartiesDesc" },
  ] as const;

  const serviceJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobilny bar / bar catering",
    name: `mBar — mobilny bar ${CITY_NAMES[city]}`,
    url: `${SITE_ORIGIN}${PAGE_PATHS[city]}`,
    areaServed: { "@type": "City", name: CITY_NAMES[city] },
    provider: {
      "@type": "ProfessionalService",
      name: "mBar",
      url: `${SITE_ORIGIN}/`,
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leszno",
        addressRegion: "Wielkopolskie",
        addressCountry: "PL",
      },
    },
  });

  return (
    <div className="bg-[#faf9f7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJsonLd }}
      />

      <Container className="py-16 md:py-20">
        {/* ── Intro + route panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <span className="text-[10px] uppercase tracking-[0.45em] text-secondary block mb-3">
              {copy.label}
            </span>
            <div className="w-8 h-0.5 bg-secondary mb-8" />

            <h1 className="city-hero-title mb-8">{copy.title}</h1>

            <p className="text-lg md:text-xl font-light text-primary/80 leading-relaxed mb-10 max-w-3xl">
              {copy.lead}
            </p>

            <div className="space-y-6 max-w-3xl">
              {copy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base text-primary/70 font-light leading-relaxed border-l-2 border-secondary/50 pl-5"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="city-route-panel">
              <span className="city-route-eyebrow">{copy.routeLabel}</span>

              <div className="city-route-stop">
                <span className="city-route-marker" aria-hidden="true" />
                {copy.routeFrom}
              </div>
              <div className="city-route-leg">
                <span className="city-route-km">{copy.routeKm}</span>
                <span className="city-route-zone">{copy.routeZone}</span>
              </div>
              <div className="city-route-stop">
                <span
                  className="city-route-marker city-route-marker--dest"
                  aria-hidden="true"
                />
                {CITY_NAMES[city]}
              </div>

              <div className="city-route-cta">
                <SwissButton
                  onClick={() => onNavigate("contact")}
                  justify="between"
                  fullWidth
                >
                  {copy.ctaButton}
                </SwissButton>
                <a
                  href={PAGE_PATHS.prices}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("prices");
                  }}
                  className="city-route-link"
                >
                  {copy.pricesButton}
                </a>
              </div>

              <dl className="city-route-facts">
                <div>
                  <dt>{getTranslation(language, "area")}</dt>
                  <dd>{getTranslation(language, "serviceArea")}</dd>
                </div>
                <div>
                  <dt>{getTranslation(language, "response")}</dt>
                  <dd>{getTranslation(language, "responseTime")}</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>

        {/* ── Services (hairline cells, same motif as home) ── */}
        <section className="mt-12 pt-12 md:pt-24 border-t border-primary/10">
          <SectionHeader
            label={getTranslation(language, "services")}
            title={copy.servicesTitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-primary/10">
            {services.map((service) => (
              <div
                key={service.title}
                className="border-b border-r border-primary/10 p-6 md:p-10 hover:bg-white transition-colors duration-500"
              >
                <div className="city-tick" aria-hidden="true" />
                <h3 className="text-xl font-serif text-primary mb-3">
                  {getTranslation(language, service.title)}
                </h3>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {getTranslation(language, service.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Localities we serve (first cell = destination city) ── */}
        <section className="mt-12 pt-12 md:pt-24 border-t border-primary/10">
          <SectionHeader
            label={getTranslation(language, "area")}
            title={copy.areasTitle}
            description={copy.travelNote}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-primary/10">
            {copy.areas.map((area, index) => (
              <div
                key={area}
                className={
                  index === 0
                    ? "border-b border-r border-primary/10 p-4 text-center text-sm uppercase tracking-widest bg-primary text-[#faf9f7]"
                    : "border-b border-r border-primary/10 p-4 text-center text-sm uppercase tracking-widest text-primary/70 hover:bg-white transition-colors duration-500"
                }
              >
                {area}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
