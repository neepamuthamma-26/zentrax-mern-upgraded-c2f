import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="zentrax-modal-overlay" onClick={onClose}>
      <div className="zentrax-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title && <div style={{padding:16,borderBottom:'1px solid rgba(255,255,255,0.03)'}}><strong>{title}</strong></div>}
        <div style={{padding:16}}>{children}</div>
      </div>
    </div>
  );
}
