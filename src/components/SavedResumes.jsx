import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

import { exportTextFile, exportPDF, exportHTMLFile } from '../utils/export';
import { generateResumeHTML } from '../utils/resumeTemplate';

export const SavedResumes = () => {
  const { resumes, deleteResume, profile } = useApp();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteResume(id);
    setDeleteConfirm(null);
  };

  const handlePreview = (resume) => {
    try {
      const htmlContent = generateResumeHTML(resume, profile);
      const newWindow = window.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } catch (error) {
      console.error('Error opening preview in new tab:', error);
      alert('Failed to open preview in new tab');
    }
  };


  // Markdown generator (copied from ResumeBuilder)
  function resumeToMarkdown(resume) {
    if (!resume) return '';
    let md = `# ${profile?.name || 'Your Name'}\n`;
    md += `\n**Email:** ${profile?.email || ''}  `;
    md += `**Phone:** ${profile?.phone || ''}\n`;
    if (resume.education?.length) {
      md += `\n## Education\n`;
      resume.education.forEach(e => {
        md += `- **${e.school || e.institution}**: ${e.degree || ''}`;
        if (e.field) md += ` in ${e.field}`;
        if (e.startYear || e.endYear) md += ` (${e.startYear || ''}-${e.endYear || ''})`;
        md += '\n';
      });
    }
    if (resume.projects?.length) {
      md += `\n## Projects\n`;
      resume.projects.forEach(p => {
        md += `- **${p.title}**: ${p.description || ''}`;
        if (p.technologies) md += `\n  - Technologies: ${p.technologies}`;
        if (p.highlights?.length) md += `\n  - Highlights: ${p.highlights.join('; ')}`;
        md += '\n';
      });
    }
    return md;
  }

  const handleExportMarkdown = (resume) => {
    exportTextFile((resume.title || 'resume') + '.md', resumeToMarkdown(resume));
  };

  const handleExportHTML = (resume) => {
    const htmlContent = generateResumeHTML(resume, profile);
    exportHTMLFile((resume.title || 'resume') + '.html', htmlContent);
  };

  // PDF export: render a hidden DOM node for each resume
  const pdfRefs = useRef({});
  const handleExportPDF = async (resume) => {
    const htmlContent = generateResumeHTML(resume, profile);
    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);
    
    // Export to PDF
    await exportPDF(tempDiv, (resume.title || 'resume') + '.pdf');
    
    // Clean up
    document.body.removeChild(tempDiv);
  };

  const generateResumeText = (resume) => {
    let text = `${resume.title}\n`;
    text += `Created: ${new Date(resume.createdAt).toLocaleDateString()}\n`;
    text += '='.repeat(60) + '\n\n';

    if (resume.experiences && resume.experiences.length > 0) {
      text += 'EXPERIENCE\n';
      text += '-'.repeat(60) + '\n';
      resume.experiences.forEach((exp) => {
        text += `\n${exp.position}\n`;
        text += `${exp.company}`;
        if (exp.location) text += ` | ${exp.location}`;
        text += '\n';
        if (exp.startDate || exp.endDate) {
          text += `${exp.startDate || ''} - ${exp.endDate || ''}\n`;
        }
        if (exp.description) text += `\n${exp.description}\n`;
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((achievement) => {
            text += `• ${achievement}\n`;
          });
        }
        text += '\n';
      });
    }

    if (resume.projects && resume.projects.length > 0) {
      text += '\nPROJECTS\n';
      text += '-'.repeat(60) + '\n';
      resume.projects.forEach((project) => {
        text += `\n${project.title}`;
        if (project.duration) text += ` | ${project.duration}`;
        text += '\n';
        if (project.technologies) text += `Technologies: ${project.technologies}\n`;
        if (project.description) text += `\n${project.description}\n`;
        if (project.highlights && project.highlights.length > 0) {
          project.highlights.forEach((highlight) => {
            text += `• ${highlight}\n`;
          });
        }
        text += '\n';
      });
    }

    if (resume.education && resume.education.length > 0) {
      text += '\nEDUCATION\n';
      text += '-'.repeat(60) + '\n';
      resume.education.forEach((edu) => {
        text += `\n${edu.institution}\n`;
        text += `${edu.degree}`;
        if (edu.field) text += ` in ${edu.field}`;
        text += '\n';
        if (edu.startDate || edu.endDate) {
          text += `${edu.startDate || ''} - ${edu.endDate || ''}\n`;
        }
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        if (edu.achievements && edu.achievements.length > 0) {
          edu.achievements.forEach((achievement) => {
            text += `• ${achievement}\n`;
          });
        }
        text += '\n';
      });
    }

    return text;
  };

  if (resumes.length === 0) {
    return (
      <div className="saved-resumes">
        <h2>Saved Resumes</h2>
        <p className="empty-message">No saved resumes yet. Build your first one!</p>
      </div>
    );
  }

  return (
    <div className="saved-resumes">
      <h2>Saved Resumes ({resumes.length})</h2>
      <div className="resumes-grid">
        {resumes.map((resume) => (
          <div key={resume._id} className="resume-card">
            <div className="resume-header">
              <h2 style={{ margin: 0 }}>{resume.title}</h2>
              <span className="resume-date">
                {new Date(resume.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="resume-summary">
              <div className="summary-item">
                <span className="summary-label">Experiences:</span>
                <span className="summary-value">{resume.experiences?.length || 0}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Projects:</span>
                <span className="summary-value">{resume.projects?.length || 0}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Education:</span>
                <span className="summary-value">{resume.education?.length || 0}</span>
              </div>
            </div>
            <div className="resume-actions">
              <button className="btn-secondary" onClick={() => handlePreview(resume)}>
                Preview
              </button>
              <button className="btn-delete" onClick={() => setDeleteConfirm(resume._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {deleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 8, padding: 40, maxWidth: 500, width: '95%', position: 'relative', textAlign: 'center' }}>
            <h2 style={{ marginTop: 0, marginBottom: 20 }}>Delete Resume</h2>
            <p style={{ color: '#666', marginBottom: 30 }}>Are you sure you want to delete this resume? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button 
                onClick={() => handleDelete(deleteConfirm)}
                style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
              >
                Delete
              </button>
              <button 
                onClick={() => setDeleteConfirm(null)}
                style={{ padding: '10px 20px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
