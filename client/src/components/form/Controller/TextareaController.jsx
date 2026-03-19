import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

function TextareaController(props, ref) {
  const {
    name = "",
    control = {},
    defaultValue = "",
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
      render={({ field: { onChange, onBlur, value } }) => (
        <div className="mb-4">
          {label && (
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {label}
            </label>
          )}
          <textarea
            ref={ref}
            error={errors?.[name] || errors?.message}
            onChange={onChange}
            value={value || ""}
            onBlur={onBlur}
            className="w-full px-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-y text-sm"
            {...rest}
          />
          {(errors?.[name] || errors?.message) && (
            <span className="text-danger text-xs mt-1 block">
              {errors[name]?.message || errors?.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

export default forwardRef(TextareaController);
