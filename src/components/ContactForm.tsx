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
import {
  PHONE,
  EMAIL,
  FORMSPREE_ID,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "../utils/constants";
import { ContactWithCopy } from "./CopyableContactLink";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function formatDateForSubmission(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeFormData(formData: typeof EMPTY_FORM) {
  return {
    ...formData,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    location: formData.location.trim(),
    message: formData.message.trim(),
  };
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
  const [dateError, setDateError] = useState<string | null>(null);
  const packageRef = useRef<HTMLSelectElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setFormData((prev) =>
      prev.packageChoice === selectedPackage
        ? prev
        : { ...prev, packageChoice: selectedPackage }
    );

    if (!selectedPackage) return undefined;

    scrollTimeoutRef.current = window.setTimeout(() => {
      packageRef.current?.focus();
      packageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 400);

    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [selectedPackage]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedFormData = normalizeFormData(formData);
    const dateRequiredMessage =
      language === "pl" ? "proszę wybrać datę" : "please select a date";
    const invalidEmailMessage =
      language === "pl"
        ? "Proszę podać prawidłowy adres e-mail."
        : "Please enter a valid email address.";

    setFormData((prev) =>
      prev.name === normalizedFormData.name &&
      prev.email === normalizedFormData.email &&
      prev.phone === normalizedFormData.phone &&
      prev.location === normalizedFormData.location &&
      prev.message === normalizedFormData.message
        ? prev
        : normalizedFormData
    );
    setEmailError(null);
    setDateError(null);

    if (
      !normalizedFormData.name ||
      !normalizedFormData.email ||
      !normalizedFormData.phone ||
      !normalizedFormData.location
    ) {
      toast.error(
        language === "pl"
          ? "Proszę uzupełnić wszystkie wymagane pola."
          : "Please fill in all required fields."
      );
      return;
    }

    if (!date) {
      const message = `${t("eventDate")} — ${dateRequiredMessage}`;
      setDateError(message);
      toast.error(message);
      return;
    }

    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDay.getTime() < today.getTime()) {
      setDateError(t("datePastError"));
      toast.error(t("datePastError"));
      return;
    }

    if (!isValidEmail(normalizedFormData.email)) {
      setEmailError(
        language === "pl"
          ? "Nieprawidłowy adres e-mail"
          : "Invalid email address"
      );
      toast.error(invalidEmailMessage);
      return;
    }

    const eventDate = formatDateForSubmission(date);

    setIsSubmitting(true);

    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: normalizedFormData.name,
            email: normalizedFormData.email,
            phone: normalizedFormData.phone,
            eventType: normalizedFormData.eventType,
            guestCount: normalizedFormData.guestCount,
            location: normalizedFormData.location,
            message: normalizedFormData.message,
            packageChoice: normalizedFormData.packageChoice,
            eventDate,
          }),
        });

        if (!res.ok) throw new Error("Form submission failed");

        toast.success(
          language === "pl"
            ? "Dziękujemy! Skontaktujemy się w ciągu 24 godzin."
            : "Thank you! We'll get back to you within 24 hours."
        );
        setFormData(EMPTY_FORM);
        setDate(undefined);
        return;
      }

      const subject =
        language === "pl"
          ? `[mBar] Zapytanie od ${normalizedFormData.name}`
          : `[mBar] Inquiry from ${normalizedFormData.name}`;
      const body =
        `${t("name")}: ${normalizedFormData.name}\n${t("email")}: ${normalizedFormData.email}\n${t("phone")}: ${normalizedFormData.phone}\n` +
        `${t("eventType")}: ${normalizedFormData.eventType}\n${t("guestCount")}: ${normalizedFormData.guestCount}\n` +
        `${t("location")}: ${normalizedFormData.location}\n${t("packageField")}: ${normalizedFormData.packageChoice}\n` +
        `${t("eventDate")}: ${eventDate}\n\n${t("message")}:\n${normalizedFormData.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast.success(
        language === "pl"
          ? "Otwieramy aplikację pocztową z gotową wiadomością."
          : "Opening your email app with a pre-filled message."
      );
    } catch (err) {
      console.error("Contact form submission failed:", err);
      toast.error(
        language === "pl"
          ? "Wystąpił błąd. Spróbuj wysłać e-mail bezpośrednio."
          : "Something went wrong. Please try sending an email directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email") setEmailError(null);
  };

  const handleDateChange = (nextDate: Date | undefined) => {
    setDate(nextDate);
    setDateError(null);
  };

  const handleEmailBlur = () => {
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      setEmailError(
        language === "pl"
          ? "Nieprawidłowy adres e-mail"
          : "Invalid email address"
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
      textToCopy: PHONE.replace(/\s/g, ""),
    },
    {
      icon: Mail,
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      textToCopy: EMAIL,
    },
    {
      icon: MapPin,
      label: t("area"),
      value: t("serviceArea"),
      href: undefined,
      textToCopy: undefined,
    },
    {
      icon: Calendar,
      label: t("response"),
      value: t("responseTime"),
      href: undefined,
      textToCopy: undefined,
    },
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
                {contactItems.map(
                  ({ icon: Icon, label, value, href, textToCopy }) => (
                    <div
                      key={label}
                      className="group flex items-start gap-6 hover:translate-x-2 transition-transform duration-300"
                    >
                      <Icon className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <span className="block text-xs uppercase tracking-widest text-primary/40 mb-1">
                          {label}
                        </span>
                        {href && textToCopy ? (
                          <ContactWithCopy
                            href={href}
                            textToCopy={textToCopy}
                            linkClassName="text-xl text-primary font-light hover:text-secondary transition-colors"
                            iconClassName="text-primary"
                          >
                            {value}
                          </ContactWithCopy>
                        ) : (
                          <p className="text-xl text-primary font-light">
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
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
                    autoComplete="name"
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
                    autoComplete="email"
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
                    autoComplete="tel"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventDate" className={labelCls}>
                    {t("eventDate")} *
                  </label>
                  <DatePicker
                    id="eventDate"
                    date={date}
                    setDate={handleDateChange}
                    language={language}
                    placeholder={
                      language === "pl" ? "DD.MM.RRRR" : "DD.MM.YYYY"
                    }
                    ariaInvalid={!!dateError}
                    ariaDescribedBy={dateError ? "eventDate-error" : undefined}
                  />
                  {dateError && (
                    <p
                      id="eventDate-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {dateError}
                    </p>
                  )}
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
                    autoComplete="street-address"
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
                    <option value="1-50">1–50</option>
                    <option value="51-70">51–70</option>
                    <option value="71-100">71–100</option>
                    <option value="101+">101+</option>
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
