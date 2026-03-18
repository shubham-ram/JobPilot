import {
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Wrench,
} from "lucide-react";
import {
  educationConfig,
  experienceConfig,
  skillsConfig,
  projectsConfig,
  summaryConfig,
} from "./config/formConfig";

export const SECTIONS = [
  {
    key: "summary",
    label: "Summary",
    icon: User,
    description: "A brief personal summary or bio",
    formConfig: summaryConfig,
  },
  {
    key: "experience",
    label: "Experience",
    icon: Briefcase,
    description: "Your employment history",
    formConfig: experienceConfig,
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
    description: "Your educational background",
    formConfig: educationConfig,
  },
  {
    key: "project",
    label: "Projects",
    icon: FolderOpen,
    description: "Personal or professional projects",
    formConfig: projectsConfig,
  },
  {
    key: "skill",
    label: "Skills",
    icon: Wrench,
    description: "Technical and soft skills",
    formConfig: skillsConfig,
  },
];

export const EMPTY_FORM = {
  title: "",
  organization: "",
  startDate: "",
  endDate: "",
  description: "",
  metadata: {},
};
