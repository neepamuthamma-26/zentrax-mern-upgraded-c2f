import React from "react";

export default function ActivityTimeline({ items = [] }) {
  return (
    <div className="zentrax-card">
      <div style={{fontSize:12,color:'var(--zentrax-muted)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase'}}>Recent Activity</div>
      <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:12}}>
        {items.length === 0 && <div style={{color:'var(--zentrax-muted)'}}>No recent activity</div>}
        {items.map((it,i) => (
          <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{width:10,height:10,background:'var(--zentrax-gold)',borderRadius:999,marginTop:6}} />
            <div>
              <div style={{fontSize:13}}>{it.title}</div>
              <div style={{fontSize:12,color:'var(--zentrax-muted)'}}>{it.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
