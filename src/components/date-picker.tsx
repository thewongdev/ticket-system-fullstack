"use client";

import { format } from "date-fns";
import { LucideChevronDown } from "lucide-react";
import { useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ImperativeHandleDatePicker = {
  reset: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.Ref<ImperativeHandleDatePicker>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" asChild>
          <Button
            variant="outline"
            id={id}
            className="justify-start text-left font-normal"
          >
            {formattedStringDate}

            {/* hidden input to submit the date to the form */}
            <input type="hidden" name={name} value={formattedStringDate} />

            <LucideChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DatePicker };
