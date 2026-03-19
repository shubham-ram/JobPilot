import { useState, useEffect } from "react";
import {
  User,
  Plus,
  Pencil,
  Save,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { profileDb } from "@/lib/db";
import { SECTIONS } from "./constants";
import FormRenderer from "./component/FormRenderer";

export default function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState(
    new Set(["summary"]),
  );

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await profileDb.getAll();
      setProfiles(data);
    } catch (err) {
      console.error("Failed to load profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (key) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSaveSection = async (sectionKey, formData) => {
    try {
      const dataArray = formData[sectionKey];
      // Delete existing entries for this section to cleanly replace them
      const existingEntries = getEntriesForSection(sectionKey);
      for (const entry of existingEntries) {
        await profileDb.delete(entry.id);
      }

      // If it's a string (like summary), save it as a single entry
      if (typeof dataArray === "string") {
        await profileDb.create({
          section: sectionKey,
          description: dataArray,
          title: "Professional Summary",
        });
      }
      // If it's an array (like experience, education, etc), save each item
      else if (Array.isArray(dataArray)) {
        for (const item of dataArray) {
          await profileDb.create({ ...item, section: sectionKey });
        }
      }

      await loadProfiles();
    } catch (err) {
      console.error("Failed to save section:", err);
    }
  };

  const getEntriesForSection = (sectionKey) =>
    profiles.filter((p) => p.section === sectionKey);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <User className="text-accent" size={28} />
          Your Profile
        </h1>
        <p className="text-text-secondary mt-2">
          Add your professional details — the more detailed, the better the
          generated answers.
        </p>
      </div>
      {/* Sections */}

      <div className="space-y-3">
        {SECTIONS.map(({ key, label, icon: Icon, description, formConfig }) => {
          const entries = getEntriesForSection(key);
          const isExpanded = expandedSections.has(key);

          return (
            <div
              key={key}
              className="bg-bg-card border border-border-default rounded-2xl overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex items-center justify-between p-5 hover:bg-bg-card-hover transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-soft rounded-lg">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-text-primary">{label}</h3>
                    <p className="text-xs text-text-muted">{description}</p>
                  </div>
                  {entries.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-accent-soft text-accent text-xs rounded-full font-medium">
                      {entries.length}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronDown size={18} className="text-text-muted" />
                ) : (
                  <ChevronRight size={18} className="text-text-muted" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-3">
                  <FormRenderer
                    sectionKey={key}
                    formConfig={formConfig}
                    handleSave={handleSaveSection}
                    entries={entries}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
