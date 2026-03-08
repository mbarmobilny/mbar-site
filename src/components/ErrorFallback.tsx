import { getTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const { language } = useLanguage();
  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key);

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-8">
      <div className="max-w-lg bg-white border border-primary/20 rounded-lg p-8 shadow-lg">
        <h1 className="text-xl font-serif text-primary mb-4">
          {t("errorTitle")}
        </h1>
        <p className="text-primary/80 mb-4 font-mono text-sm break-all">
          {error.message}
        </p>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          {t("errorReload")}
        </button>
      </div>
    </div>
  );
}
