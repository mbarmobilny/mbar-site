import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

import imgYan from "../assets/about-hero.jpg";
import imgIceBlock from "../assets/about-ice-block.jpg";
import imgMixology from "../assets/about-mixology.jpg";

export function About() {
  const { language } = useLanguage();
  const stats = [
    { label: getTranslation(language, "statYears"), value: "5+", prefix: null },
    { label: getTranslation(language, "statHours"), value: "10k", prefix: "<" },
    { label: getTranslation(language, "statIce"), value: "2k+", prefix: null },
    {
      label: getTranslation(language, "statCocktails"),
      value: "5k",
      prefix: "<",
    },
  ];

  const signatureBlocks = [
    {
      num: "01",
      title: getTranslation(language, "iceBlockTitle"),
      desc: getTranslation(language, "iceBlockDesc"),
      src: imgIceBlock,
      alt: "Lód jako znak rozpoznawczy",
    },
    {
      num: "02",
      title: getTranslation(language, "mixologyBlockTitle"),
      desc: getTranslation(language, "mixologyBlockDesc"),
      src: imgMixology,
      alt: "Techniki współczesnej miksologii",
    },
  ];

  const values = [
    { num: "01", key: "quality" as const, descKey: "qualityDesc" as const },
    {
      num: "02",
      key: "professionalism" as const,
      descKey: "professionalismDesc" as const,
    },
    {
      num: "03",
      key: "creativity" as const,
      descKey: "creativityDesc" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* ── Page header ── */}
      <Container className="pt-16 pb-0">
        <SectionHeader
          label={getTranslation(language, "aboutLabel")}
          title={getTranslation(language, "aboutTitle")}
          description={getTranslation(language, "aboutSubtitle")}
        />
      </Container>

      {/* ── Hero grid: text + image ── */}
      <Container className="pt-0 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-primary/10">
          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-16 pr-0 lg:pr-20 border-b lg:border-b-0 lg:border-r border-primary/10">
            <div>
              <div className="max-w-lg">
                <p className="text-primary/80 font-light leading-relaxed mb-8 text-xl">
                  {getTranslation(language, "aboutText1")}
                </p>
                <p className="text-primary/60 leading-relaxed font-light border-l-2 border-secondary pl-6">
                  {getTranslation(language, "aboutText2")}
                </p>
              </div>
            </div>

            {/* Meta strip */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-primary/10">
              {[
                {
                  label: getTranslation(language, "founder"),
                  value: "Yan Maihur",
                },
                {
                  label: getTranslation(language, "basedIn"),
                  value: "Leszno, PL",
                },
                { label: getTranslation(language, "since"), value: "2019" },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">
                      {item.label}
                    </p>
                    <p className="text-primary font-serif text-lg mt-1">
                      {item.value}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8 bg-primary/15" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image column — full-bleed */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-0">
            <div className="relative h-full w-full overflow-hidden">
              <ImageWithFallback
                src={imgYan}
                alt="Yan Maihur – mBar"
                className="w-full h-full object-cover"
                style={{ maxHeight: "620px" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/40 to-transparent" />
              <p className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.2em] text-white/60">
                {getTranslation(language, "photoCaption")}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Stats ── */}
      <div className="w-full bg-primary">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between p-10 md:p-14 gap-12 ${
                  i < 2 ? "border-b md:border-b-0 border-white/10" : ""
                }`}
              >
                <span className="text-secondary text-[10px] uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
                <span
                  className="font-serif text-[#faf9f7]"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 9rem)",
                    lineHeight: 0.85,
                  }}
                >
                  {stat.prefix && (
                    <span
                      className="text-secondary"
                      style={{ fontSize: "0.5em", verticalAlign: "middle" }}
                    >
                      {stat.prefix}
                    </span>
                  )}
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Divider strip ── */}
      <div className="w-full border-b border-primary/10 bg-[#faf9f7]">
        <Container className="py-5 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary/30">
            mBar © 2019–2025
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary/30">
            {getTranslation(language, "craftTagline")}
          </span>
        </Container>
      </div>

      {/* ── Signature Blocks ── */}
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
          {signatureBlocks.map((block) => (
            <div
              key={block.num}
              className="bg-[#faf9f7] relative overflow-hidden group"
            >
              {/* BG image */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={block.src}
                  alt={block.alt}
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-700"
                />
              </div>
              {/* Decorative numeral */}
              <span
                className="absolute top-4 right-6 font-serif text-primary/[0.06] select-none pointer-events-none z-0"
                style={{ fontSize: "clamp(8rem, 18vw, 18rem)", lineHeight: 1 }}
              >
                {block.num}
              </span>
              <div className="relative z-10 p-12 md:p-16 flex flex-col justify-between gap-10 min-h-[300px]">
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif text-primary leading-tight mb-8 whitespace-pre-line">
                    {block.title}
                  </h3>
                  <p className="text-primary/60 font-light leading-relaxed border-l-2 border-secondary pl-6 max-w-md">
                    {block.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* ── Values ── */}
      <div className="w-full bg-primary text-[#faf9f7] py-16 md:py-20">
        <Container>
          <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-10">
            <h3 className="text-4xl md:text-6xl font-serif">
              {getTranslation(language, "valuesTitle")}
            </h3>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs text-right hidden md:block">
              {getTranslation(language, "ourValues")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {values.map((v) => (
              <div
                key={v.num}
                className="px-0 md:px-10 first:pl-0 last:pr-0 py-8 md:py-0 flex flex-col gap-4"
              >
                <span
                  className="font-serif text-secondary/20 leading-none select-none"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                >
                  {v.num}
                </span>
                <h4 className="text-xl md:text-2xl font-serif">
                  {getTranslation(language, v.key)}
                </h4>
                <p className="text-white/50 leading-relaxed font-light border-l-2 border-secondary/50 pl-5">
                  {getTranslation(language, v.descKey)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
