import * as React from "react";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  language: string;
  placeholder?: string;
  className?: string;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function DatePicker({
  date,
  setDate,
  language,
  placeholder,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-light rounded-none border-x-0 border-t-0 border-b border-primary/20 bg-transparent px-0 py-4 text-primary hover:bg-transparent hover:text-primary shadow-none h-auto text-base",
            !date && "text-primary/40",
            className,
          )}
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
        className="w-auto p-0 rounded-none border border-secondary/20 bg-primary"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setOpen(false);
          }}
          disabled={{ before: startOfToday() }}
          initialFocus
          locale={language === "pl" ? pl : enUS}
          className="p-3 bg-primary text-secondary"
          classNames={{
            day_selected:
              "!bg-secondary !text-primary hover:!bg-secondary hover:!text-primary focus:!bg-secondary focus:!text-primary rounded-none opacity-100 font-medium",
            day_today:
              "bg-secondary/25 text-secondary rounded-none font-bold opacity-100 border border-secondary/50",
            day: "h-9 w-9 p-0 font-normal rounded-none transition-all duration-300 text-secondary hover:text-secondary hover:bg-secondary/10 aria-selected:opacity-100",
            day_outside:
              "text-secondary/50 aria-selected:!bg-secondary aria-selected:!text-primary",
            day_disabled:
              "text-secondary/40 opacity-60 cursor-not-allowed pointer-events-none",
            head_row: "flex w-full gap-1",
            head_cell:
              "text-secondary rounded-none w-9 min-w-[2.25rem] font-medium text-[0.8rem] uppercase tracking-widest opacity-100 px-1",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-none last:[&:has([aria-selected])]:rounded-r-none focus-within:relative focus-within:z-20",
            nav_button:
              "border border-secondary/20 hover:bg-secondary/10 text-secondary rounded-none opacity-100 transition-colors",
            caption:
              "flex justify-center pt-1 relative items-center w-full text-secondary font-serif text-lg mb-2 tracking-wide",
            table: "w-full border-collapse space-y-1",
            month: "space-y-4",
            row: "flex w-full mt-2 justify-between",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
