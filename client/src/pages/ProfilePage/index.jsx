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
import { ProfileEntry } from "./ProfileEntry";
import { ProfileEntryForm } from "./ProfileEntryForm";

import { projectsConfig } from "./config/formConfig";
import { getElement } from "../../components/form/getElement";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState(
    new Set(["experience"]),
  );
  const [addingSection, setAddingSection] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [summaryText, setSummaryText] = useState("");
  const [summaryDraft, setSummaryDraft] = useState("");
  const [summaryId, setSummaryId] = useState(null);
  const [editingSummary, setEditingSummary] = useState(false);
  const [savingSummary, setSavingSummary] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await profileDb.getAll();
      setProfiles(data);
      // Load existing summary
      const summaryEntry = data.find((p) => p.section === "summary");
      if (summaryEntry) {
        setSummaryText(summaryEntry.description || summaryEntry.title || "");
        setSummaryId(summaryEntry.id);
      }
    } catch (err) {
      console.error("Failed to load profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSummary = async () => {
    setSavingSummary(true);
    try {
      if (summaryId) {
        await profileDb.update(summaryId, {
          section: "summary",
          title: "Professional Summary",
          description: summaryDraft,
        });
      } else if (summaryDraft.trim()) {
        const entry = await profileDb.create({
          section: "summary",
          title: "Professional Summary",
          description: summaryDraft,
        });
        setSummaryId(entry.id);
      }
      setSummaryText(summaryDraft);
      await loadProfiles();
    } catch (err) {
      console.error("Failed to save summary:", err);
    } finally {
      setSavingSummary(false);
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

  const handleSave = async (data) => {
    try {
      if (editingEntry) {
        await profileDb.update(editingEntry.id, data);
      } else {
        await profileDb.create(data);
      }
      setAddingSection(null);
      setEditingEntry(null);
      await loadProfiles();
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await profileDb.delete(id);
      await loadProfiles();
    } catch (err) {
      console.error("Failed to delete:", err);
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
                  {formConfig.map((config) => {
                    const { name, type } = config || {};
                    const Element = getElement(type);
                    return (
                      <Element
                        key={name}
                        control={control}
                        {...config}
                        {...(errors?.[name] || {})}
                      />
                    );
                  })}
                  {/* {key === "summary" ? (
                    editingSummary ? (
                      <div className="space-y-4 p-4 bg-bg-secondary rounded-xl border border-border-default">
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">
                            Professional Summary
                          </label>
                          <textarea
                            value={summaryDraft}
                            onChange={(e) => setSummaryDraft(e.target.value)}
                            rows={4}
                            placeholder="Write a brief professional summary about yourself — your background, strengths, and career goals..."
                            className="w-full px-3 py-2.5 bg-bg-input border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm resize-y"
                            autoFocus
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={savingSummary}
                            onClick={async () => {
                              await handleSaveSummary();
                              setEditingSummary(false);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all cursor-pointer"
                          >
                            <Save size={14} />
                            {savingSummary ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSummaryDraft(summaryText);
                              setEditingSummary(false);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-bg-card hover:bg-bg-card-hover text-text-secondary text-sm font-medium rounded-lg transition-all cursor-pointer"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : summaryText ? (
                      <div className="group flex items-start justify-between p-4 bg-bg-secondary rounded-xl border border-border-default hover:border-accent/20 transition-all">
                        <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed flex-1">
                          {summaryText}
                        </p>
                        <button
                          onClick={() => {
                            setSummaryDraft(summaryText);
                            setEditingSummary(true);
                          }}
                          className="p-2 hover:bg-bg-card rounded-lg text-text-muted hover:text-accent transition-all cursor-pointer opacity-0 group-hover:opacity-100 ml-4"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSummaryDraft("");
                          setEditingSummary(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer"
                      >
                        <Plus size={16} />
                        Add Summary
                      </button>
                    )
                  ) : ( */}
                  <>
                    {/* Existing Entries */}
                    {/* {entries.map((entry) =>
                        editingEntry?.id === entry.id ? (
                          <ProfileEntryForm
                            key={entry.id}
                            section={key}
                            entry={entry}
                            onSave={handleSave}
                            onCancel={() => setEditingEntry(null)}
                          />
                        ) : (
                          <ProfileEntry
                            key={entry.id}
                            entry={entry}
                            section={key}
                            onEdit={setEditingEntry}
                            onDelete={handleDelete}
                          />
                        ),
                      )} */}

                    {/* Add Form */}
                    {/* {addingSection === key ? (
                        <ProfileEntryForm
                          section={key}
                          onSave={handleSave}
                          onCancel={() => setAddingSection(null)}
                        />
                      ) : (
                        <button
                          onClick={() => {
                            setAddingSection(key);
                            setEditingEntry(null);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer"
                        >
                          <Plus size={16} />
                          Add {label.replace(/s$/, "")}
                        </button>
                      )} */}
                  </>
                  {/* )} */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        {projectsConfig.map((config) => {
          const { name, type } = config || {};
          const Element = getElement(type);
          return (
            <Element
              key={name}
              control={control}
              {...config}
              {...(errors?.[name] || {})}
            />
          );
        })}
      </div>
    </div>
  );
}
