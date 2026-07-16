import type { Language } from "./translations";

export type CityKey = "poznan" | "wroclaw";

export interface CityCopy {
  /** Small label above the heading */
  label: string;
  /** H1 of the landing page */
  title: string;
  /** Lead paragraph under the heading */
  lead: string;
  /** Unique body paragraphs (keep distinct per city — no duplicate content) */
  paragraphs: string[];
  /** Heading for the nearby-localities list */
  areasTitle: string;
  /** Nearby localities we serve (first entry = the destination city, rendered highlighted) */
  areas: string[];
  /** Travel/distance note */
  travelNote: string;
  /** Heading for the services block */
  servicesTitle: string;
  /** Route panel: eyebrow, origin stop, distance figure, zone note */
  routeLabel: string;
  routeFrom: string;
  routeKm: string;
  routeZone: string;
  /** CTA button labels */
  ctaButton: string;
  pricesButton: string;
}

/** City display names for structured data. */
export const CITY_NAMES: Record<CityKey, string> = {
  poznan: "Poznań",
  wroclaw: "Wrocław",
};

export const cityContent: Record<CityKey, Record<Language, CityCopy>> = {
  poznan: {
    pl: {
      label: "Obszar obsługi — Poznań",
      title: "Mobilny bar Poznań — wesela i eventy",
      lead: "Szukasz mobilnego baru na wesele, event firmowy lub prywatną imprezę w Poznaniu? mBar dojeżdża do Poznania i całej aglomeracji — z autorskim menu koktajlowym, krystalicznie czystym lodem i serwisem premium.",
      paragraphs: [
        "Poznań i okolice to jeden z głównych obszarów naszej działalności. Z naszej bazy w Lesznie do centrum Poznania jest niecałe 80 km — mieścimy się w standardowej strefie dojazdu, bez dodatkowych kosztów transportu. Obsługujemy wesela w podpoznańskich salach i pałacach, eventy firmowe oraz kameralne imprezy prywatne.",
        "Przyjeżdżamy z pełnym wyposażeniem: profesjonalny bar, sprzęt barmański, kryształowe szkło i nasz znak rozpoznawczy — ręcznie formowany, krystalicznie czysty lód. Menu koktajlowe dopasowujemy do charakteru wydarzenia i preferencji gości.",
      ],
      areasTitle: "Gdzie dojeżdżamy:",
      areas: [
        "Poznań",
        "Luboń",
        "Komorniki",
        "Swarzędz",
        "Tarnowo Podgórne",
        "Kórnik",
        "Puszczykowo",
        "Mosina",
        "Śrem",
      ],
      travelNote:
        "Dojazd do Poznania (ok. 80 km z Leszna) mieści się w standardowej strefie — bez dopłaty za transport.",
      servicesTitle: "Co robimy w Poznaniu",
      routeLabel: "Trasa",
      routeFrom: "Leszno — baza",
      routeKm: "~80 km",
      routeZone: "Strefa standardowa — bez dopłat",
      ctaButton: "Zapytaj o termin",
      pricesButton: "Zobacz cennik",
    },
    en: {
      label: "Service area — Poznań",
      title: "Mobile bar Poznań — weddings & events",
      lead: "Looking for a mobile bar for a wedding, corporate event or private party in Poznań? mBar serves Poznań and the whole metro area — with a signature cocktail menu, crystal-clear ice and premium service.",
      paragraphs: [
        "Poznań and its surroundings are one of our core service areas. From our base in Leszno it is less than 80 km to the centre of Poznań — well within our standard travel zone, with no extra transport costs. We work at weddings in venues and palaces around Poznań, corporate events and intimate private parties.",
        "We arrive with a complete setup: a professional bar, bartending equipment, crystal glassware and our signature — hand-cut, crystal-clear ice. The cocktail menu is tailored to the character of your event and your guests' preferences.",
      ],
      areasTitle: "Where we travel:",
      areas: [
        "Poznań",
        "Luboń",
        "Komorniki",
        "Swarzędz",
        "Tarnowo Podgórne",
        "Kórnik",
        "Puszczykowo",
        "Mosina",
        "Śrem",
      ],
      travelNote:
        "Travel to Poznań (about 80 km from Leszno) is within our standard zone — no transport surcharge.",
      servicesTitle: "What we do in Poznań",
      routeLabel: "Route",
      routeFrom: "Leszno — base",
      routeKm: "~80 km",
      routeZone: "Standard zone — no surcharge",
      ctaButton: "Ask about a date",
      pricesButton: "See pricing",
    },
  },
  wroclaw: {
    pl: {
      label: "Obszar obsługi — Wrocław",
      title: "Mobilny bar Wrocław — wesela i eventy",
      lead: "Planujesz wesele, event firmowy lub prywatną imprezę we Wrocławiu? mBar przyjeżdża do Wrocławia i okolic z premium serwisem barowym — autorskie koktajle, profesjonalni barmani i dbałość o każdy detal.",
      paragraphs: [
        "Wrocław leży ok. 100 km od naszej bazy w Lesznie — w zasięgu naszej standardowej strefy dojazdu, dzięki czemu obsługujemy wydarzenia w mieście i na jego obrzeżach bez wysokich kosztów transportu. Pracujemy na weselach w dolnośląskich pałacach i stodołach weselnych, na eventach firmowych i imprezach prywatnych.",
        "Na miejsce przywozimy kompletny bar: profesjonalny sprzęt, kryształowe szkło, świeże składniki i ręcznie formowany, krystalicznie czysty lód, który definiuje charakter naszych koktajli. Standard serwisu pozostaje ten sam niezależnie od lokalizacji.",
      ],
      areasTitle: "Gdzie dojeżdżamy:",
      areas: [
        "Wrocław",
        "Trzebnica",
        "Oborniki Śląskie",
        "Kąty Wrocławskie",
        "Długołęka",
        "Sobótka",
        "Środa Śląska",
        "Oleśnica",
      ],
      travelNote:
        "Wrocław to ok. 100 km z Leszna — dojazd w granicach standardowej strefy; powyżej 100 km doliczamy 1,5 zł/km.",
      servicesTitle: "Co robimy we Wrocławiu",
      routeLabel: "Trasa",
      routeFrom: "Leszno — baza",
      routeKm: "~100 km",
      routeZone: "Strefa standardowa — bez dopłat",
      ctaButton: "Zapytaj o termin",
      pricesButton: "Zobacz cennik",
    },
    en: {
      label: "Service area — Wrocław",
      title: "Mobile bar Wrocław — weddings & events",
      lead: "Planning a wedding, corporate event or private party in Wrocław? mBar comes to Wrocław and the surrounding area with premium bar service — signature cocktails, professional bartenders and attention to every detail.",
      paragraphs: [
        "Wrocław is about 100 km from our base in Leszno — within our standard travel zone, so we cover events in the city and its outskirts without high transport costs. We work at weddings in Lower Silesian palaces and rustic wedding barns, at corporate events and private parties.",
        "We bring a complete bar to your venue: professional equipment, crystal glassware, fresh ingredients and hand-cut, crystal-clear ice that defines the character of our cocktails. The standard of service stays the same wherever we go.",
      ],
      areasTitle: "Where we travel:",
      areas: [
        "Wrocław",
        "Trzebnica",
        "Oborniki Śląskie",
        "Kąty Wrocławskie",
        "Długołęka",
        "Sobótka",
        "Środa Śląska",
        "Oleśnica",
      ],
      travelNote:
        "Wrocław is about 100 km from Leszno — within our standard zone; above 100 km we charge 1.5 zł/km.",
      servicesTitle: "What we do in Wrocław",
      routeLabel: "Route",
      routeFrom: "Leszno — base",
      routeKm: "~100 km",
      routeZone: "Standard zone — no surcharge",
      ctaButton: "Ask about a date",
      pricesButton: "See pricing",
    },
  },
};
