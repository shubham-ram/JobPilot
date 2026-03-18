import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { EMPTY_FORM } from "@/pages/ProfilePage/constants";

export function useProfileEntryForm({ entry }) {
  const initialTechs = entry?.metadata?.technologies?.join(", ") || "";
  // If we have an existing entry, determine if the checkbox should be true
  const isWorking = entry && (entry.endDate === "Present" || !entry.endDate);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...EMPTY_FORM,
      ...entry,
      technologiesStr: initialTechs,
      currentlyWorking: !!isWorking,
    },
  });

  const currentlyWorking = useWatch({ control, name: "currentlyWorking" });

  // When currentlyWorking changes, update endDate automatically
  useEffect(() => {
    if (currentlyWorking) {
      setValue("endDate", "Present");
    } else {
      setValue(
        "endDate",
        entry?.endDate && entry?.endDate !== "Present" ? entry?.endDate : "",
      );
    }
  }, [currentlyWorking, setValue, entry]);

  return {
    control,
    handleSubmit,
    errors,
    currentlyWorking,
  };
}
