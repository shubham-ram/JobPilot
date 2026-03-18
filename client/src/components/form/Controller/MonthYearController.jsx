import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { MonthYearPicker } from "@/pages/ProfilePage/MonthYearPicker";

function MonthYearController(props, ref) {
  const {
    name = "",
    control = {},
    defaultValue = "",
    rules = {},
    errors = {},
    label,
    disabled,
    placeholder,
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
          {label && (
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {label}
            </label>
          )}
          <MonthYearPicker
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            {...rest}
          />
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

export default forwardRef(MonthYearController);
