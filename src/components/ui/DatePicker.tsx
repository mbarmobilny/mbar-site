import * as React from "react";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  id?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  language: string;
  placeholder?: string;
  className?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function DatePicker({
  id,
  date,
  setDate,
  language,
  placeholder,
  className,
  ariaInvalid = false,
  ariaDescribedBy,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const today = React.useMemo(() => startOfToday(), []);
  const firstAvailableMonth = React.useMemo(() => startOfMonth(today), [today]);
  const lastAvailableMonth = React.useMemo(
    () => new Date(today.getFullYear() + 5, 11, 1),
    [today]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          id={id}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-light rounded-none border-x-0 border-t-0 border-b border-primary/20 bg-transparent px-0 py-4 text-primary hover:bg-transparent hover:text-primary shadow-none h-auto text-base",
            !date && "text-primary/40",
            className
          )}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50 hidden" />
          {date ? (
            format(date, "P", { locale: language === "pl" ? pl : enUS })
          ) : (
            <span>
              {placeholder ||
                (language === "pl" ? "Wybierz datę" : "Select date")}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[22rem] max-w-[calc(100vw-2rem)] p-0 rounded-none border border-secondary/20 bg-primary"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setOpen(false);
          }}
          disabled={{ before: today }}
          fromMonth={firstAvailableMonth}
          toMonth={lastAvailableMonth}
          captionLayout="dropdown"
          fixedWeeks
          initialFocus
          locale={language === "pl" ? pl : enUS}
          className="w-full bg-primary text-secondary"
          classNames={{
            months: "w-full",
            day_selected:
              "!bg-secondary !text-primary hover:!bg-secondary hover:!text-primary focus:!bg-secondary focus:!text-primary rounded-none opacity-100 font-medium",
            day_today:
              "bg-secondary/25 text-secondary rounded-none font-bold opacity-100 border border-secondary/50",
            day: "h-9 w-9 p-0 font-normal rounded-none transition-all duration-300 text-secondary hover:text-secondary hover:bg-secondary/10 aria-selected:opacity-100",
            day_outside:
              "invisible pointer-events-none aria-selected:!bg-secondary aria-selected:!text-primary",
            day_disabled:
              "text-secondary/40 opacity-60 cursor-not-allowed pointer-events-none",
            month: "w-full space-y-4",
            caption:
              "flex items-center justify-center w-full pb-3 mb-1",
            caption_label:
              "mbar-calendar-caption-label pointer-events-none relative z-[1] inline-flex h-12 w-full items-center justify-between rounded-none border border-secondary/25 bg-primary px-4 font-serif text-[1.05rem] tracking-wide text-secondary",
            caption_dropdowns:
              "grid w-full grid-cols-[minmax(0,1fr)_minmax(0,6.5rem)] gap-3",
            dropdown:
              "mbar-calendar-dropdown absolute inset-0 z-[2] m-0 h-full w-full cursor-pointer appearance-none opacity-0",
            dropdown_month: "relative inline-flex w-full items-center",
            dropdown_year: "relative inline-flex w-full items-center",
            dropdown_icon: "text-secondary/70",
            vhidden: "sr-only",
            head_row:
              "flex w-full gap-1 border-b border-secondary/20 pb-2 mb-1",
            head_cell:
              "text-secondary rounded-none w-9 min-w-[2.25rem] font-medium text-[0.8rem] uppercase tracking-widest opacity-100 px-1",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-none last:[&:has([aria-selected])]:rounded-r-none focus-within:relative focus-within:z-20",
            nav_button:
              "border border-secondary/20 hover:bg-secondary/10 text-secondary rounded-none opacity-100 transition-colors",
            table: "w-full border-collapse space-y-1 table-fixed",
            row: "flex w-full mt-2 justify-between",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
