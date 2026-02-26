import { motion } from "motion/react";
import { SwissButton } from "./ui/SwissButton";
import { Container } from "./Container";
import { useLanguage } from "../context/LanguageContext";

interface CallToActionProps {
  onNavigate: (page: string) => void;
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  const { language } = useLanguage();
  return (
    <section className="bg-[#faf9f7] text-primary overflow-hidden py-16 border-t border-primary/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          <div className="text-center md:text-left max-w-3xl">
            <h3 className="text-3xl md:text-5xl font-serif mb-4 leading-tight tracking-tight">
              {language === "pl" ? (
                <span>
                  Gotowy na{" "}
                  <span
                    className="text-secondary"
                    style={{ WebkitTextStroke: "1px #d4c4a8" }}
                  >
                    niezwykłe
                  </span>{" "}
                  wrażenia?
                </span>
              ) : (
                <span>
                  Ready for an{" "}
                  <span
                    className="text-secondary"
                    style={{ WebkitTextStroke: "1px #d4c4a8" }}
                  >
                    extraordinary
                  </span>{" "}
                  experience?
                </span>
              )}
            </h3>
            <p className="text-base md:text-lg text-primary/50 leading-relaxed font-light">
              {language === "pl"
                ? "Skontaktuj się z nami, aby omówić szczegóły i stworzyć niezapomniane wspomnienia."
                : "Contact us to discuss details and create unforgettable memories."}
            </p>
          </div>

          <div className="flex-shrink-0">
            <SwissButton
              onClick={() => onNavigate("contact")}
              className="px-10 py-5"
            >
              {language === "pl" ? "ROZPOCZNIJ" : "GET STARTED"}
            </SwissButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
