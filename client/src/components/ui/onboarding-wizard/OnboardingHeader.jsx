import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const OnboardingHeader = ({ step }) => (
  <div className="p-8 pb-6 border-b border-border-default flex items-center justify-between shrink-0">
    <div>
      <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
        <Sparkles className="text-accent" />
        Welcome to JobHelper!
      </h2>
      <p className="text-text-secondary mt-1">
        Let's build your baseline profile so we can generate tailored answers for you.
      </p>
    </div>
    <div className="flex gap-2">
      <div className={cn("w-8 h-2 rounded-full", step >= 1 ? "bg-accent" : "bg-bg-input")} />
      <div className={cn("w-8 h-2 rounded-full", step >= 2 ? "bg-accent" : "bg-bg-input")} />
    </div>
  </div>
);
