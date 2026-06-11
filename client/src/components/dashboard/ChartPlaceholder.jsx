import React from "react";

export default function ChartPlaceholder({ title, height = 160 }) {
  return (
    <div className="zentrax-card" style={{padding:12}}>
      <div style={{fontSize:12,color:'var(--zentrax-muted)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase'}}>{title}</div>
      <div style={{height,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--zentrax-muted)'}}>
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" style={{opacity:0.08}}>
          <rect x="0" y="0" width="300" height="100" fill="url(#g)" />
        </svg>
        <div style={{position:'absolute'}}>Chart preview</div>
      </div>
    </div>
  );
}
