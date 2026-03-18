import { Loader2, Sparkles } from "lucide-react";
import { useAskForm } from "@/hooks/useAskForm";
import { getAskFormConfig } from "@/config/getAskFormConfig";
import { DynamicField } from "@/components/form/DynamicField";

export function AskForm({ onSubmit, loading, error }) {
  const { control, handleSubmit, errors } = useAskForm();
  const config = getAskFormConfig();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Generate Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/20 hover:shadow-accent/40"
      >
        {loading ? (
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
