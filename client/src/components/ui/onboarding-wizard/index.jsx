import { useState, useEffect } from "react";
import { profileDb } from "@/lib/db";
import { useForm } from "react-hook-form";
import {
  summaryConfig,
  experienceConfig,
} from "@/pages/ProfilePage/config/formConfig";
import { getDefaultFormValues } from "@/utils/getDefaultFormValues";
import { cn } from "@/lib/utils";

import { OnboardingHeader } from "./OnboardingHeader";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { OnboardingFooter } from "./OnboardingFooter";

export default function OnboardingWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...getDefaultFormValues({
        sectionKey: "summary",
        formConfig: summaryConfig,
      }),
      ...getDefaultFormValues({
        sectionKey: "experience",
        formConfig: experienceConfig,
      }),
    },
  });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const profiles = await profileDb.getAll();
        if (profiles.length === 0) {
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Failed to check profile for onboarding", err);
      } finally {
        setLoading(false);
      }
    };
    checkProfile();
  }, []);

  if (loading || !isOpen) return null;

  const handleNext = () => setStep(2);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (data.summary) {
        await profileDb.create({
          section: "summary",
          title: "Professional Summary",
          description: data.summary,
        });
      }

      if (data.experience && data.experience.length > 0) {
        for (const exp of data.experience) {
          if (exp.title) {
            await profileDb.create({
              ...exp,
              section: "experience",
            });
          }
        }
      }

      setIsOpen(false);
    } catch (err) {
      console.error("Failed to save onboarding data", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-bg-primary/95 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "w-full max-w-2xl bg-bg-card border border-border-default shadow-2xl",
          "rounded-2xl flex flex-col max-h-[90vh]",
        )}
      >
        <OnboardingHeader step={step} />

        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <form
            id="onboarding-form"
            onSubmit={handleSubmit(step === 1 ? handleNext : onSubmit)}
          >
            {step === 1 && <Step1 control={control} errors={errors} />}
            {step === 2 && <Step2 control={control} errors={errors} />}
          </form>
        </div>

        <OnboardingFooter
          step={step}
          setStep={setStep}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
