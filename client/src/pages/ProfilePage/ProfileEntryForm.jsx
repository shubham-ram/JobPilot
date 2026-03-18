import { Save, X } from "lucide-react";
import { useProfileEntryForm } from "@/hooks/useProfileEntryForm";
import { getProfileEntryFormConfig } from "@/config/getProfileEntryFormConfig";
import { DynamicField } from "@/components/form/DynamicField";

export function ProfileEntryForm({ section, entry, onSave, onCancel }) {
  const { control, handleSubmit, errors, currentlyWorking } =
    useProfileEntryForm({ entry });

  const config = getProfileEntryFormConfig({ section, currentlyWorking });

  const submitHandler = async (data) => {
    // Pre-process data
    let technologies = [];
    if (data.technologiesStr) {
      technologies = data.technologiesStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const payload = {
      section,
      title: data.title,
      organization: data.organization || undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
      description: data.description || undefined,
      metadata: {
        ...data.metadata,
        technologies: technologies.length > 0 ? technologies : undefined,
      },
    };

    if (entry?.id) {
      payload.id = entry.id; // ensure ID is passed back if it's an edit
    } // Actually ProfilePage handles ID if editing, wait, the onSave(data) receives the payload. In ProfilePage logic it uses `editingEntry.id` so sending ID isn't strictly necessary here, but we can pass it if we want. Wait, the old payload passed `id` indirectly. Let's look at `index.jsx` in ProfilePage: `if (editingEntry) await profileDb.update(editingEntry.id, data); else await profileDb.create(data);`. So `id` is not needed.

    await onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="p-5 bg-bg-secondary rounded-2xl border border-border-default mb-4 shadow-sm"
    >
      {/* Grid Layout Layout using config span */}
      <div className="grid grid-cols-12 gap-x-4">
        {config.map((field) => (
          <div
            key={field.name}
            className={
              field.span === 6 ? "col-span-12 sm:col-span-6" : "col-span-12"
            }
          >
            <DynamicField control={control} errors={errors} {...field} />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border-default/50">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2 border border-border-default hover:bg-bg-card text-text-secondary text-sm font-medium rounded-xl transition-all cursor-pointer"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-md shadow-accent/20"
        >
          <Save size={16} />
          Save
        </button>
      </div>
    </form>
  );
}
