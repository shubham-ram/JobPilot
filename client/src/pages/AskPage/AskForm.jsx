import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";
import { useAskForm } from "@/hooks/useAskForm";
import { getAskFormConfig } from "@/config/getAskFormConfig";
import { DynamicField } from "@/components/form/DynamicField";

export function AskForm({ onSubmit, loading, error, completeness }) {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);
  const { control, handleSubmit, errors } = useAskForm();
  const config = getAskFormConfig();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, captchaToken }))} className="space-y-6">
      {config.map((field) => (
        <DynamicField
          key={field.name}
          control={control}
          errors={errors}
          {...field}
        />
      ))}

      {/* Error */}
      {error && (
        <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
          {error}
        </div>
      )}

      {/* Turnstile Widget */}
      {!completeness?.isCriticallyEmpty && (
        <div className="flex justify-center my-4">
          <Turnstile 
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} 
            onSuccess={(token) => setCaptchaToken(token)}
          />
        </div>
      )}

      {/* Generate Button */}
      <button
        type={completeness?.isCriticallyEmpty ? "button" : "submit"}
        disabled={loading || completeness?.loading || (!captchaToken && !completeness?.isCriticallyEmpty)}
        onClick={(e) => {
          if (completeness?.isCriticallyEmpty) {
            e.preventDefault();
            navigate("/profile");
          }
        }}
        className={cn(
          "w-full py-3.5 px-6 font-semibold rounded-xl transition-all duration-200 text-white cursor-pointer",
          "flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-accent/40",
          completeness?.loading && "bg-bg-input text-text-muted cursor-wait",
          completeness?.isCriticallyEmpty && !completeness?.loading && "bg-danger hover:bg-danger-hover shadow-danger/20 hover:shadow-danger/40",
          !completeness?.isCriticallyEmpty && !completeness?.loading && "bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {completeness?.isCriticallyEmpty ? (
          "Update Profile to Generate"
        ) : loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate Answer
          </>
        )}
      </button>
    </form>
  );
}
