import { Copy, Check, RefreshCw } from "lucide-react";
import { BackgroundGradient } from "@/components/aceternity/BackgroundGradient";
import { TextGenerateEffect } from "@/components/aceternity/TextGenerateEffect";
import { cn } from "@/lib/utils";

export function AnswerCard({
  answer,
  loading,
  maxChars,
  setMaxChars,
  isOverLimit,
  copied,
  onCopy,
  onRegenerate,
}) {
  return (
    <BackgroundGradient containerClassName="mt-8">
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Generated Answer
          </h2>
          <button
            onClick={onCopy}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all cursor-pointer",
              "text-text-secondary hover:text-accent bg-bg-secondary"
            )}
          >
            {copied ? (
              <>
                <Check size={14} className="text-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Answer Text */}
        <TextGenerateEffect
          words={answer}
          className="text-text-secondary leading-relaxed whitespace-pre-wrap"
        />

        {/* Footer — Character count + Limit + Regenerate */}
        <div className="mt-5 pt-4 border-t border-border-default/50">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Character count */}
            <span
              className={`text-sm font-medium ${isOverLimit ? "text-danger" : "text-text-muted"}`}
            >
              {answer.length.toLocaleString()} characters
              {maxChars
                ? ` / ${parseInt(maxChars, 10).toLocaleString()} limit`
                : ""}
            </span>

            {/* Limit input + Regenerate */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Limit:</span>
              <input
                type="number"
                value={maxChars}
                onChange={(e) => setMaxChars(e.target.value)}
                placeholder="e.g. 500"
                min="50"
                className={cn(
                  "w-24 px-2.5 py-1.5 bg-bg-input border border-border-default rounded-lg",
                  "text-text-primary placeholder-text-muted text-sm transition-all focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
              />
              <button
                onClick={() => onRegenerate(maxChars)}
                disabled={loading || !maxChars}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-all cursor-pointer",
                  "text-text-secondary hover:text-accent bg-bg-secondary hover:bg-bg-card-hover",
                  "disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                <RefreshCw size={13} />
                Regenerate to fit
              </button>
            </div>
          </div>
          {isOverLimit && (
            <p className="text-xs text-danger mt-2">
              Answer exceeds the limit by{" "}
              {(answer.length - parseInt(maxChars, 10)).toLocaleString()}{" "}
              characters. Click "Regenerate to fit" to shorten.
            </p>
          )}
        </div>
      </div>
    </BackgroundGradient>
  );
}
