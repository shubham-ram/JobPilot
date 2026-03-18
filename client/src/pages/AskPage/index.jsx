import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateApi } from "@/lib/api";
import { buildProfileContext, historyDb } from "@/lib/db";
import { SparklesText } from "@/components/aceternity/SparklesText";
import { AskForm } from "./AskForm";
import { AnswerCard } from "./AnswerCard";

export default function AskPage() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [maxChars, setMaxChars] = useState("");

  // Store the last used inputs so we can regenerate with a new character limit
  const [lastInputs, setLastInputs] = useState(null);

  const handleGenerate = async (data, charLimit) => {
    if (!data.jobDescription?.trim() || !data.question?.trim()) {
      setError("Please provide both a job description and a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    setLastInputs(data); // Save the form inputs for regeneration

    try {
      const profileContext = await buildProfileContext();
      const effectiveLimit = charLimit ? parseInt(charLimit, 10) : undefined;

      const result = await generateApi.generate({
        profileContext,
        jobDescription: data.jobDescription,
        question: data.question,
        companyName: data.companyName || undefined,
        maxChars: effectiveLimit,
      });
      setAnswer(result.answer);

      // Save to local history
      await historyDb.create({
        companyName: data.companyName || "Unknown",
        question: data.question,
        generatedAnswer: result.answer,
      });
    } catch (err) {
      setError(err.message || "Failed to generate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOverLimit =
    maxChars && answer && answer.length > parseInt(maxChars, 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <Sparkles className="text-accent" size={28} />
          <SparklesText>Generate Answer</SparklesText>
        </h1>
        <p className="text-text-secondary mt-2">
          Paste the job description and question — get a tailored answer based
          on your profile.
        </p>
      </div>

      {/* Extracted Form */}
      <AskForm
        onSubmit={(data) => handleGenerate(data)}
        loading={loading}
        error={error}
      />

      {/* Output Section */}
      {answer && (
        <AnswerCard
          answer={answer}
          loading={loading}
          maxChars={maxChars}
          setMaxChars={setMaxChars}
          isOverLimit={isOverLimit}
          copied={copied}
          onCopy={handleCopy}
          onRegenerate={(limit) => handleGenerate(lastInputs, limit)}
        />
      )}

      {/* Loading Animation */}
      {loading && !answer && (
        <div className="flex items-center justify-center py-12">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-accent rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
