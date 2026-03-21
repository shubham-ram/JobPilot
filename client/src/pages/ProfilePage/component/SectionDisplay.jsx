import {
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionDisplay({ sectionKey, data, onEdit }) {
  if (!data || data.length === 0) {
    return (
      <button
        type="button"
        onClick={onEdit}
        className={cn(
          "w-full py-8 flex flex-col items-center justify-center rounded-xl",
          "bg-bg-secondary hover:bg-bg-input border border-dashed border-border-default hover:border-accent/40",
          "transition-all cursor-pointer group"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-bg-card border border-border-default flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
          <Plus
            size={20}
            className="text-text-muted group-hover:text-accent transition-colors"
          />
        </div>
        <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
          No entries added yet
        </p>
        <p className="text-xs text-text-muted mt-1">
          Click here to add your first entry
        </p>
      </button>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const [year, month] = dateString.split("-");
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  switch (sectionKey) {
    case "summary":
      return (
        <div className="space-y-4">
          {data.map((item, i) => (
            <p
              key={i}
              className="text-text-secondary whitespace-pre-wrap leading-relaxed text-sm"
            >
              {item.description || item.title || item.summary}
            </p>
          ))}
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative pl-6 border-l-2 border-border-default/50 last:border-transparent"
            >
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-bg-card" />
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-text-secondary flex items-center gap-1.5 mt-0.5">
                    <Briefcase size={14} className="text-accent/70" />
                    {item.organization}
                  </p>
                </div>
                <div className="text-xs font-medium text-text-muted bg-bg-secondary px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-border-default/50">
                  <Calendar size={12} />
                  {formatDate(item.startDate)} —{" "}
                  {item.currentlyWorking ? "Present" : formatDate(item.endDate)}
                </div>
              </div>
              {item.description && (
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="space-y-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative pl-6 border-l-2 border-border-default/50 last:border-transparent"
            >
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-bg-card" />
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-text-primary">
                    {item.degree || item.title}
                  </h4>
                  <p className="text-sm font-medium text-text-secondary flex items-center gap-1.5 mt-0.5">
                    <GraduationCap size={14} className="text-accent/70" />
                    {item.organization}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-text-muted bg-bg-secondary px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 border border-border-default/50">
                    <Calendar size={12} />
                    {formatDate(item.startDate)} —{" "}
                    {item.currentlyWorking
                      ? "Present"
                      : formatDate(item.endDate)}
                  </div>
                  {item.metadata?.gpa && (
                    <div className="text-xs font-medium text-accent mt-2">
                      GPA: {item.metadata.gpa}
                    </div>
                  )}
                </div>
              </div>
              {item.description && (
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    case "project":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className={cn(
                "p-4 rounded-xl border border-border-default bg-bg-secondary",
                "flex flex-col hover:border-accent/40 transition-colors"
              )}
            >
              <h4 className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Code size={16} className="text-accent" />
                {item.projectName || item.title}
              </h4>
              {item.description && (
                <p className="text-sm text-text-secondary mt-2 flex-grow line-clamp-3">
                  {item.description}
                </p>
              )}
              {item.technology && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.technology.split(",").map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="flex flex-wrap gap-2">
          {data.map((item, i) => (
            <div
              key={i}
              className={cn(
                "px-3 py-1.5 rounded-full bg-bg-secondary border border-border-default flex items-center gap-2",
                "text-sm font-medium text-text-primary hover:border-accent/50 transition-colors"
              )}
            >
              <CheckCircle2 size={14} className="text-accent" />
              {item.skill || item.title}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
