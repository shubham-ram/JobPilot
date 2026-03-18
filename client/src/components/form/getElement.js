import InputController from "./Controller/InputController";
import TextareaController from "./Controller/TextareaController";
import MonthYearController from "./Controller/MonthYearController";
import CheckboxController from "./Controller/CheckboxController";
import FieldArrayController from "./Controller/FieldArrayController";

export function getElement(type) {
  switch (type) {
    case "textarea":
      return TextareaController;
    case "monthyear":
      return MonthYearController;
    case "checkbox":
      return CheckboxController;
    case "fieldArray":
      return FieldArrayController;
    case "text":
    default:
      return InputController;
  }
}
