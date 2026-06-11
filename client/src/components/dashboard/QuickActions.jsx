import React from "react";
import Button from "../ui/Button";

export default function QuickActions({ onAddProject, onAddClient, onCreateUpdate }) {
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
      <Button variant="primary" onClick={onAddProject}>Add Project</Button>
      <Button variant="ghost" onClick={onAddClient}>Add Client</Button>
      <Button variant="ghost" onClick={onCreateUpdate}>Create Service Update</Button>
    </div>
  );
}
