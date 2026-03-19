import { getElement } from "../../getElement";
import { Trash } from "lucide-react";

function Child(props) {
  const { controls, control, index, parentName, remove, errors } = props;

  return (
    <div className="relative px-6 py-4 mb-4 rounded-xl border border-border-default bg-bg-card hover:bg-bg-card-hover transition-colors group">
      <div className="flex justify-end -mt-2 -mr-3 mb-1">
        <button
          type="button"
          onClick={() => remove(index)}
          className="p-1.5 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all cursor-pointer"
          aria-label="Delete item"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {controls.map((controlItem) => {
          const { name, type, span = 12, ...rest } = controlItem;
          const Element = getElement(type);

          return (
            <div
              key={`${parentName}.${index}.${name}`}
              className={`col-span-${span}`}
              style={{ gridColumn: `span ${span} / span ${span}` }}
            >
              <Element
                {...rest}
                key={`${parentName}.${index}.${name}`}
                name={`${parentName}.${index}.${name}`}
                control={control}
                errors={errors?.[parentName]?.[index]?.[name]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Child;
