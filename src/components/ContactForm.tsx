import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { getTranslation } from "../utils/translations";
import { DatePicker } from "./ui/DatePicker";
import { SwissButton } from "./ui/SwissButton";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "../context/LanguageContext";

interface ContactFormProps {
  selectedPackage?: string;
}

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  guestCount: "",
  location: "",
  message: "",
  packageChoice: "",
};

const PHONE = import.meta.env.VITE_PHONE || "+48578224721";
const EMAIL = import.meta.env.VITE_EMAIL || "mbarmobilny@gmail.com";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/mbarmobilny";
const FACEBOOK_URL =
  import.meta.env.VITE_FACEBOOK_URL ||
  "https://www.facebook.com/share/17HJkD8LRt/";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function ContactForm({ selectedPackage = "" }: ContactFormProps) {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    packageChoice: selectedPackage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const packageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, packageChoice: selectedPackage }));
      setTimeout(() => {
        packageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 400);
    }
  }, [selectedPackage]);

  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error(
        t("eventDate") +
          " — " +
          (language === "pl" ? "proszę wybrać datę" : "please select a date"),
      );
      return;
    }
    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDay.getTime() < today.getTime()) {
      toast.error(t("datePastError"));
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error(
        language === "pl"
          ? "Proszę podać prawidłowy adres e-mail."
          : "Please enter a valid email address.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            eventType: formData.eventType,
            guestCount: formData.guestCount,
            location: formData.location,
            message: formData.message,
            packageChoice: formData.packageChoice,
            eventDate: date?.toISOString().split("T")[0],
          }),
        });

        if (!res.ok) throw new Error("Form submission failed");
      } else {
        const subject =
          language === "pl"
            ? `[mBar] Zapytanie od ${formData.name}`
            : `[mBar] Inquiry from ${formData.name}`;
        const body =
          `${t("name")}: ${formData.name}\n${t("email")}: ${formData.email}\n${t("phone")}: ${formData.phone}\n` +
          `${t("eventType")}: ${formData.eventType}\n${t("guestCount")}: ${formData.guestCount}\n` +
          `${t("location")}: ${formData.location}\n${t("packageField")}: ${formData.packageChoice}\n` +
          `${t("eventDate")}: ${date?.toISOString().split("T")[0]}\n\n${t("message")}:\n${formData.message}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      toast.success(
        language === "pl"
          ? "Dziękujemy! Skontaktujemy się w ciągu 24 godzin."
          : "Thank you! We'll get back to you within 24 hours.",
      );
      setFormData(EMPTY_FORM);
      setDate(undefined);
    } catch {
      toast.error(
        language === "pl"
          ? "Wystąpił błąd. Spróbuj wysłać e-mail bezpośrednio."
          : "Something went wrong. Please try sending an email directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email") setEmailError(null);
  };

  const handleEmailBlur = () => {
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      setEmailError(
        language === "pl"
          ? "Nieprawidłowy adres e-mail"
          : "Invalid email address",
      );
    } else {
      setEmailError(null);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-primary/20 py-4 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-secondary transition-colors duration-300 font-light rounded-none";
  const labelCls =
    "block text-xs uppercase tracking-widest text-primary/60 mb-2 font-medium";

  const contactItems = [
    {
      icon: Phone,
      label: t("phone"),
      value: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
    },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t("area"), value: t("serviceArea") },
    { icon: Calendar, label: t("response"), value: t("responseTime") },
  ];

  const whyUsItems = [
    t("premiumEquipment"),
    t("customMenuShort"),
    t("quality"),
    t("professionalism"),
    t("creativity"),
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-16 pb-20">
      <Container>
        <SectionHeader
          label={t("contactLabel")}
          title={t("contactTitle")}
          description={t("contactSubtitle")}
          className="mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-16">
            <div>
              <h3 className="text-2xl font-serif text-primary mb-8">
                {t("contactDetails")}
              </h3>
              <div className="space-y-8">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="group flex items-start gap-6 hover:translate-x-2 transition-transform duration-300"
                  >
                    <Icon className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-primary/40 mb-1">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-xl text-primary font-light hover:text-secondary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-xl text-primary font-light">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="pt-6 border-t border-primary/10">
                  <span className="block text-xs uppercase tracking-widest text-primary/40 mb-3">
                    {t("findUsOn")}
                  </span>
                  <div className="flex gap-4">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="text-lg font-light">Instagram</span>
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="text-lg font-light">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8 md:p-12 text-[#faf9f7]">
              <h4 className="text-2xl font-serif mb-6">{t("whyUs")}</h4>
              <ul className="space-y-4 font-light text-white/70">
                {whyUsItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-8 md:p-16 border border-primary/5">
            <h3 className="text-3xl font-serif text-primary mb-12">
              {t("quoteForm")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label htmlFor="name" className={labelCls}>
                    {t("name")} *
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t("namePlaceholder")}
                    required
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={labelCls}>
                    {t("email")} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder={t("emailPlaceholder")}
                    required
                    className={`${inputCls} ${emailError ? "!border-destructive" : ""}`}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label htmlFor="phone" className={labelCls}>
                    {t("phone")} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    required
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventDate" className={labelCls}>
                    {t("eventDate")} *
                  </label>
                  <DatePicker
                    date={date}
                    setDate={setDate}
                    language={language}
                    placeholder={
                      language === "pl" ? "DD.MM.RRRR" : "DD.MM.YYYY"
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label htmlFor="location" className={labelCls}>
                    {t("location")} *
                  </label>
                  <input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder={t("locationPlaceholder")}
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label htmlFor="eventType" className={labelCls}>
                    {t("eventType")}
                  </label>
                  <select
                    id="eventType"
                    value={formData.eventType}
                    onChange={(e) => handleChange("eventType", e.target.value)}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      {t("selectEventType")}
                    </option>
                    <option value="wedding">{t("wedding")}</option>
                    <option value="corporate">{t("corporateEvent")}</option>
                    <option value="birthday">{t("birthday")}</option>
                    <option value="anniversary">{t("anniversary")}</option>
                    <option value="holiday">{t("holidayParty")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="guestCount" className={labelCls}>
                    {t("guestCount")}
                  </label>
                  <select
                    id="guestCount"
                    value={formData.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      {t("selectNumber")}
                    </option>
                    <option value="25-50">25–50</option>
                    <option value="50-100">50–100</option>
                    <option value="100-150">100–150</option>
                    <option value="150-200">150–200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label htmlFor="packageChoice" className={labelCls}>
                    {t("packageField")}
                  </label>
                  <div className="relative">
                    <select
                      id="packageChoice"
                      ref={packageRef}
                      value={formData.packageChoice}
                      onChange={(e) =>
                        handleChange("packageChoice", e.target.value)
                      }
                      className={`${inputCls} ${formData.packageChoice ? "text-primary" : ""}`}
                    >
                      <option value="">{t("noPackagePreference")}</option>
                      <option value="Basic">{t("packageBasic")}</option>
                      <option value="Pro">{t("packagePro")}</option>
                      <option value="Deluxe">{t("packageDeluxe")}</option>
                    </select>
                    {formData.packageChoice && (
                      <span className="absolute right-0 bottom-4 text-[10px] uppercase tracking-[0.2em] text-secondary pointer-events-none">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={labelCls}>
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows={3}
                  className={`${inputCls} resize-none pb-2`}
                />
              </div>

              <SwissButton
                type="submit"
                variant="inverse"
                showSeparator={false}
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? language === "pl"
                    ? "Wysyłanie..."
                    : "Sending..."
                  : t("sendMessage")}
              </SwissButton>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
