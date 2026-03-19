export function getDefaultFormValues({ sectionKey, entries, formConfig }) {
  // 1. If we have entries from the database, map them to the form shape
  if (entries && entries.length > 0) {
    if (sectionKey === "summary") {
      return {
        [sectionKey]: entries[0]?.description || entries[0]?.title || "",
      };
    }
    return {
      // eslint-disable-next-line no-unused-vars
      [sectionKey]: entries.map(({ id, section, createdAt, ...rest }) => rest),
    };
  }

  // 2. If no entries exist, parse formConfig to produce an empty scaffold structure
  const configNode = formConfig?.[0];
  if (!configNode) return {};

  if (configNode.type === "fieldArray" && configNode.controls) {
    const emptyItem = {};
    configNode.controls.forEach((control) => {
      emptyItem[control.name] = "";
    });
    return { [configNode.name]: [emptyItem] };
  }

  // Standard flat input (e.g., summary string)
  return { [configNode.name]: "" };
}
