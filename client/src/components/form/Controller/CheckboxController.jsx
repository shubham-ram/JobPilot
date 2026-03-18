import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

function CheckboxController(props, ref) {
  const {
    name = "",
    control = {},
    defaultValue = false,
    rules = {},
    errors = {},
    label,
    ...rest
  } = props || {};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div className="mb-4">
          <label className="flex items-center gap-2.5 cursor-pointer w-fit">
            <input
              ref={ref}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 rounded border-border-default bg-bg-input accent-accent cursor-pointer"
              {...rest}
            />
            {label && (
              <span className="text-sm text-text-secondary">{label}</span>
            )}
          </label>
          {errors[name] && (
            <span className="text-danger text-xs mt-1 block">
              {errors[name].message}
            </span>
          )}
        </div>
      )}
    />
  );
}

export default forwardRef(CheckboxController);
