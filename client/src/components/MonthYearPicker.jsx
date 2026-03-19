import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthYearPicker({
  value,
  onChange,
  disabled,
  placeholder = "Select date",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value) {
      const [y] = value.split("-");
      return parseInt(y);
    }
    return new Date().getFullYear();
  });
  const ref = useRef(null);

  // Parse value (format: "YYYY-MM")
  const selectedYear = value ? parseInt(value.split("-")[0]) : null;
  const selectedMonth = value ? parseInt(value.split("-")[1]) - 1 : null;

  // Format display text
  const displayText = value ? `${MONTHS[selectedMonth]} ${selectedYear}` : null;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthSelect = (monthIndex) => {
    const month = String(monthIndex + 1).padStart(2, "0");
    onChange(`${viewYear}-${month}`);
    setIsOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 bg-bg-input border border-border-default rounded-lg text-sm transition-all",
          disabled
            ? "opacity-40 cursor-not-allowed text-text-muted"
            : "cursor-pointer hover:border-accent/40 text-text-primary",
          isOpen && "border-accent ring-1 ring-accent/30",
        )}
      >
        <span className={displayText ? "text-text-primary" : "text-text-muted"}>
          {displayText || placeholder}
        </span>
        <Calendar size={15} className="text-text-muted" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[260px] bg-bg-card border border-border-default rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Year Navigation */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
            <button
              type="button"
              onClick={() => setViewYear((y) => y - 1)}
              className="p-1.5 hover:bg-bg-card-hover rounded-lg text-text-muted hover:text-text-primary transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-text-primary">
              {viewYear}
            </span>
            <button
              type="button"
              onClick={() => setViewYear((y) => y + 1)}
              className="p-1.5 hover:bg-bg-card-hover rounded-lg text-text-muted hover:text-text-primary transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 gap-1 p-3">
            {MONTHS.map((month, idx) => {
              const isSelected =
                selectedYear === viewYear && selectedMonth === idx;
              const isFuture =
                viewYear > currentYear ||
                (viewYear === currentYear && idx > currentMonth);

              return (
                <button
                  type="button"
                  key={month}
                  disabled={isFuture}
                  onClick={() => handleMonthSelect(idx)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer",
                    isSelected
                      ? "bg-accent text-white shadow-md shadow-accent/30"
                      : isFuture
                        ? "text-text-muted/40 cursor-not-allowed"
                        : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary",
                  )}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthYearPicker;
