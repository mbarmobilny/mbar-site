import { useSyncExternalStore } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

const DESKTOP_MIN_WIDTH = 768;
const MEDIA_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;

function useIsDesktop() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(MEDIA_QUERY);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia(MEDIA_QUERY).matches
        : false,
    () => false
  );
}

interface ContactWithCopyProps {
  href: string;
  textToCopy: string;
  children: React.ReactNode;
  linkClassName?: string;
  containerClassName?: string;
  /** Icon color for light backgrounds (e.g. text-primary). Omit for dark backgrounds. */
  iconClassName?: string;
}

/**
 * Contact link (tel:/mailto:) with a copy icon. Link works normally;
 * copy icon copies to clipboard and shows toast. Copy icon only on desktop.
 */
export function ContactWithCopy({
  href,
  textToCopy,
  children,
  linkClassName,
  containerClassName,
  iconClassName = "text-current",
}: ContactWithCopyProps) {
  const { language } = useLanguage();
  const isDesktop = useIsDesktop();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success(getTranslation(language, "copied"));
      })
      .catch(() => {});
  };

  return (
    <span
      className={`inline-flex items-center gap-4 ${containerClassName ?? ""}`}
    >
      <a href={href} className={linkClassName}>
        {children}
      </a>
      {isDesktop && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={getTranslation(language, "copy")}
          className={`contact-copy-btn inline-flex p-1 rounded shrink-0 ${iconClassName}`}
          title={getTranslation(language, "copy")}
        >
          <Copy className="w-4 h-4" />
        </button>
      )}
    </span>
  );
}
