import React, { useState, useRef, useEffect } from "react";

export default function DropdownMenu({ children, items = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const onToggleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((v) => !v); }
  };

  return (
    <div style={{position:'relative'}} ref={ref}>
      <button className="zentrax-btn small ghost" onClick={() => setOpen(!open)} onKeyDown={onToggleKey} aria-haspopup="true" aria-expanded={open}>
        {children || '⋯'}
      </button>
      {open && (
        <div role="menu" style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'rgba(17,24,39,0.95)',border:'1px solid var(--zentrax-border)',borderRadius:8,padding:6,zIndex:40,minWidth:160}}>
          {items.map((it, i) => (
            <button role="menuitem" key={i} onClick={() => { setOpen(false); it.onClick(); }} style={{display:'flex',alignItems:'center',gap:8,width:'100%',textAlign:'left',padding:'8px',background:'transparent',border:'none',color:'var(--zentrax-white)'}}>
              {it.icon && <span style={{width:18,display:'inline-block'}}>{it.icon}</span>}
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
