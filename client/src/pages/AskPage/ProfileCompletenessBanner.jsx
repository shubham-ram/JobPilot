import { Info, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ProfileCompletenessBanner = ({ completeness }) => {
  const [dismissed, setDismissed] = useState(false);
  const { percent, missingSections, isCriticallyEmpty, loading } = completeness;

  if (loading || percent === 100 || isCriticallyEmpty || dismissed) {
    return null;
  }

  const missingText =
    missingSections.length > 2
      ? `${missingSections.slice(0, -1).join(", ")}, and ${missingSections[missingSections.length - 1]}`
      : missingSections.join(" and ");

  return (
    <div className="relative mb-8 bg-gradient-to-r from-accent/10 to-bg-card border border-accent/20 rounded-2xl p-5 shadow-sm overflow-hidden group animate-in fade-in slide-in-from-top-4 duration-500">
      <div
        className="absolute top-0 left-0 h-1 bg-accent transition-all duration-1000 ease-out"
        style={{ width: `${percent}%` }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="p-2 bg-accent/10 rounded-full flex-shrink-0">
            <Info className="text-accent w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">
              Profile Completeness: {percent}%
            </h3>
            <p className="text-xs text-text-secondary mt-1 max-w-2xl leading-relaxed">
              Adding your <strong>{missingText}</strong> will dramatically
              improve the AI's ability to generate tailored, personalized
              answers.
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center justify-end gap-3 self-end md:self-auto">
          <Link
            to="/profile"
            className="flex items-center gap-1.5 text-xs font-semibold bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors shadow-sm shadow-accent/20"
          >
            Complete Profile
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-input rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
