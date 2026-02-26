import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LanguageProvider } from "./context/LanguageContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ErrorBoundary>,
);
