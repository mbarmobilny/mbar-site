import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LanguageProvider } from "./context/LanguageContext";
import App from "./App.tsx";
import "./index.css";

// Google Analytics 4 (optional — set VITE_GA_ID in .env)
const gaId = import.meta.env.VITE_GA_ID;
if (gaId) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  (window as unknown as { dataLayer: unknown[] }).dataLayer =
    (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
  const gtag = (...args: unknown[]) =>
    (
      (window as unknown as { dataLayer: unknown[] }).dataLayer as unknown[]
    ).push(args);
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  gtag("js", new Date());
  gtag("config", gaId);
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ErrorBoundary>,
);
