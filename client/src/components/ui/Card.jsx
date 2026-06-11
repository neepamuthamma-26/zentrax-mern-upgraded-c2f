import React from "react";

export default function Card({ children, className = "", style = {} }) {
  return (
    <div className={`zentrax-card ${className}`} style={style}>
      {children}
    </div>
  );
}
