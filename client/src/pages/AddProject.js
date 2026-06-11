import React, { useState, useRef } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/ToastContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

function useDropZone(onFiles){
  const ref = useRef();
  const handle = (e) => { e.preventDefault(); const files = Array.from(e.dataTransfer.files || []); onFiles(files); };
  const prevent = (e) => e.preventDefault();
  return { ref, props: { onDragOver: prevent, onDrop: handle } };
}

export default function AddProject(){
  const [form, setForm] = useState({ title:'', location:'', client:'', status:'pending', description:'' });
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const onFiles = (files) => {
    const urls = files.map(f => ({ file: f, url: URL.createObjectURL(f) }));
    setImages(prev => [...prev, ...urls]);
  };
  const dz = useDropZone(onFiles);

  const handleSave = async (draft = false) => {
    setSaving(true);
    try{
      const data = new FormData();
      Object.keys(form).forEach(k => data.append(k, form[k]));
      data.append('draft', draft ? '1' : '0');
      images.forEach((it, i) => data.append('images', it.file, `img${i}`));
      // Debug: log stored token and form data keys
      try { console.log('[AddProject] local zx_token:', localStorage.getItem('zx_token')); } catch(e){}
      for (const pair of data.entries()) console.log('[AddProject] formdata', pair[0], pair[1]);
      await api.post('/manager/projects', data);
      addToast('Project saved', { type: 'success' });
      navigate('/manager/projects');
    }catch(e){ alert(e.message); }
    finally{ setSaving(false); }
  };

  return (
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
      <Card>
        <h2 style={{marginTop:0}}>Add Project</h2>
        <div {...dz.props} style={{border:'1px dashed rgba(255,255,255,0.06)',padding:12,borderRadius:8,marginBottom:12}}>
          <input type="file" multiple onChange={(e)=> onFiles(Array.from(e.target.files))} style={{display:'block',marginBottom:8}} />
          <div style={{color:'var(--zentrax-muted)'}}>Drag & drop images here (multiple)</div>
        </div>

        <Input label="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
        <Input label="Location" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} />
        <Select label="Status" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} options={[{label:'Pending',value:'pending'},{label:'Ongoing',value:'ongoing'},{label:'Completed',value:'completed'}]} />
        <div style={{marginTop:8}}>
          <label style={{display:'block',marginBottom:6}}>Description</label>
          <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={{width:'100%',minHeight:120,padding:12,borderRadius:8,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}} />
        </div>

        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="zentrax-btn primary" onClick={()=>handleSave(false)} disabled={saving}>{saving ? 'Saving...':'Save'}</button>
          <button className="zentrax-btn ghost" onClick={()=>handleSave(true)} disabled={saving}>Save Draft</button>
        </div>
      </Card>

      <aside>
        <Card>
          <h3 style={{marginTop:0}}>Live Preview</h3>
          <div style={{borderRadius:8,overflow:'hidden'}}>
            {images.length>0 ? (
              <img src={images[0].url} alt="preview" style={{width:'100%',height:180,objectFit:'cover'}} />
            ) : (
              <div style={{height:180,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--zentrax-muted)'}}>No image</div>
            )}
            <div style={{padding:12}}>
              <div style={{fontWeight:700,fontSize:18}}>{form.title || 'Project Title'}</div>
              <div style={{color:'var(--zentrax-muted)'}}>{form.location || 'Location'}</div>
              <div style={{marginTop:8}}><span className="zentrax-badge">{form.status}</span></div>
            </div>
          </div>
          {images.length>0 && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
              {images.map((it, i) => (
                <div key={i} style={{height:70,overflow:'hidden',borderRadius:6}}>
                  <img src={it.url} alt={`img-${i}`} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </aside>
    </div>
  );
}
