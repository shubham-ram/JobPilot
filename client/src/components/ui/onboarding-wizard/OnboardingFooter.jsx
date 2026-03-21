import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const OnboardingFooter = ({ step, setStep, submitting }) => (
  <div className="p-6 bg-bg-secondary border-t border-border-default flex items-center space-x-4 shrink-0">
    {step === 2 && (
      <button
        type="button"
        onClick={() => setStep(1)}
        className={cn(
          "px-6 py-3 rounded-xl border border-border-default bg-bg-card hover:bg-bg-input",
          "text-text-secondary font-medium transition-all cursor-pointer"
        )}
      >
        Back
      </button>
    )}
    <button
      type="submit"
      form="onboarding-form"
      disabled={submitting}
      className={cn(
        "flex-1 px-6 py-3 rounded-xl font-semibold transition-all",
        "bg-accent hover:bg-accent-hover text-white",
        "flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
      )}
    >
      {step === 1 ? (
        <>
          Continue
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      ) : (
        <>
          {submitting ? "Saving..." : "Finish Setup"}
          {!submitting && (
            <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </>
      )}
    </button>
  </div>
);
