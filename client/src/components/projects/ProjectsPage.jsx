import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/api";
import ProjectCard from "./ProjectCard";
import ConfirmModal from "../ui/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/ToastContext";
import ProjectsTableView from "./ProjectsTableView";

function SkeletonCard(){
  return <div className="zentrax-card" style={{height:220,background:'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'}} />;
}

export default function ProjectsPage(){
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // grid or table
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');

  const load = async () => {
    setLoading(true);
    try{ const res = await api.get('/manager/projects'); setProjects(res.data || []); }
    catch(e){ console.error(e); }
    finally{ setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let out = [...projects];
    if(query) out = out.filter(p => (p.title||'').toLowerCase().includes(query.toLowerCase()) || (p.location||'').toLowerCase().includes(query.toLowerCase()));
    if(status !== 'all') out = out.filter(p => p.status === status);
    if(sort === 'newest') out.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    if(sort === 'oldest') out.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt));
    if(sort === 'az') out.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
    return out;
  }, [projects, query, status, sort]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const handleDelete = async (p) => {
    setTarget(p);
    setConfirmOpen(true);
  };

  const navigate = useNavigate();
  const { addToast } = useToast();

  const doDelete = async () => {
    if(!target) return;
    try{
      await api.delete(`/manager/projects/${target._id}`);
      setConfirmOpen(false);
      setTarget(null);
      addToast('Project deleted', { type: 'success' });
      await load();
    }
    catch(e){ addToast(e.message || 'Delete failed', { type: 'error' }); }
  };

  const handleEdit = (p) => { navigate(`/manager/projects/${p._id}/edit`); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Search projects..." value={query} onChange={(e)=>setQuery(e.target.value)} style={{padding:10,borderRadius:10,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}} />
          <select value={status} onChange={(e)=>setStatus(e.target.value)} style={{padding:10,borderRadius:10,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}}>
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} style={{padding:10,borderRadius:10,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
          </select>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className={`zentrax-btn ${view==='grid'?'ghost':''}`} onClick={()=>setView('grid')}>Grid</button>
          <button className={`zentrax-btn ${view==='table'?'ghost':''}`} onClick={()=>setView('table')}>Table</button>
        </div>
      </div>

      {loading ? (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
          {[1,2,3,4].map(i=> <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="zentrax-card" style={{textAlign:'center',padding:40}}>
              <h3 style={{marginBottom:8}}>No projects found</h3>
              <p style={{color:'var(--zentrax-muted)'}}>Create your first project to get started.</p>
                <div style={{marginTop:12}}>
                <button className="zentrax-btn primary" onClick={()=>navigate('/manager/add-project')}>Add Project</button>
              </div>
            </div>
          ) : (
            view === 'grid' ? (
              <motion.div layout className="projects-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
                <AnimatePresence>
                  {filtered.map(p => (
                    <ProjectCard key={p._id} project={p} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                </AnimatePresence>
              </motion.div>
              ) : (
              <ProjectsTableView projects={filtered} onEdit={handleEdit} onDelete={handleDelete} />
            )
          )}
        </>
      )}

      {/* Confirm modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Project"
        message={target ? `Are you sure you want to delete "${target.title}"? This action cannot be undone.` : ''}
        onCancel={() => { setConfirmOpen(false); setTarget(null); }}
        onConfirm={doDelete}
      />
    </div>
  );
}
