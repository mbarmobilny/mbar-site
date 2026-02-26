import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { getTranslation } from "../utils/translations";
import { SwissButton } from "./ui/SwissButton";
import { useLanguage } from "../context/LanguageContext";
import heroImage from "../assets/hero.jpg";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#faf9f7] flex flex-col md:flex-row overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-[0.03] z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-full border-r border-black" />
        ))}
      </div>

      <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0 relative z-10 border-r border-primary/5">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="max-w-xl w-full"
        >
          <div className="w-16 h-1 bg-secondary mb-8" />

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-primary leading-[0.9] tracking-tight mb-8 break-words">
            <span className="block">
              {getTranslation(language, "heroTitle").split(" ")[0]}
            </span>
            <span className="block text-secondary">
              {getTranslation(language, "heroTitle")
                .split(" ")
                .slice(1)
                .join(" ")}
            </span>
          </h1>

          <h2 className="text-lg md:text-xl lg:text-2xl font-light text-primary/80 mb-10 tracking-wide max-w-md">
            {getTranslation(language, "heroSubtitle")}
            <span className="block mt-4 text-base opacity-70 border-l-2 border-secondary pl-4 py-1">
              {getTranslation(language, "heroDescription")}
            </span>
          </h2>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <SwissButton
              onClick={() => onNavigate("contact")}
              justify="between"
              fullWidth
            >
              {getTranslation(language, "getQuote")}
            </SwissButton>

            <SwissButton
              onClick={() => onNavigate("gallery")}
              variant="secondary"
              justify="between"
              fullWidth
            >
              {getTranslation(language, "viewWork")}
            </SwissButton>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 lg:w-7/12 relative h-[50vh] md:h-auto overflow-hidden bg-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply" />
          <ImageWithFallback
            src={heroImage}
            alt="Bartender Service"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 bg-secondary p-6 md:p-10 z-20 max-w-[280px] md:max-w-xs"
        >
          <p className="font-serif text-primary text-2xl md:text-3xl italic leading-none">
            &quot;{getTranslation(language, "heroTagline")}&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
