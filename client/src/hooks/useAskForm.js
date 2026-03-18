import { useForm } from "react-hook-form";

export function useAskForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      jobDescription: "",
      question: "",
    },
  });

  return {
    control,
    handleSubmit,
    errors,
  };
}
