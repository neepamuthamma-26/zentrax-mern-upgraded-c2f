import React from "react";
import { motion } from "framer-motion";
import DropdownMenu from "../ui/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();
  const img = project.images && project.images.length ? project.images[0] : "/images/placeholder.png";
  return (
    <motion.div layout initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="zentrax-card" style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{height:140,overflow:'hidden',borderRadius:10}}>
        <img src={img} alt={project.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700}}>{project.title}</div>
          <div style={{fontSize:12,color:'var(--zentrax-muted)'}}>{project.location}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{marginBottom:6}}><span className="zentrax-badge">{project.status}</span></div>
          <div style={{fontSize:12,color:'var(--zentrax-muted)'}}>{project.clientId?.name || '—'}</div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:12,color:'var(--zentrax-muted)'}}>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}</div>
        <DropdownMenu items={[{ label: 'View', icon: <FaEye/>, onClick: () => navigate(`/manager/projects/${project._id}`) }, { label: 'Edit', icon: <FaEdit/>, onClick: () => onEdit(project) }, { label: 'Delete', icon: <FaTrash/>, onClick: () => onDelete(project) }]} />
      </div>
    </motion.div>
  );
}
