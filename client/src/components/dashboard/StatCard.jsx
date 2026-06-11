import React from "react";

export default function StatCard({ title, value, delta, icon }) {
  return (
    <div className="zentrax-card" style={{minWidth:160}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:12,color:'var(--zentrax-muted)',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase'}}>{title}</div>
          <div style={{fontSize:20,fontWeight:700,marginTop:6}}>{value}</div>
        </div>
        {icon && <div style={{fontSize:28}}>{icon}</div>}
      </div>
      {typeof delta !== 'undefined' && <div style={{marginTop:10,fontSize:12,color:'var(--zentrax-muted)'}}>{delta}</div>}
    </div>
  );
}
