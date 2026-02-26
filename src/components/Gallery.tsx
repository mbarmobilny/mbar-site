import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

import imgDSC0238 from "../assets/DSC_0238.jpg";
import imgDSC0404 from "../assets/DSC_0404.jpg";
import imgDSC0413 from "../assets/DSC_0413.jpg";
import imgGintonic from "../assets/gintonic.jpg";
import imgGringo from "../assets/gringo.jpg";
import imgPornStar from "../assets/porn-star-martini.jpg";
import imgVermouth from "../assets/vermouth-cocktail.jpg";
import imgWs from "../assets/ws.jpg";
import imgYan0127 from "../assets/yan-gotowe-DSC_0127.jpg";
import imgYan0292 from "../assets/yan-gotowe-DSC_0292.jpg";
import imgYan0420 from "../assets/yan-gotowe-DSC_0420.jpg";
import imgYan0451 from "../assets/yan-gotowe-DSC_0451.jpg";
import imgYan0530 from "../assets/yan-gotowe-DSC_0530.jpg";
import imgYennefer from "../assets/yennefer.jpg";
import imgBarSetup1 from "../assets/gallery-bar-setup-1.jpg";
import imgBarSetup2 from "../assets/gallery-bar-setup-2.jpg";
import imgBarSetup3 from "../assets/gallery-bar-setup-3.jpg";
import imgBarSetup4 from "../assets/gallery-bar-setup-4.jpg";
import imgBarSetup5 from "../assets/gallery-bar-setup-5.jpg";
import imgBarSetup6 from "../assets/gallery-bar-setup-6.jpg";
import imgBarSetup7 from "../assets/gallery-bar-setup-7.jpg";

const galleryImages = [
  {
    src: imgDSC0238,
    alt: "Cocktail",
    title: "Cocktails 1",
    category: "cocktails",
  },
  {
    src: imgDSC0404,
    alt: "Cocktail",
    title: "Cocktails 2",
    category: "cocktails",
  },
  {
    src: imgDSC0413,
    alt: "Cocktail",
    title: "Cocktails 3",
    category: "cocktails",
  },
  {
    src: imgGintonic,
    alt: "Gin Tonic",
    title: "Cocktails 4",
    category: "cocktails",
  },
  {
    src: imgGringo,
    alt: "Gringo",
    title: "Cocktails 5",
    category: "cocktails",
  },
  {
    src: imgPornStar,
    alt: "Porn Star Martini",
    title: "Cocktails 6",
    category: "cocktails",
  },
  {
    src: imgVermouth,
    alt: "Vermouth cocktail",
    title: "Cocktails 7",
    category: "cocktails",
  },
  { src: imgWs, alt: "Cocktail", title: "Cocktails 8", category: "cocktails" },
  {
    src: imgYan0127,
    alt: "Cocktail",
    title: "Cocktails 9",
    category: "cocktails",
  },
  {
    src: imgYan0292,
    alt: "Cocktail",
    title: "Cocktails 10",
    category: "cocktails",
  },
  {
    src: imgYan0420,
    alt: "Cocktail",
    title: "Cocktails 11",
    category: "cocktails",
  },
  {
    src: imgYan0451,
    alt: "Cocktail",
    title: "Cocktails 12",
    category: "cocktails",
  },
  {
    src: imgYan0530,
    alt: "Cocktail",
    title: "Cocktails 13",
    category: "cocktails",
  },
  {
    src: imgYennefer,
    alt: "Yennefer cocktail",
    title: "Cocktails 14",
    category: "cocktails",
  },
  {
    src: imgBarSetup1,
    alt: "Bar setup",
    title: "Bar Setup 1",
    category: "setup",
  },
  {
    src: imgBarSetup2,
    alt: "Bar setup",
    title: "Bar Setup 2",
    category: "setup",
  },
  {
    src: imgBarSetup3,
    alt: "Bar setup",
    title: "Bar Setup 3",
    category: "setup",
  },
  {
    src: imgBarSetup4,
    alt: "Bar setup",
    title: "Bar Setup 4",
    category: "setup",
  },
  {
    src: imgBarSetup5,
    alt: "Bar setup",
    title: "Bar Setup 5",
    category: "setup",
  },
  {
    src: imgBarSetup6,
    alt: "Bar setup",
    title: "Bar Setup 6",
    category: "setup",
  },
  {
    src: imgBarSetup7,
    alt: "Bar setup",
    title: "Bar Setup 7",
    category: "setup",
  },
];

export function Gallery() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const openLightboxOnImage = (index: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: index,
    });
  };

  const categories = [
    { id: "all", name: getTranslation(language, "allCategories") },
    { id: "cocktails", name: getTranslation(language, "galleryCocktails") },
    { id: "setup", name: getTranslation(language, "galleryBarSetup") },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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
              onClick={() => {
                setSelectedCategory(category.id);
                setLightboxController((prev) => ({ ...prev, sourceIndex: 0 }));
              }}
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
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              layout
              key={image.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[4/3] overflow-hidden bg-white"
            >
              <div
                className="w-full h-full cursor-pointer relative"
                onClick={() => openLightboxOnImage(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && openLightboxOnImage(index)
                }
                aria-label={image.alt}
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FsLightbox
          toggler={lightboxController.toggler}
          sources={filteredImages.map((img) => img.src)}
          sourceIndex={lightboxController.sourceIndex}
        />
      </Container>
    </div>
  );
}
