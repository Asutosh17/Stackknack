import React from "react";

export default function Input(props) {
  const {
    title,
    placeholder,
    type,
    name,
    id,
    onChange,
    disabled,
    required,
    value,
    errormsg,
    isError,
    onBlur
  } = props;
  return (
    <div>
      <div
        className={`relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 ${
          disabled ? "opacity-50" : "opacity-100"
        } bg-white `}
      >
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-900 text-[1rem]"
        >
          {title}
          {required ? "*" : null}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          value={value}
          required={required}
          onBlur={onBlur}
        />
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600">
          {errormsg}
        </p>
      )}
    </div>
  );
}
