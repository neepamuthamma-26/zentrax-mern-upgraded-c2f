import React from "react";

export default function ProjectsTable({ projects = [] }) {
  return (
    <div className="zentrax-card">
      <div style={{fontSize:12,color:'var(--zentrax-muted)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase'}}>Recent Projects</div>
      <div style={{marginTop:12,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{textAlign:'left',color:'var(--zentrax-muted)'}}>
              <th style={{padding:'8px 6px'}}>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}}>
                <td style={{padding:'10px 6px'}}>
                  <div style={{fontWeight:600}}>{p.title}</div>
                  <div style={{fontSize:12,color:'var(--zentrax-muted)'}}>{p.location}</div>
                </td>
                <td>{p.clientId?.name || '—'}</td>
                <td><span className={`zentrax-badge`} style={{background:'rgba(255,255,255,0.03)',color:'var(--zentrax-gold)'}}>{p.status}</span></td>
                <td>{p.completion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
