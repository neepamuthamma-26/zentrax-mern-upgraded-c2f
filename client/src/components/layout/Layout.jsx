import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="zentrax-container">
      <Sidebar />
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{padding:16, borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
          <Topbar />
        </div>
        <main className="zentrax-main">{children}</main>
      </div>
    </div>
  );
}
