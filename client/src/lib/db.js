import Dexie from "dexie";

const db = new Dexie("JobHelperDB");

db.version(1).stores({
  profiles: "++id, section, createdAt",
  history: "++id, companyName, createdAt",
});

// ─── Profile helpers ─────────────────────────────────────────

export const profileDb = {
  async getAll(section) {
    let query = db.table("profiles").orderBy("createdAt");
    if (section) {
      query = db
        .table("profiles")
        .where("section")
        .equals(section)
        .sortBy("createdAt");
      return query;
    }
    return query.toArray();
  },

  async create(data) {
    const id = await db.table("profiles").add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return db.table("profiles").get(id);
  },

  async update(id, data) {
    await db.table("profiles").update(id, data);
    return db.table("profiles").get(id);
  },

  async delete(id) {
    return db.table("profiles").delete(id);
  },
};

// ─── History helpers ─────────────────────────────────────────

export const historyDb = {
  async getAll() {
    return db.table("history").reverse().sortBy("createdAt");
  },

  async create(data) {
    const id = await db.table("history").add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return db.table("history").get(id);
  },

  async delete(id) {
    return db.table("history").delete(id);
  },
};

// ─── Build profile context string for Gemini ─────────────────

export async function buildProfileContext() {
  const profiles = await db.table("profiles").toArray();

  if (profiles.length === 0) {
    return "No profile data available yet. Provide a general answer based on the job description.";
  }

  const sections = {};
  const sectionOrder = [
    "summary",
    "experience",
    "education",
    "project",
    "skill",
  ];

  for (const entry of profiles) {
    if (!sections[entry.section]) sections[entry.section] = [];

    let text = `- ${entry.title}`;
    if (entry.organization) text += ` at ${entry.organization}`;
    if (entry.startDate) {
      text += ` (${entry.startDate}`;
      text += entry.endDate ? ` – ${entry.endDate})` : " – Present)";
    }
    if (entry.description) text += `\n  ${entry.description}`;
    if (entry.metadata) {
      if (entry.metadata.technologies)
        text += `\n  Technologies: ${entry.metadata.technologies.join(", ")}`;
      if (entry.metadata.gpa) text += `\n  GPA: ${entry.metadata.gpa}`;
      if (entry.metadata.link) text += `\n  Link: ${entry.metadata.link}`;
    }

    sections[entry.section].push(text);
  }

  let context = "";
  for (const section of sectionOrder) {
    if (sections[section]) {
      const label = section.charAt(0).toUpperCase() + section.slice(1);
      context += `\n### ${label}\n${sections[section].join("\n")}\n`;
    }
  }

  return context;
}

export default db;
