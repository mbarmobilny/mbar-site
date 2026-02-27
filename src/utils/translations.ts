export type Language = "pl" | "en";

export type TranslationKey = keyof typeof translations.pl;

export const translations = {
  pl: {
    // Navigation
    home: "Strona główna",
    services: "Usługi",
    gallery: "Galeria",
    prices: "Cennik",
    about: "O nas",
    contact: "Kontakt",

    // Hero section
    heroTitle: "mBar",
    heroSubtitle: "Premium Mobilny Bar",
    heroTagline: "Z myślą o każdym detalu.",
    heroDescription:
      "Podnieś swoje specjalne wydarzenia na wyższy poziom dzięki craftowym koktajlom, profesjonalnym barmenom i niezapomnianym doświadczeniom",
    getQuote: "Zarezerwuj swoją datę",
    viewWork: "Zobacz nasze prace",
    rating: "4.9/5 Ocena",
    events: "500+ Wydarzeń",
    experience: "5 lat doświadczenia",
    trusted: "Zaufane przez wiodące miejsca i organizatorów wydarzeń",
    licensed: "W pełni licencjonowany",
    insured: "Ubezpieczony",
    certified: "Certyfikowani barmani",

    // Services
    servicesTitle: "Nasze Usługi",
    servicesSubtitle: "Kompleksowe rozwiązania barowe na każdą okazję",

    weddings: "Wesela",
    weddingsDesc:
      "Stwórz magiczne momenty z naszym premium serwisem barowym na twój wielki dzień",

    corporate: "Wydarzenia korporacyjne",
    corporateDesc:
      "Profesjonalny serwis barowy na konferencje, spotkania firmowe i eventy biznesowe",

    privateParties: "Prywatne imprezy",
    privatePartiesDesc:
      "Personalizowany serwis barowy na urodziny, rocznice i inne prywatne celebracje",

    cocktailWorkshops: "Warsztaty koktajlowe",
    cocktailWorkshopsDesc:
      "Interaktywne doświadczenie nauki miksowania koktajli",

    flexibleTiming: "Elastyczne godziny",
    flexibleTimingDesc:
      "Serwis barowy dostępny w godzinach odpowiadających klientowi",

    customMenu: "Spersonalizowane menu",
    customMenuDesc:
      "Dostosowujemy nasze menu do twoich preferencji i tematyki wydarzenia",

    premiumEquipment: "Premium wyposażenie",
    premiumEquipmentDesc:
      "Profesjonalny sprzęt barowy, kryształowe szkło i elegancka oprawa.",

    premiumService: "Najwyższy standard serwisu",
    premiumServiceDesc:
      "Krystalicznie czysty lód kraftowy i autorskie receptury.",

    // About
    aboutLabel: "— Historia",
    aboutTitle: "O mBar",
    aboutSubtitle: "Pasja do doskonałości w każdym koktajlu",
    aboutText1:
      "Za mBar stoi Yan Maihur — barman z 5-letnim doświadczeniem zbudowanym przez setki godzin za barem i nieustanny rozwój. Szkolenia, testowanie nowych technik i doskonalenie detali to stały element naszej pracy. Podchodzimy do niej pedantycznie — każdy ruch, proporcja i element serwisu mają dla nas znaczenie.",
    aboutText2:
      "Inspiruje nas japońska precyzja i świadoma sztuka miksologii. Wierzymy, że dobry drink to efekt rzemiosła, koncentracji i przemyślanych decyzji — nigdy przypadku.",
    founder: "Założyciel",
    basedIn: "Siedziba",
    since: "Od roku",
    photoCaption: "mBar",
    statYears: "Lat doświadczenia",
    statHours: "Godzin za barem",
    statIce: "Kostek lodu",
    statCocktails: "Koktajli",
    craftTagline: "Rzemiosło · Precyzja · Estetyka",
    iceBlockTitle: "Lód jako znak\nrozpoznawczy",
    iceBlockDesc:
      "Naszym znakiem rozpoznawczym są duże, ręcznie formowane kostki krystalicznie czystego lodu. To one definiują tempo rozcieńczenia, utrzymanie temperatury i klarowność smaku. Lód nie jest dodatkiem. Jest konstrukcją koktajlu.",
    mixologyBlockTitle: "Techniki współczesnej\nmiksologii",
    mixologyBlockDesc:
      "Pracujemy na autorskich syropach, świeżych składnikach i nowoczesnych technikach miksologii, dbając o balans, strukturę i estetykę podania. Mobilność nie oznacza uproszczeń — standard pozostaje bezkompromisowy.",
    valuesTitle: "Nasze Wartości",

    ourValues: "Nasze wartości",
    quality: "Jakość",
    qualityDesc: "Używamy tylko najwyższej jakości składników i sprzętu",
    professionalism: "Profesjonalizm",
    professionalismDesc:
      "Standard pracy pozostaje niezmienny — niezależnie od miejsca i skali wydarzenia",
    creativity: "Kreatywność",
    creativityDesc:
      "Tworzymy unikalne koktajle dopasowane do twojego wydarzenia",

    // Gallery
    galleryTitle: "Nasze Prace",
    gallerySubtitle: "Zobacz magię, którą tworzymy na wydarzeniach",
    galleryWorkLabel: "Nasze realizacje",
    galleryView: "Powiększ",
    allCategories: "Wszystkie",
    galleryCocktails: "Koktajle",
    galleryBarSetup: "Bar",
    galleryEvents: "Wydarzenia",
    galleryService: "Serwis",

    // Prices
    pricesLabel: "Nasze pakiety",
    pricesTitle: "Cennik",
    pricesSubtitle: "Wybierz pakiet idealny dla twojego wydarzenia",
    bookingTerms: "Warunki Rezerwacji",
    depositTerm: "Depozyt 30% przy rezerwacji",
    paymentTerm: "Płatność końcowa 7 dni po wydarzeniu",
    setupTerm: "Setup barowy 2h przed startem",
    travelTerm: "Dojazd powyżej 100km od Leszna płatny",
    additionalServicesTitle: "Usługi dodatkowe",
    additionalServicesDesc:
      "Wzbogać swoje doświadczenie o te opcjonalne dodatki. Każdy szczegół ma znaczenie.",
    additionalHour: "Dodatkowa godzina",
    additionalHourPrice: "400 zł/god",
    additionalCocktail: "Dodatkowy koktajl do menu",
    additionalCocktailPrice: "200 zł",
    additionalDrinks: "50 dodatkowych napojów bezalkoholowych",
    additionalDrinksPrice: "400 zł",
    travelFee: "Dojazd (powyżej 100 km)",
    travelFeePrice: "1.5 zł/km",
    popular: "Popularne",
    basic: "Podstawowy",
    premium: "Premium",
    deluxe: "Deluxe",
    packageBasicCapacity: "IDEALNY NA KAMERALNE PRZYJĘCIA",
    packageProCapacity: "NASZ NAJPOPULARNIEJSZY PAKIET",
    packageDeluxeCapacity: "NAJWYŻSZE DOŚWIADCZENIE BAROWE",
    packageGuestBasic: "do 50 osób",
    packageGuestPro: "do 70 osób",
    packageGuestDeluxe: "do 100 osób",
    fromPrice: "od",
    perHour: "za godzinę",
    getStarted: "Rozpocznij",
    included: "W pakiecie:",
    selectPackage: "Wybierz pakiet",

    // Contact
    contactLabel: "Zacznijmy rozmawiać",
    contactTitle: "Skontaktuj się z nami",
    contactSubtitle:
      "Gotowy na stworzenie niezapomnianego wydarzenia? Skontaktujmy się!",
    contactDetails: "Dane Kontaktowe",
    area: "Obszar",
    response: "Odpowiedź",
    serviceArea: "Promień 100 km od Leszno",
    responseTime: "W ciągu 24 godzin",
    whyUs: "Dlaczego My?",
    customMenuShort: "Spersonalizowane menu",
    insurance: "Ubezpieczenie OC",
    quoteForm: "Formularz Wyceny",
    location: "Lokalizacja",
    locationPlaceholder: "Miasto lub nazwa miejsca",
    messagePlaceholder: "Podziel się szczegółami...",
    selectNumber: "Wybierz liczbę",
    corporateEvent: "Wydarzenie firmowe",
    holidayParty: "Impreza świąteczna",
    packageField: "Pakiet",
    noPackagePreference: "Bez preferencji",
    packageBasic: "Basic — do 50 osób",
    packagePro: "Pro — do 70 osób (najpopularniejszy)",
    packageDeluxe: "Deluxe — do 100 osób",
    name: "Imię",
    email: "Email",
    phone: "Telefon",
    eventType: "Typ wydarzenia",
    selectEventType: "Wybierz typ wydarzenia",
    wedding: "Wesele",
    birthday: "Urodziny",
    anniversary: "Rocznica",
    other: "Inne",
    eventDate: "Data wydarzenia",
    guestCount: "Liczba gości",
    message: "Wiadomość",
    sendMessage: "Wyślij wiadomość",

    // Testimonials
    testimonialsTitle: "Co mówią nasi klienci",
    testimonialsSubtitle: "Przeczytaj opinie zadowolonych klientów",

    // Footer
    quickLinks: "Szybkie linki",
    contactInfo: "Informacje kontaktowe",
    followUs: "Śledź nas",
    allRightsReserved: "Wszystkie prawa zastrzeżone.",

    // Process
    processTitle: "Proces współpracy",
    consultation: "Konsultacja",
    proposal: "Propozycja",
    booking: "Rezerwacja",
    execution: "Realizacja",
  },

  en: {
    // Navigation
    home: "Home",
    services: "Services",
    gallery: "Gallery",
    prices: "Pricing",
    about: "About",
    contact: "Contact",

    // Hero section
    heroTitle: "mBar",
    heroSubtitle: "Premium Mobile Bar Service",
    heroTagline: "With attention to every detail.",
    heroDescription:
      "Elevate your special events with craft cocktails, professional bartenders, and unforgettable experiences",
    getQuote: "Book your date",
    viewWork: "View Our Work",
    rating: "4.9/5 Rating",
    events: "500+ Events",
    experience: "5 Years Experience",
    trusted: "Trusted by leading venues and event planners",
    licensed: "Fully Licensed",
    insured: "Insured",
    certified: "Certified Bartenders",

    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive bar solutions for every occasion",

    weddings: "Weddings",
    weddingsDesc:
      "Create magical moments with our premium bar service for your special day",

    corporate: "Corporate Events",
    corporateDesc:
      "Professional bar service for conferences, company meetings, and business events",

    privateParties: "Private Parties",
    privatePartiesDesc:
      "Personalized bar service for birthdays, anniversaries, and other private celebrations",

    cocktailWorkshops: "Cocktail Workshops",
    cocktailWorkshopsDesc: "Interactive cocktail mixing experience",

    flexibleTiming: "Flexible Timing",
    flexibleTimingDesc:
      "Bar service available during hours suitable for the customer",

    customMenu: "Custom Menu",
    customMenuDesc: "We tailor our menu to your preferences and event theme",

    premiumEquipment: "Premium Equipment",
    premiumEquipmentDesc:
      "Professional-grade bar equipment, crystal glassware, and elegant setup.",

    premiumService: "Premium Service Excellence",
    premiumServiceDesc: "Crystal clear craft ice and signature house recipes.",

    // About
    aboutLabel: "— Story",
    aboutTitle: "About mBar",
    aboutSubtitle: "Passion for excellence in every cocktail",
    aboutText1:
      "Behind mBar stands Yan Maihur — a bartender with 5 years of hands-on experience, built through hundreds of service hours and continuous investment in development. Training, experimenting with modern techniques, and refining every detail are a constant part of our work. We approach it with precision — every movement, proportion, and element of service matters.",
    aboutText2:
      "We are inspired by Japanese precision and the conscious art of mixology. We believe a great cocktail is the result of craftsmanship, focus, and deliberate decisions — never coincidence.",
    founder: "Founder",
    basedIn: "Based in",
    since: "Since",
    photoCaption: "mBar",
    statYears: "Years Experience",
    statHours: "Hours Behind the Bar",
    statIce: "Hand-Cut Ice Cubes",
    statCocktails: "Cocktails Served",
    craftTagline: "Craft · Precision · Aesthetics",
    iceBlockTitle: "Ice as a\nsignature element",
    iceBlockDesc:
      "Our signature is large, hand-cut blocks of crystal-clear ice. They define the pace of dilution, temperature control, and clarity of flavor. Ice is not an addition. It is the structure of the cocktail.",
    mixologyBlockTitle: "Modern Mixology\nTechniques",
    mixologyBlockDesc:
      "We work with house-made syrups, fresh ingredients, and modern mixology techniques, focusing on balance, texture, and visual precision. Mobility does not mean compromise — our standard remains uncompromising.",
    valuesTitle: "Our Values",

    ourValues: "Our Values",
    quality: "Quality",
    qualityDesc: "We use only the highest quality ingredients and equipment",
    professionalism: "Professionalism",
    professionalismDesc:
      "The standard of work remains consistent — regardless of the location or scale of the event",
    creativity: "Creativity",
    creativityDesc: "We create unique cocktails tailored to your event",

    // Gallery
    galleryTitle: "Our Work",
    gallerySubtitle: "See the magic we create at events",
    galleryWorkLabel: "Our work",
    galleryView: "View",
    allCategories: "All",
    galleryCocktails: "Cocktails",
    galleryBarSetup: "Bar Setup",
    galleryEvents: "Events",
    galleryService: "Service",

    // Prices
    pricesLabel: "Our packages",
    pricesTitle: "Pricing",
    pricesSubtitle: "Choose the perfect package for your event",
    bookingTerms: "Booking Terms",
    depositTerm: "30% deposit on booking",
    paymentTerm: "Final payment 7 days after event",
    setupTerm: "Bar setup 2h before start",
    travelTerm: "Travel fee over 100km from Leszno",
    additionalServicesTitle: "Additional Services",
    additionalServicesDesc:
      "Enhance your experience with these optional add-ons. Every detail matters.",
    additionalHour: "Additional hour",
    additionalHourPrice: "400 zł/hour",
    additionalCocktail: "Additional cocktail to the menu",
    additionalCocktailPrice: "200 zł",
    additionalDrinks: "50 additional non-alcoholic drinks",
    additionalDrinksPrice: "400 zł",
    travelFee: "Travel (over 100 km)",
    travelFeePrice: "1.5 zł/km",
    popular: "Popular",
    basic: "Basic",
    premium: "Premium",
    deluxe: "Deluxe",
    packageBasicCapacity: "PERFECT FOR INTIMATE GATHERINGS",
    packageProCapacity: "OUR MOST POPULAR PACKAGE",
    packageDeluxeCapacity: "THE ULTIMATE BAR EXPERIENCE",
    packageGuestBasic: "up to 50 people",
    packageGuestPro: "up to 70 people",
    packageGuestDeluxe: "up to 100 people",
    fromPrice: "from",
    perHour: "per hour",
    getStarted: "Get Started",
    included: "Included:",
    selectPackage: "Select Package",

    // Contact
    contactLabel: "Let's talk",
    contactTitle: "Contact Us",
    contactSubtitle:
      "Ready to create an unforgettable event? Let's get in touch!",
    contactDetails: "Contact Details",
    area: "Area",
    response: "Response",
    serviceArea: "100 km radius from Leszno",
    responseTime: "Within 24 hours",
    whyUs: "Why Us?",
    customMenuShort: "Custom menus",
    insurance: "Full insurance",
    quoteForm: "Request a Quote",
    location: "Location",
    locationPlaceholder: "City, State or Venue Name",
    messagePlaceholder: "Share details...",
    selectNumber: "Select number",
    corporateEvent: "Corporate Event",
    holidayParty: "Holiday Party",
    packageField: "Package",
    noPackagePreference: "No preference",
    packageBasic: "Basic — up to 50 guests",
    packagePro: "Pro — up to 70 guests (most popular)",
    packageDeluxe: "Deluxe — up to 100 guests",
    name: "Name",
    email: "Email",
    phone: "Phone",
    eventType: "Event Type",
    selectEventType: "Select event type",
    wedding: "Wedding",
    birthday: "Birthday",
    anniversary: "Anniversary",
    other: "Other",
    eventDate: "Event Date",
    guestCount: "Guest Count",
    message: "Message",
    sendMessage: "Send Message",

    // Testimonials
    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "Read reviews from satisfied customers",

    // Footer
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",

    // Process
    processTitle: "Our Process",
    consultation: "Consultation",
    proposal: "Proposal",
    booking: "Booking",
    execution: "Execution",
  },
};

export const getTranslation = (
  language: string,
  key: TranslationKey,
): string => {
  return (
    translations[language as Language]?.[key] || translations.en[key] || key
  );
};
