import { useState, useEffect } from "react";
import { profileDb } from "@/lib/db";

const WEIGHTS = {
  summary: 20,
  experience: 30,
  education: 20,
  project: 15,
  skills: 15,
};

export const useProfileCompleteness = () => {
  const [completeness, setCompleteness] = useState({
    percent: 0,
    missingSections: [],
    isCriticallyEmpty: true,
    loading: true,
  });

  useEffect(() => {
    const calculateCompleteness = async () => {
      try {
        const profiles = await profileDb.getAll();
        
        let totalPercent = 0;
        const missing = [];
        let hasSummary = false;
        let hasExperience = false;

        // Group counts by section
        const sectionCounts = profiles.reduce((acc, curr) => {
          acc[curr.section] = (acc[curr.section] || 0) + 1;
          return acc;
        }, {});

        for (const [section, weight] of Object.entries(WEIGHTS)) {
          if (sectionCounts[section] && sectionCounts[section] > 0) {
            totalPercent += weight;
            if (section === "summary") hasSummary = true;
            if (section === "experience") hasExperience = true;
          } else {
            // Capitalize section strings cleanly for UI
            missing.push(section === 'project' ? 'Projects' : section.charAt(0).toUpperCase() + section.slice(1));
          }
        }

        setCompleteness({
          percent: totalPercent,
          missingSections: missing,
          isCriticallyEmpty: !hasSummary || !hasExperience,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to calculate profile completeness:", error);
        setCompleteness((prev) => ({ ...prev, loading: false }));
      }
    };

    calculateCompleteness();
  }, []);

  return completeness;
};
