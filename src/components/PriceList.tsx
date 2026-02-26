import { Check } from "lucide-react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { SwissButton } from "./ui/SwissButton";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

interface PriceListProps {
  onNavigate: (page: string, pkg?: string) => void;
}

const getPackages = (language: string) => [
  {
    name: "Basic",
    price: "2299 zł",
    capacity: getTranslation(language, "packageBasicCapacity"),
    guestCount: getTranslation(language, "packageGuestBasic"),
    features:
      language === "pl"
        ? [
            "5 godzin serwisu barmańskiego",
            "AUTORSKA KARTA KOKTAJLI\n6 POZYCJI",
            "5 koktajli alkoholowych\n1 koktajl bezalkoholowy",
            "30 koktajli bezalkoholowych przygotowanych na świeżo (idealne uzupełnienie baru podczas całego wesela)",
            "ręcznie robione syropy, cordiale i dodatki barmańskie duże krystalicznie czyste kostki lodu (premium ice)",
          ]
        : [
            "5 hours of bartender service",
            "SIGNATURE COCKTAIL MENU\n6 ITEMS",
            "5 alcoholic cocktails\n1 non-alcoholic cocktail",
            "30 freshly prepared non-alcoholic cocktails (perfect bar addition throughout the entire wedding)",
            "handmade syrups, cordials and bar garnishes, large crystal clear ice cubes (premium ice)",
          ],
    popular: false,
  },
  {
    name: "Pro",
    price: "3299 zł",
    capacity: getTranslation(language, "packageProCapacity"),
    guestCount: getTranslation(language, "packageGuestPro"),
    features:
      language === "pl"
        ? [
            "7 godzin serwisu barmańskiego",
            "AUTORSKA KARTA KOKTAJLI\n8 POZYCJI",
            "7 koktajli alkoholowych\n1 koktajl bezalkoholowy",
            "50 koktajli bezalkoholowych przygotowanych na świeżo (idealne uzupełnienie baru podczas całego wesela)",
            "ręcznie robione syropy, cordiale i dodatki barmańskie duże krystalicznie czyste kostki lodu (premium ice)",
          ]
        : [
            "7 hours of bartender service",
            "SIGNATURE COCKTAIL MENU\n8 ITEMS",
            "7 alcoholic cocktails\n1 non-alcoholic cocktail",
            "50 freshly prepared non-alcoholic cocktails (perfect bar addition throughout the entire wedding)",
            "handmade syrups, cordials and bar garnishes, large crystal clear ice cubes (premium ice)",
          ],
    popular: true,
  },
  {
    name: "Deluxe",
    price: "4999 zł",
    capacity: getTranslation(language, "packageDeluxeCapacity"),
    guestCount: getTranslation(language, "packageGuestDeluxe"),
    features:
      language === "pl"
        ? [
            "8 godzin serwisu barmańskiego",
            "AUTORSKA KARTA KOKTAJLI\n11 POZYCJI",
            "9 koktajli alkoholowych\n2 koktajle bezalkoholowe",
            "70 koktajli bezalkoholowych przygotowanych na świeżo (idealne uzupełnienie baru podczas całego wesela)",
            "ręcznie robione syropy, cordiale i dodatki barmańskie duże krystalicznie czyste kostki lodu (premium ice)",
          ]
        : [
            "8 hours of bartender service",
            "SIGNATURE COCKTAIL MENU\n11 ITEMS",
            "9 alcoholic cocktails\n2 non-alcoholic cocktails",
            "70 freshly prepared non-alcoholic cocktails (perfect bar addition throughout the entire wedding)",
            "handmade syrups, cordials and bar garnishes, large crystal clear ice cubes (premium ice)",
          ],
    popular: false,
  },
];

const isHeadline = (f: string) =>
  f.includes("AUTORSKA KARTA") || f.includes("SIGNATURE COCKTAIL");

export function PriceList({ onNavigate }: PriceListProps) {
  const { language } = useLanguage();
  const additionalServices = [
    {
      service: getTranslation(language, "additionalHour"),
      price: getTranslation(language, "additionalHourPrice"),
    },
    {
      service: getTranslation(language, "additionalCocktail"),
      price: getTranslation(language, "additionalCocktailPrice"),
    },
    {
      service: getTranslation(language, "additionalDrinks"),
      price: getTranslation(language, "additionalDrinksPrice"),
    },
    {
      service: getTranslation(language, "travelFee"),
      price: getTranslation(language, "travelFeePrice"),
    },
  ];

  const bookingTerms = [
    getTranslation(language, "depositTerm"),
    getTranslation(language, "paymentTerm"),
    getTranslation(language, "setupTerm"),
    getTranslation(language, "travelTerm"),
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-16 pb-20">
      <Container>
        {/* ── Page header ── */}
        <SectionHeader
          label={getTranslation(language, "pricesLabel")}
          title={getTranslation(language, "pricesTitle")}
          description={getTranslation(language, "pricesSubtitle")}
          className="mb-24"
        />

        {/* ── Pricing cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-primary/10 mb-32">
          {getPackages(language).map((pkg, index) => (
            <div
              key={index}
              className={`relative p-8 md:p-12 border-b border-r border-primary/10 flex flex-col justify-between hover:bg-white transition-colors duration-500 ${
                pkg.popular ? "bg-white" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2">
                  {getTranslation(language, "popular")}
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-3xl font-serif text-primary mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[12px] text-primary/60 uppercase tracking-widest mb-5">
                  {pkg.capacity}
                </p>

                <div className="mb-10 pb-8 border-b border-primary/20 flex items-baseline">
                  <span className="text-3xl text-primary font-sans">
                    {pkg.price}
                  </span>
                  <span className="text-xl text-primary/60 font-serif ml-2 font-light">
                    / {pkg.guestCount}
                  </span>
                </div>

                <ul className="space-y-6">
                  {pkg.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className={`flex items-start gap-4 text-primary/80 font-light text-sm md:text-base ${
                        isHeadline(feature)
                          ? "font-serif uppercase tracking-widest text-primary justify-center text-center my-6"
                          : ""
                      }`}
                    >
                      {!isHeadline(feature) && (
                        <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5 stroke-[1.5]" />
                      )}
                      <span
                        className={`whitespace-pre-line leading-relaxed ${
                          isHeadline(feature) ? "w-full" : ""
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <SwissButton
                fullWidth
                showSeparator={false}
                variant="secondary"
                onClick={() => onNavigate("contact", pkg.name)}
              >
                {getTranslation(language, "selectPackage")}
              </SwissButton>
            </div>
          ))}
        </div>

        {/* ── Booking Terms ── */}
        <div className="mb-32 bg-primary text-[#faf9f7] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1">
              <h4 className="text-3xl font-serif mb-6 leading-tight text-[#d4c4a8]">
                {getTranslation(language, "bookingTerms")}
              </h4>
            </div>
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {bookingTerms.map((term, i) => (
                <div key={i}>
                  <span className="block text-[#d4c4a8] font-mono text-xs mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#d4c4a8] pt-4">
                    <p className="font-medium text-lg leading-snug">{term}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Additional Services ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-4">
            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              {getTranslation(language, "additionalServicesTitle")}
            </h3>
            <p className="text-primary/60 leading-relaxed font-light">
              {getTranslation(language, "additionalServicesDesc")}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-primary/10 border-t border-b border-primary/10">
              {additionalServices.map((item, i) => (
                <div
                  key={i}
                  className="py-6 flex justify-between items-center hover:bg-white transition-colors px-4 -mx-4"
                >
                  <span className="text-lg text-primary font-medium">
                    {item.service}
                  </span>
                  <span className="text-lg text-primary/60 font-serif">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
