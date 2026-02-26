import { motion } from "motion/react";
import {
  Martini,
  Users,
  Building2,
  Heart,
  Sparkles,
  Gem,
  Clock,
  MessageCircle,
  FileText,
  Calendar,
  PartyPopper,
} from "lucide-react";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

const getServices = (language: string) => [
  {
    icon: Heart,
    title: getTranslation(language, "weddings"),
    description: getTranslation(language, "weddingsDesc"),
    number: "01",
  },
  {
    icon: Building2,
    title: getTranslation(language, "corporate"),
    description: getTranslation(language, "corporateDesc"),
    number: "02",
  },
  {
    icon: Users,
    title: getTranslation(language, "privateParties"),
    description: getTranslation(language, "privatePartiesDesc"),
    number: "03",
  },
  {
    icon: Martini,
    title: getTranslation(language, "cocktailWorkshops"),
    description: getTranslation(language, "cocktailWorkshopsDesc"),
    number: "04",
  },
];

const getAdditionalServices = (language: string) => [
  {
    icon: Martini,
    title: getTranslation(language, "customMenu"),
    description: getTranslation(language, "customMenuDesc"),
  },
  {
    icon: Gem,
    title: getTranslation(language, "premiumEquipment"),
    description: getTranslation(language, "premiumEquipmentDesc"),
  },
  {
    icon: Sparkles,
    title: getTranslation(language, "premiumService"),
    description: getTranslation(language, "premiumServiceDesc"),
  },
  {
    icon: Clock,
    title: getTranslation(language, "flexibleTiming"),
    description: getTranslation(language, "flexibleTimingDesc"),
  },
];

export function Services() {
  const { language } = useLanguage();
  const services = getServices(language);
  const additionalServices = getAdditionalServices(language);

  return (
    <section className="bg-[#faf9f7] pt-12 md:pt-24 pb-0 border-t border-primary/10">
      <Container className="mb-24">
        {/* Section Header */}
        <SectionHeader
          label={language === "pl" ? "Zakres usług" : "Scope of services"}
          title={getTranslation(language, "servicesTitle")}
          description={getTranslation(language, "servicesSubtitle")}
        />

        {/* Main Services - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-primary/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-b border-r border-primary/10 p-6 md:p-10 min-h-[280px] flex flex-col justify-between hover:bg-white transition-colors duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-5xl text-primary group-hover:opacity-20 transition-opacity">
                  {service.number}
                </div>
                <div>
                  <div className="w-10 h-10 mb-6 text-secondary">
                    <Icon className="w-full h-full stroke-1" />
                  </div>
                  <h3 className="text-xl font-serif text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-primary/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Additional Info Grid - Full Width dark strip */}
      <div className="w-full bg-primary text-[#faf9f7]">
        <Container className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white/10 gap-px border border-white/10">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="p-8 md:p-12 bg-primary hover:bg-[#16423a] transition-colors min-h-[300px] flex flex-col justify-start"
                >
                  <Icon className="w-10 h-10 mb-6 text-secondary" />
                  <h4 className="text-xl font-serif text-[#faf9f7] mb-3">
                    {service.title}
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Process Section */}
      <Container className="py-24">
        <SectionHeader
          label={language === "pl" ? "Jak działamy" : "How we work"}
          title={getTranslation(language, "processTitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 bg-primary/10 gap-px border border-primary/10">
          {[
            {
              icon: MessageCircle,
              title: getTranslation(language, "consultation"),
              step: "01",
            },
            {
              icon: FileText,
              title: getTranslation(language, "proposal"),
              step: "02",
            },
            {
              icon: Calendar,
              title: getTranslation(language, "booking"),
              step: "03",
            },
            {
              icon: PartyPopper,
              title: getTranslation(language, "execution"),
              step: "04",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative p-8 md:p-12 bg-[#faf9f7] hover:bg-white transition-colors h-64 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary font-bold tracking-widest">
                    {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-primary/20 group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div className="mt-auto">
                  <h4 className="text-2xl font-serif text-primary mb-2">
                    {item.title}
                  </h4>
                  <div className="w-8 group-hover:w-full h-0.5 bg-secondary transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
