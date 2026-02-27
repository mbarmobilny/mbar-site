import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Cocktails
import imgCocktailsAviation from "../assets/gallery-cocktails-aviation.webp";
import imgCocktailsAperol from "../assets/gallery-cocktails-aperol.webp";
import imgCocktailsCloverclub from "../assets/gallery-cocktails-cloverclub.webp";
import imgCocktailsGintonic from "../assets/gallery-cocktails-gintonic.webp";
import imgCocktailsGringo from "../assets/gallery-cocktails-gringo.webp";
import imgCocktailsNegroni from "../assets/gallery-cocktails-negroni.webp";
import imgCocktailsPornStar from "../assets/gallery-cocktails-porn-star-martini.webp";
import imgCocktailsSiesta from "../assets/gallery-cocktails-siesta.webp";
import imgCocktailsVermouth from "../assets/gallery-cocktails-vermouth-cocktail.webp";
import imgCocktailsWs from "../assets/gallery-cocktails-ws.webp";
import imgCocktailsYennefer from "../assets/gallery-cocktails-yennefer.webp";

// Bar setup
import imgBar1 from "../assets/gallery-bar-setup-1.webp";
import imgBar2 from "../assets/gallery-bar-setup-2.webp";
import imgBar3 from "../assets/gallery-bar-setup-3.webp";
import imgBar4 from "../assets/gallery-bar-setup-4.webp";
import imgBar5 from "../assets/gallery-bar-setup-5.webp";
import imgBar6 from "../assets/gallery-bar-setup-6.webp";

// Events
import imgEventsGringo from "../assets/gallery-events-gringo.webp";
import imgEventsNegroni from "../assets/gallery-events-negroni.webp";
import imgEventsPornstar from "../assets/gallery-events-pornstar.webp";
import imgEventsWhiskeysour from "../assets/gallery-events-whiskeysour.webp";
import imgEventsImg1 from "../assets/gallery-events-img1.webp";
import imgEventsImg2 from "../assets/gallery-events-img2.webp";
import imgEventsImg3 from "../assets/gallery-events-img3.webp";

const galleryImages = [
  // Cocktails
  {
    src: imgCocktailsAviation,
    alt: "Aviation",
    title: "Aviation",
    category: "cocktails",
  },
  {
    src: imgCocktailsSiesta,
    alt: "Siesta",
    title: "Siesta",
    category: "cocktails",
  },
  {
    src: imgCocktailsYennefer,
    alt: "Yennefer cocktail",
    title: "Yennefer",
    category: "cocktails",
  },
  {
    src: imgCocktailsCloverclub,
    alt: "Clover Club",
    title: "Clover Club",
    category: "cocktails",
  },
  {
    src: imgCocktailsGringo,
    alt: "Gringo",
    title: "Gringo",
    category: "cocktails",
  },
  {
    src: imgCocktailsNegroni,
    alt: "Negroni",
    title: "Negroni",
    category: "cocktails",
  },
  {
    src: imgCocktailsPornStar,
    alt: "Porn Star Martini",
    title: "Porn Star Martini",
    category: "cocktails",
  },
  {
    src: imgCocktailsVermouth,
    alt: "Vermouth cocktail",
    title: "Vermouth cocktail",
    category: "cocktails",
  },
  {
    src: imgCocktailsWs,
    alt: "Whiskey Sour",
    title: "Whiskey Sour",
    category: "cocktails",
  },
  {
    src: imgCocktailsAperol,
    alt: "Aperol Spritz",
    title: "Aperol Spritz",
    category: "cocktails",
  },
  {
    src: imgCocktailsGintonic,
    alt: "Gin Tonic",
    title: "Gin Tonic",
    category: "cocktails",
  },
  // Bar setup
  { src: imgBar1, alt: "Bar setup", title: "Bar Setup 1", category: "setup" },
  { src: imgBar6, alt: "Bar setup", title: "Bar Setup 6", category: "setup" },
  { src: imgBar2, alt: "Bar setup", title: "Bar Setup 2", category: "setup" },
  { src: imgBar3, alt: "Bar setup", title: "Bar Setup 3", category: "setup" },
  { src: imgBar5, alt: "Bar setup", title: "Bar Setup 5", category: "setup" },
  { src: imgBar4, alt: "Bar setup", title: "Bar Setup 4", category: "setup" },

  // Events
  { src: imgEventsImg1, alt: "Event", title: "Event 1", category: "events" },
  { src: imgEventsImg3, alt: "Event", title: "Event 3", category: "events" },
  {
    src: imgEventsNegroni,
    alt: "Event - Negroni",
    title: "Event - Negroni",
    category: "events",
  },
  {
    src: imgEventsPornstar,
    alt: "Event - Porn Star Martini",
    title: "Event - Porn Star Martini",
    category: "events",
  },
  { src: imgEventsImg2, alt: "Event", title: "Event 2", category: "events" },
  {
    src: imgEventsWhiskeysour,
    alt: "Event - Whiskey Sour",
    title: "Event - Whiskey Sour",
    category: "events",
  },
  {
    src: imgEventsGringo,
    alt: "Event - Gringo",
    title: "Event - Gringo",
    category: "events",
  },
];

export function Gallery() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const lightboxRef = useRef<SimpleLightbox | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", name: getTranslation(language, "allCategories") },
    { id: "cocktails", name: getTranslation(language, "galleryCocktails") },
    { id: "setup", name: getTranslation(language, "galleryBarSetup") },
    { id: "events", name: getTranslation(language, "galleryEvents") },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    const links = galleryRef.current?.querySelectorAll(".gallery-lightbox");
    if (!links?.length) return;

    lightboxRef.current = new SimpleLightbox(".gallery-lightbox", {
      overlayOpacity: 0.95,
      captionsData: "title",
      captionPosition: "bottom",
      captionDelay: 0,
      animationSpeed: 250,
      widthRatio: 0.9,
      heightRatio: 0.9,
    });

    return () => {
      lightboxRef.current?.destroy();
      lightboxRef.current = null;
    };
  }, [filteredImages]);

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24 pb-20">
      <Container>
        {/* Header Section */}
        <SectionHeader
          label={getTranslation(language, "galleryWorkLabel")}
          title={getTranslation(language, "galleryTitle")}
          description={getTranslation(language, "gallerySubtitle")}
          className="mb-12"
        />

        {/* Filter Section */}
        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                selectedCategory === category.id
                  ? "text-primary font-bold border-b-2 border-secondary pb-1"
                  : "text-primary/50 hover:text-primary pb-1"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid Section - Strict Grid, No Gaps or Small Gaps, Sharp Edges */}
        <motion.div
          ref={galleryRef}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10"
        >
          {filteredImages.map((image) => (
            <motion.div
              layout
              key={`${image.category}-${image.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[4/3] overflow-hidden bg-white"
            >
              <a
                href={image.src}
                className="gallery-lightbox block w-full h-full cursor-pointer relative"
                title={image.title}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-white/90 text-primary px-6 py-3 text-sm uppercase tracking-widest font-medium backdrop-blur-sm">
                    {getTranslation(language, "galleryView")}
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
