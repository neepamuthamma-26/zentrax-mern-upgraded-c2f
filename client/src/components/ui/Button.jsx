import React from "react";

export default function Button({ children, variant = "primary", size = "", className = "", onClick, ...props }) {
  const cls = `zentrax-btn ${variant} ${size} ${className}`.trim();
  return (
    <button type="button" className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
