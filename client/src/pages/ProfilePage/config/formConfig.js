export const summaryConfig = [
  {
    name: "summary",
    type: "textarea",
    label: "Professional Summary",
    placeholder:
      "Write a brief professional summary about yourself — your background, strengths, and career goals...",
    rows: 6,
    rules: { required: "This field is required" },
  },
];

export const experienceConfig = [
  {
    name: "experience",
    type: "fieldArray",
    addButtonLabel: "Add Experience",
    addButtonClassName:
      "w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer",
    controls: [
      {
        name: "title",
        type: "text",
        label: "Title / Position",
        placeholder: "Software Engineer",
        rules: { required: "This field is required" },
      },
      {
        name: "organization",
        type: "text",
        label: "Organization",
        placeholder: "Google",
      },
      {
        name: "startDate",
        type: "monthyear",
        label: "Start Date",
        span: 6,
      },
      {
        name: "endDate",
        type: "monthyear",
        label: "End Date",
        // disabled: currentlyWorking,
        // placeholder: currentlyWorking ? "Present" : "Select date",
        placeholder: "Select data",
        span: 6,
      },
      {
        name: "currentlyWorking",
        type: "checkbox",
        label: "Currently working here",
        span: 12,
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder:
          "Describe your responsibilities, achievements, or details...",
        rows: 4,
        rules: { required: "This field is required" },
      },
    ],
  },
];

export const educationConfig = [
  {
    name: "education",
    type: "fieldArray",
    addButtonLabel: "Add Education",
    addButtonClassName:
      "w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer",

    controls: [
      {
        name: "degree",
        type: "text",
        label: "Degree / Program",
        placeholder: "B.Tech in Computer Science",
        rules: { required: "This field is required" },
      },
      {
        name: "organization",
        type: "text",
        label: "Institution",
        placeholder: "MIT",
      },
      {
        name: "startDate",
        type: "monthyear",
        label: "Start Date",
        span: 6,
      },
      {
        name: "endDate",
        type: "monthyear",
        label: "End Date",
        // disabled: currentlyWorking,
        // placeholder: currentlyWorking ? "Present" : "Select date",
        placeholder: "Select data",
        span: 6,
      },
      {
        name: "currentlyWorking",
        type: "checkbox",
        label: "Currently studying here",
        span: 12,
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder:
          "Describe your responsibilities, achievements, or details...",
        rows: 3,
      },
      {
        name: "metadata.gpa",
        type: "text",
        label: "GPA",
        placeholder: "3.8/4.0",
      },
    ],
  },
];

export const projectsConfig = [
  {
    name: "project",
    type: "fieldArray",
    addButtonLabel: "Add Project",
    addButtonClassName:
      "w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer",
    controls: [
      {
        name: "projectName",
        type: "text",
        label: "Project Name",
        placeholder: "Project Name",
        rules: { required: "This field is required" },
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder:
          "Describe your responsibilities, achievements, or details...",
        rows: 3,
      },
      {
        name: "technology",
        type: "text",
        label: "Technologies (comma-separated)",
        placeholder: "React, Node.js, PostgreSQL",
        rules: { required: "This field is required" },
      },
    ],
  },
];

export const skillsConfig = [
  {
    name: "skills",
    type: "fieldArray",
    addButtonLabel: "Add Skill",
    addButtonClassName:
      "w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border-default hover:border-accent/40 rounded-xl text-text-muted hover:text-accent text-sm transition-all cursor-pointer",

    controls: [
      {
        name: "skill",
        type: "text",
        // label: "Skill",
        placeholder: "React.js",
        rules: { required: "This field is required" },
      },
    ],
  },
];
