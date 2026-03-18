import React from "react";
import InputController from "./Controller/InputController";
import TextareaController from "./Controller/TextareaController";
import MonthYearController from "./Controller/MonthYearController";
import CheckboxController from "./Controller/CheckboxController";

export function DynamicField({ type, ...props }) {
  switch (type) {
    case "textarea":
      return <TextareaController {...props} />;
    case "monthyear":
      return <MonthYearController {...props} />;
    case "checkbox":
      return <CheckboxController {...props} />;
    case "text":
    default:
      return <InputController {...props} />;
  }
}
