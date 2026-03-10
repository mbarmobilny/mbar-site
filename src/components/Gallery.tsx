import { ImageWithFallback } from "./ui/ImageWithFallback";
import { motion } from "motion/react";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { getTranslation, type TranslationKey } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createPortal } from "react-dom";
import { Play } from "lucide-react";

type GalleryImageCategory = "cocktails" | "setup" | "events";
type GalleryMediaFilter = "photos" | "video";
type GalleryPhotoFilter = "all" | GalleryImageCategory;

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: GalleryImageCategory;
  captionKey?: TranslationKey;
}

interface GalleryVideo {
  videoId: string;
  title: string;
  category: "video";
}

type GalleryItem =
  | { kind: "image"; data: GalleryImage }
  | { kind: "video"; data: GalleryVideo };

const VIDEO_MODAL_MAX_WIDTH = 460;
const VIDEO_MODAL_MIN_WIDTH = 320;
const VIDEO_MODAL_VIEWPORT_WIDTH_RATIO = 0.92;
const VIDEO_MODAL_VIEWPORT_HEIGHT_RATIO = 0.9;

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
import imgEventsImg4 from "../assets/gallery-events-img4.webp";
import imgEventsImg5 from "../assets/gallery-events-img5.webp";

const galleryImages: GalleryImage[] = [
  // Cocktails
  {
    src: imgCocktailsAviation,
    alt: "Aviation",
    title: "Aviation",
    category: "cocktails",
    captionKey: "cocktailAviationCaption",
  },
  {
    src: imgCocktailsSiesta,
    alt: "Siesta",
    title: "Siesta",
    category: "cocktails",
    captionKey: "cocktailSiestaCaption",
  },
  {
    src: imgCocktailsYennefer,
    alt: "Yennefer cocktail",
    title: "Yennefer",
    category: "cocktails",
    captionKey: "cocktailYenneferCaption",
  },
  {
    src: imgCocktailsCloverclub,
    alt: "Clover Club",
    title: "Clover Club",
    category: "cocktails",
    captionKey: "cocktailCloverClubCaption",
  },
  {
    src: imgCocktailsGringo,
    alt: "Gringo",
    title: "Gringo",
    category: "cocktails",
    captionKey: "cocktailGringoCaption",
  },
  {
    src: imgCocktailsNegroni,
    alt: "Negroni",
    title: "Negroni",
    category: "cocktails",
    captionKey: "cocktailNegroniCaption",
  },
  {
    src: imgCocktailsPornStar,
    alt: "Porn Star Martini",
    title: "Porn Star Martini",
    category: "cocktails",
    captionKey: "cocktailPornStarCaption",
  },
  {
    src: imgCocktailsVermouth,
    alt: "Vermouth cocktail",
    title: "Vermouth cocktail",
    category: "cocktails",
    captionKey: "cocktailVermouthCaption",
  },
  {
    src: imgCocktailsWs,
    alt: "Whiskey Sour",
    title: "Whiskey Sour",
    category: "cocktails",
    captionKey: "cocktailWhiskeySourCaption",
  },
  {
    src: imgCocktailsAperol,
    alt: "Aperol Spritz",
    title: "Aperol Spritz",
    category: "cocktails",
    captionKey: "cocktailAperolCaption",
  },
  {
    src: imgCocktailsGintonic,
    alt: "Gin Tonic",
    title: "Gin Tonic",
    category: "cocktails",
    captionKey: "cocktailGinTonicCaption",
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
  { src: imgEventsImg5, alt: "Event", title: "Event 5", category: "events" },
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
  { src: imgEventsImg4, alt: "Event", title: "Event 4", category: "events" },
];

/** YouTube videos — Shorts from youtube.com/shorts/VIDEO_ID */
const galleryVideos: GalleryVideo[] = [
  { videoId: "FulN15i4_pA", title: "mBar", category: "video" },
  { videoId: "5SQ31Ku2r14", title: "mBar", category: "video" },
  { videoId: "6l9PQW5UuOo", title: "mBar", category: "video" },
  { videoId: "kG6lon5xN5g", title: "mBar", category: "video" },
  { videoId: "D1teIypXpCI", title: "mBar", category: "video" },
  { videoId: "D1c9e-uk23M", title: "mBar", category: "video" },
  { videoId: "E0ijRB4CL0k", title: "mBar", category: "video" },
  { videoId: "S2IelXzUqQI", title: "mBar", category: "video" },
];

function getYoutubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getYoutubeThumbnailSources(videoId: string) {
  return [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
    getYoutubeThumbnail(videoId),
  ];
}

function getYoutubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
}

function getVideoModalWidth(viewportWidth: number, viewportHeight: number) {
  const widthByViewport = viewportWidth * VIDEO_MODAL_VIEWPORT_WIDTH_RATIO;
  const widthByHeight =
    viewportHeight * VIDEO_MODAL_VIEWPORT_HEIGHT_RATIO * (9 / 16);

  return Math.max(
    Math.min(VIDEO_MODAL_MIN_WIDTH, widthByViewport),
    Math.min(VIDEO_MODAL_MAX_WIDTH, widthByViewport, widthByHeight)
  );
}

function getExpandRowIndices(count: number, cols: number): number[] {
  const remainder = count % cols;
  const emptyCount = remainder === 0 ? 0 : cols - remainder;
  if (emptyCount === 0) return [];

  const lastFullRowStart = Math.floor(count / cols) * cols;
  return Array.from(
    { length: emptyCount },
    (_, i) => lastFullRowStart - emptyCount + i
  );
}

function getCocktailCaption(language: string, image: GalleryImage) {
  return image.category === "cocktails" && image.captionKey
    ? getTranslation(language, image.captionKey)
    : "";
}

function VideoThumbnail({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = useMemo(() => getYoutubeThumbnailSources(videoId), [videoId]);

  return (
    <img
      src={sources[sourceIndex]}
      alt={title}
      className={className}
      loading="lazy"
      onError={() => {
        setSourceIndex((currentIndex) =>
          currentIndex < sources.length - 1 ? currentIndex + 1 : currentIndex
        );
      }}
    />
  );
}

export function Gallery() {
  const { language } = useLanguage();
  const [selectedMediaFilter, setSelectedMediaFilter] =
    useState<GalleryMediaFilter>("photos");
  const [selectedPhotoFilter, setSelectedPhotoFilter] =
    useState<GalleryPhotoFilter>("all");
  const [videoOpenId, setVideoOpenId] = useState<string | null>(null);
  const [videoModalWidth, setVideoModalWidth] = useState(() =>
    typeof window === "undefined"
      ? VIDEO_MODAL_MIN_WIDTH
      : getVideoModalWidth(window.innerWidth, window.innerHeight)
  );
  const lightboxRef = useRef<SimpleLightbox | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const mediaFilters = useMemo(
    () => [
      {
        id: "photos" as const,
        name: getTranslation(language, "galleryPhotos"),
      },
      ...(galleryVideos.length > 0
        ? [{ id: "video" as const, name: getTranslation(language, "galleryVideo") }]
        : []),
    ],
    [language]
  );

  const photoFilters = useMemo(
    () => [
      { id: "all" as const, name: getTranslation(language, "allCategories") },
      {
        id: "cocktails" as const,
        name: getTranslation(language, "galleryCocktails"),
      },
      {
        id: "setup" as const,
        name: getTranslation(language, "galleryBarSetup"),
      },
      {
        id: "events" as const,
        name: getTranslation(language, "galleryEvents"),
      },
    ],
    [language]
  );

  const filteredImages = useMemo(() => {
    if (selectedMediaFilter !== "photos") return [];
    if (selectedPhotoFilter === "all") return galleryImages;
    return galleryImages.filter((image) => image.category === selectedPhotoFilter);
  }, [selectedMediaFilter, selectedPhotoFilter]);

  const filteredVideos = useMemo(() => {
    if (selectedMediaFilter === "video") {
      return galleryVideos;
    }
    return [];
  }, [selectedMediaFilter]);

  const filteredItems = useMemo<GalleryItem[]>(
    () => [
      ...filteredImages.map((data) => ({ kind: "image" as const, data })),
      ...filteredVideos.map((data) => ({ kind: "video" as const, data })),
    ],
    [filteredImages, filteredVideos]
  );

  const activeVideo = useMemo(
    () =>
      videoOpenId
        ? galleryVideos.find((video) => video.videoId === videoOpenId) ?? null
        : null,
    [videoOpenId]
  );
  const activeVideoIndex = useMemo(
    () =>
      activeVideo ? filteredVideos.findIndex((v) => v.videoId === activeVideo.videoId) : -1,
    [activeVideo, filteredVideos]
  );
  const hasVideoNavigation = filteredVideos.length > 1;

  const expandLg = useMemo(
    () => getExpandRowIndices(filteredItems.length, 3),
    [filteredItems.length]
  );
  const expandMd = useMemo(
    () => getExpandRowIndices(filteredItems.length, 2),
    [filteredItems.length]
  );

  useEffect(() => {
    if (!activeVideo) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoOpenId(null);
        return;
      }
      if (!hasVideoNavigation || activeVideoIndex < 0) return;

      if (e.key === "ArrowLeft") {
        const prevIndex =
          (activeVideoIndex - 1 + filteredVideos.length) % filteredVideos.length;
        setVideoOpenId(filteredVideos[prevIndex].videoId);
      }
      if (e.key === "ArrowRight") {
        const nextIndex = (activeVideoIndex + 1) % filteredVideos.length;
        setVideoOpenId(filteredVideos[nextIndex].videoId);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [activeVideo, activeVideoIndex, filteredVideos, hasVideoNavigation]);

  useEffect(() => {
    if (!activeVideo) return;

    const updateModalWidth = () => {
      setVideoModalWidth(
        getVideoModalWidth(window.innerWidth, window.innerHeight)
      );
    };

    updateModalWidth();
    window.addEventListener("resize", updateModalWidth);
    return () => window.removeEventListener("resize", updateModalWidth);
  }, [activeVideo]);

  useEffect(() => {
    const links =
      galleryRef.current?.querySelectorAll<HTMLAnchorElement>(
        ".gallery-lightbox"
      ) ?? null;

    lightboxRef.current?.destroy();
    lightboxRef.current = null;

    if (!links?.length) return;

    lightboxRef.current = new SimpleLightbox(links, {
      overlayOpacity: 0.95,
      captionSelector: "self",
      captionsData: "title",
      captionPosition: "bottom",
      captionDelay: 0,
      captionClass: "gallery-lightbox-caption",
      animationSpeed: 250,
      widthRatio: 0.9,
      heightRatio: 0.9,
      disableScroll: true,
      scrollZoom: false,
    });

    return () => {
      lightboxRef.current?.destroy();
      lightboxRef.current = null;
    };
  }, [filteredImages, language]);

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-16 pb-20">
      <Container>
        {/* Header Section */}
        <SectionHeader
          label={getTranslation(language, "galleryWorkLabel")}
          title={getTranslation(language, "galleryTitle")}
          description={getTranslation(language, "gallerySubtitle")}
          className="mb-12"
        />

        {/* Media Filter Section */}
        <div className="mb-4 flex flex-wrap gap-x-8 gap-y-4">
          {mediaFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedMediaFilter(filter.id)}
              aria-pressed={selectedMediaFilter === filter.id}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                selectedMediaFilter === filter.id
                  ? "text-primary font-bold border-b-2 border-secondary pb-1"
                  : "text-primary/50 hover:text-primary pb-1"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {selectedMediaFilter === "photos" && (
          <div className="mb-12 flex flex-wrap gap-x-8 gap-y-4">
            {photoFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedPhotoFilter(filter.id)}
                aria-pressed={selectedPhotoFilter === filter.id}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  selectedPhotoFilter === filter.id
                    ? "text-primary font-bold border-b border-secondary pb-1"
                    : "text-primary/50 hover:text-primary pb-1"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid Section - Strict Grid, No Gaps or Small Gaps, Sharp Edges */}
        <div
          ref={galleryRef}
          className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-[#faf9f7] border border-primary/10"
        >
          {filteredItems.map((item, index) => {
            const shouldExpandLg = expandLg.includes(index);
            const shouldExpandMd = expandMd.includes(index);
            const expandClasses = [
              shouldExpandMd && "gallery-item-expand-md",
              shouldExpandLg && "gallery-item-expand-lg",
            ]
              .filter(Boolean)
              .join(" ");

            if (item.kind === "video") {
              const { videoId, title } = item.data;
              return (
                <motion.div
                  key={`video-${videoId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`video-tile relative aspect-[4/3] overflow-hidden bg-white ${expandClasses}`}
                >
                  <button
                    type="button"
                    onClick={() => setVideoOpenId(videoId)}
                    className="block w-full h-full cursor-pointer relative text-left"
                    aria-label={`${getTranslation(language, "galleryPlayVideo")}: ${title}`}
                    title={title}
                  >
                    <VideoThumbnail
                      videoId={videoId}
                      title={title}
                      className="video-thumb w-full h-full object-cover object-top"
                    />
                    <div className="video-overlay absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-black/15">
                      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                        <div className="flex justify-start">
                          <span className="rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white shadow-md backdrop-blur-sm">
                            {getTranslation(language, "galleryShorts")}
                          </span>
                        </div>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <span className="video-play flex h-18 w-18 items-center justify-center rounded-full bg-white/92 text-primary shadow-2xl ring-8 ring-white/10">
                          <Play
                            className="ml-1 h-8 w-8 fill-current"
                            fill="currentColor"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </motion.div>
              );
            }

            const image = item.data;
            return (
              <motion.div
                key={`${image.category}-${image.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`group relative aspect-[4/3] overflow-hidden bg-white ${expandClasses}`}
              >
                <a
                  href={image.src}
                  className="gallery-lightbox block w-full h-full cursor-pointer relative"
                  title={getCocktailCaption(language, image)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                    <span className="bg-white/90 text-primary px-6 py-3 text-sm uppercase tracking-widest font-medium backdrop-blur-sm">
                      {getTranslation(language, "galleryView")}
                    </span>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {activeVideo &&
          createPortal(
            <div
              style={
                {
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  backgroundColor: "rgba(0, 0, 0, 0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                } as CSSProperties
              }
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
            >
              <button
                type="button"
                onClick={() => setVideoOpenId(null)}
                className="absolute inset-0"
                aria-label="Close video"
              />
              {hasVideoNavigation && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeVideoIndex < 0) return;
                    const prevIndex =
                      (activeVideoIndex - 1 + filteredVideos.length) %
                      filteredVideos.length;
                    setVideoOpenId(filteredVideos[prevIndex].videoId);
                  }}
                  className="fixed h-11 w-11 text-white leading-[1] hover:opacity-80 transition-opacity"
                  style={{ left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10001, fontSize: 48 } as CSSProperties}
                  aria-label="Previous video"
                >
                  &lsaquo;
                </button>
              )}
              {hasVideoNavigation && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeVideoIndex < 0) return;
                    const nextIndex = (activeVideoIndex + 1) % filteredVideos.length;
                    setVideoOpenId(filteredVideos[nextIndex].videoId);
                  }}
                  className="fixed h-11 w-11 text-white leading-[1] hover:opacity-80 transition-opacity"
                  style={{ right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10001, fontSize: 48 } as CSSProperties}
                  aria-label="Next video"
                >
                  &rsaquo;
                </button>
              )}
              <button
                type="button"
                onClick={() => setVideoOpenId(null)}
                className="fixed h-11 w-11 text-white leading-[1] hover:opacity-80 transition-opacity"
                style={{ right: 30, top: 30, zIndex: 10001, fontSize: 48 } as CSSProperties}
                aria-label="Close video"
              >
                &times;
              </button>
              <div
                className="relative overflow-hidden rounded-[20px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={
                  {
                    width: `${videoModalWidth}px`,
                    maxWidth: "92vw",
                    aspectRatio: "9 / 16",
                    zIndex: 10000,
                  } as CSSProperties
                }
              >
                <iframe
                  src={getYoutubeEmbedUrl(activeVideo.videoId)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="block h-full w-full border-0"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>,
            document.body
          )}
      </Container>
    </div>
  );
}
