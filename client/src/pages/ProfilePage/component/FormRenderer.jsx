import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getElement } from "../../../components/form/getElement";
import { SectionDisplay } from "./SectionDisplay";
import { Pencil } from "lucide-react";
import { getDefaultFormValues } from "../../../utils/getDefaultFormValues";

function FormRenderer({ sectionKey, entries, formConfig, handleSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const initialFormValues = getDefaultFormValues({
    sectionKey,
    entries,
    formConfig,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmit = async (data) => {
    console.log("data >>", data);
    await handleSave(sectionKey, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(initialFormValues);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="relative group w-full pt-1 pb-2">
        <SectionDisplay
          sectionKey={sectionKey}
          data={entries}
          onEdit={() => setIsEditing(true)}
        />

        {/* Subtle hover edit button for the section (only show if populated) */}
        {entries && entries.length > 0 && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={cn(
              "absolute -top-3 right-0 p-2 text-text-muted hover:text-accent bg-bg-card hover:bg-bg-input rounded-lg",
              "border border-transparent shadow-sm hover:border-border-default transition-all",
              "opacity-0 group-hover:opacity-100 flex items-center gap-2 cursor-pointer z-10"
            )}
          >
            <Pencil size={15} />
            <span className="text-xs font-semibold">Edit</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-in fade-in zoom-in-95 duration-200"
    >
      {formConfig.map((config) => {
        const { name, type } = config || {};
        const Element = getElement(type);
        return (
          <Element key={name} control={control} {...config} errors={errors} />
        );
      })}

      <div className="flex justify-end gap-3 pt-4 border-t border-border-default/50 mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            "px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary",
            "bg-bg-card hover:bg-bg-card-hover border border-border-default rounded-lg transition-colors cursor-pointer"
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={cn(
            "px-5 py-2 text-sm font-medium bg-accent text-white rounded-lg",
            "hover:bg-accent-hover transition-colors shadow-md shadow-accent/20 cursor-pointer"
          )}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default FormRenderer;
