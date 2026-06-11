import React from "react";

export default function Badge({ children, className = "" }) {
  return (
    <span className={`zentrax-badge ${className}`.trim()}>
      {children}
    </span>
  );
}
