import React from "react";
import Modal from "./Modal";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div style={{padding:8}}>
        <p style={{color:'var(--zentrax-muted)'}}>{message}</p>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:12}}>
          <button className="zentrax-btn ghost" onClick={onCancel}>Cancel</button>
          <button className="zentrax-btn primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
}
