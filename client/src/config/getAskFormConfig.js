export const getAskFormConfig = () => {
  return [
    {
      name: "companyName",
      type: "text",
      label: "Company Name (optional)",
      placeholder: "e.g., Google, Microsoft, Stripe...",
    },
    {
      name: "jobDescription",
      type: "textarea",
      label: "Job Description",
      placeholder: "Paste the full job description here...",
      rows: 8,
      rules: { required: "Job description is required" },
    },
    {
      name: "question",
      type: "text",
      label: "Application Question",
      placeholder:
        'e.g., "Why do you want to join us?" or "Describe a challenging project"',
      rules: { required: "Application question is required" },
    },
  ];
};
