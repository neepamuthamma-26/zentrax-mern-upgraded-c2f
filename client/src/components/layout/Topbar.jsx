import React from "react";

export default function Topbar() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:16}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <input placeholder="Search projects..." style={{padding:10,borderRadius:10,background:'transparent',border:'1px solid rgba(255,255,255,0.04)',color:'var(--zentrax-white)'}} />
      </div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button className="zentrax-btn ghost">Notifications</button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:36,height:36,borderRadius:999,background:'rgba(255,255,255,0.06)'}} />
        </div>
      </div>
    </div>
  );
}
