export const getProfileEntryFormConfig = ({ section, currentlyWorking }) => {
  const controls = [];

  // Title Field
  let titleLabel = "Title / Position";
  let titlePlaceholder = "";
  if (section === "skill") {
    titleLabel = "Skill";
    titlePlaceholder = "React.js";
  } else if (section === "summary") {
    titleLabel = "Summary Title";
    titlePlaceholder = "Professional Summary";
  } else if (section === "education") {
    titleLabel = "Degree / Program";
    titlePlaceholder = "B.Tech in Computer Science";
  } else if (section === "project") {
    titleLabel = "Project Name";
    titlePlaceholder = "E-commerce Platform";
  } else if (section === "experience") {
    titlePlaceholder = "Software Engineer";
  }

  controls.push({
    name: "title",
    type: "text",
    label: titleLabel,
    placeholder: titlePlaceholder,
    rules: { required: "This field is required" },
  });

  // Organization Field
  if (!["skill", "summary", "project"].includes(section)) {
    controls.push({
      name: "organization",
      type: "text",
      label: section === "education" ? "Institution" : "Organization",
      placeholder: section === "education" ? "MIT" : "Google",
    });
  }

  // Dates Fields
  if (["experience", "education"].includes(section)) {
    controls.push({
      name: "startDate",
      type: "monthyear",
      label: "Start Date",
      span: 6, // Represents column layout config
    });
    controls.push({
      name: "endDate",
      type: "monthyear",
      label: "End Date",
      disabled: currentlyWorking,
      placeholder: currentlyWorking ? "Present" : "Select date",
      span: 6,
    });
    controls.push({
      name: "currentlyWorking",
      type: "checkbox",
      label:
        section === "education"
          ? "Currently studying here"
          : "Currently working here",
      span: 12,
    });
  }

  // Description Field
  if (section !== "skill") {
    controls.push({
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder:
        "Describe your responsibilities, achievements, or details...",
      rows: 3,
    });
  }

  // Technologies Field
  if (section === "project") {
    controls.push({
      name: "technologiesStr",
      type: "text",
      label: "Technologies (comma-separated)",
      placeholder: "React, Node.js, PostgreSQL",
    });
  }

  // GPA Field
  if (section === "education") {
    controls.push({
      name: "metadata.gpa",
      type: "text",
      label: "GPA",
      placeholder: "3.8/4.0",
    });
  }

  return controls;
};

// const summaryConfig = [
//   {
//     name: "summary",
//     type: "textarea",
//     label: "Professional Summary",
//     placeholder:
//       "Write a brief professional summary about yourself — your background, strengths, and career goals...",
//     rules: { required: "This field is required" },
//   },
// ];

// const experienceConfig = [{}];
