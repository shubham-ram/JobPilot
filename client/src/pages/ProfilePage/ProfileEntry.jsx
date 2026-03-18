import { Pencil, Trash2 } from "lucide-react";

export function ProfileEntry({ entry, onEdit, onDelete }) {
  return (
    <div className="group flex items-start justify-between p-4 bg-bg-secondary rounded-xl border border-border-default hover:border-accent/20 transition-all">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text-primary">{entry.title}</h4>
        {entry.organization && (
          <p className="text-sm text-accent mt-0.5">{entry.organization}</p>
        )}
        {entry.startDate && (
          <p className="text-xs text-text-muted mt-1">
            {entry.startDate} — {entry.endDate || "Present"}
          </p>
        )}
        {entry.description && (
          <p className="text-sm text-text-secondary mt-2 whitespace-pre-wrap">
            {entry.description}
          </p>
        )}
        {entry.metadata?.technologies && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {entry.metadata.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-accent-soft text-accent text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {entry.metadata?.gpa && (
          <p className="text-xs text-text-muted mt-1">
            GPA: {entry.metadata.gpa}
          </p>
        )}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
        <button
          onClick={() => onEdit(entry)}
          className="p-2 hover:bg-bg-card rounded-lg text-text-muted hover:text-accent transition-all cursor-pointer"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="p-2 hover:bg-bg-card rounded-lg text-text-muted hover:text-danger transition-all cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
