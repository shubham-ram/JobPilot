import { useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "../../../ui/button";
import Child from "./child";
import { cn } from "../../../../lib/utils";

function FieldArrayController(props) {
  const { name, control, addButtonLabel, addButtonClassName, ...rest } = props;

  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <Child
            {...rest}
            key={field.id}
            field={field}
            index={index}
            control={control}
            remove={remove}
          />
        );
      })}

      <Button
        type="button"
        variant="outline"
        className={cn("mt-2", addButtonClassName)}
        onClick={() => {
          append({});
        }}
      >
        <Plus className="w-5 h-5 mr-2" />
        {addButtonLabel || "Add"}
      </Button>
    </div>
  );
}

export default FieldArrayController;
