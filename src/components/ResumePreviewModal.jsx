import React from 'react';
import { generateResumeHTML } from '../utils/resumeTemplate';
import { useApp } from '../context/AppContext';

export default function ResumePreviewModal({ resume, onClose }) {
  const { profile } = useApp();
  
  if (!resume) return null;
  
  const htmlContent = generateResumeHTML(resume, profile);

  const handleOpenInNewTab = () => {
    try {
      const newWindow = window.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } catch (error) {
      console.error('Error opening preview in new tab:', error);
      alert('Failed to open preview in new tab');
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 8, padding: 40, maxWidth: 500, width: '95%', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 16, right: 24, display: 'flex', gap: 12, zIndex: 1001 }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Close</button>
          <button onClick={onClose} style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: 28, background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
        </div>
        <h2 style={{ marginTop: 0, marginBottom: 20 }}>{resume.title || 'Resume'}</h2>
        <p style={{ color: '#666', marginBottom: 30 }}>Click below to open and view your resume in a new tab</p>
        <button 
          onClick={handleOpenInNewTab}
          style={{ padding: '12px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 16, fontWeight: 500 }}
        >
          Preview Resume
        </button>
      </div>
    </div>
  );
}
