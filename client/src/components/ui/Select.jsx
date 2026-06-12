import React from "react";

export default function Select({ label, options = [], value, onChange, ...props }) {
  return (
    <div className="zentrax-input">
      <select value={value} onChange={onChange} {...props} style={{padding:'12px',borderRadius:10,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',color:'var(--zentrax-white)'}}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {label && <label>{label}</label>}
    </div>
  );
}
