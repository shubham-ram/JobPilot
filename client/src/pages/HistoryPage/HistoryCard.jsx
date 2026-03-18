import { useState } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronRight,
  Building2,
  HelpCircle,
} from "lucide-react";

export function HistoryCard({ entry, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(entry.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-bg-card border border-border-default rounded-2xl overflow-hidden hover:border-accent/20 transition-all">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-bg-card-hover transition-all"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {entry.companyName && (
              <span className="flex items-center gap-1 text-accent text-sm font-medium">
                <Building2 size={14} />
                {entry.companyName}
              </span>
            )}
            <span className="text-xs text-text-muted">{date}</span>
          </div>
          <p className="flex items-center gap-1.5 text-text-primary font-medium">
            <HelpCircle size={14} className="text-text-muted shrink-0" />
            {entry.question}
          </p>
          {!expanded && (
            <p className="text-sm text-text-secondary mt-1 truncate">
              {entry.generatedAnswer.slice(0, 150)}...
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
            className="p-2 hover:bg-bg-secondary rounded-lg text-text-muted hover:text-danger transition-all cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
          {expanded ? (
            <ChevronDown size={18} className="text-text-muted" />
          ) : (
            <ChevronRight size={18} className="text-text-muted" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border-default">
          {/* Generated Answer */}
          <div className="pt-4">
            <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              Generated Answer
            </h4>
            <p className="text-sm text-text-primary whitespace-pre-wrap bg-bg-secondary p-4 rounded-xl leading-relaxed">
              {entry.generatedAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
