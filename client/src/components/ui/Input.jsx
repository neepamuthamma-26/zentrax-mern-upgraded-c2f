import React from "react";

export default function Input({ label, value, onChange, type = "text", placeholder = "", ...props }) {
  return (
    <div className="zentrax-input">
      <input type={type} value={value} onChange={onChange} placeholder={placeholder || " "} {...props} />
      {label && <label>{label}</label>}
    </div>
  );
}
