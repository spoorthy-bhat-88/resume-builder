import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MasterList = () => {
  const {
    projects,
    education,
    experiences,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    loading,
  } = useApp();

  const [activeTab, setActiveTab] = useState('projects');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="master-list">
        <div className="loading-message">Loading your data...</div>
      </div>
    );
  }

  return (
    <div className="master-list">
      <div className="master-list-header">
        <h2>Master List</h2>
        <p>Manage all your projects, education, and experiences</p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          Projects ({projects.length})
        </button>
        <button
          className={activeTab === 'education' ? 'active' : ''}
          onClick={() => setActiveTab('education')}
        >
          Education ({education.length})
        </button>
        <button
          className={activeTab === 'experiences' ? 'active' : ''}
          onClick={() => setActiveTab('experiences')}
        >
          Experiences ({experiences.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            addProject={addProject}
            updateProject={updateProject}
            deleteProject={deleteProject}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
        )}
        {activeTab === 'education' && (
          <EducationTab
            education={education}
            addEducation={addEducation}
            updateEducation={updateEducation}
            deleteEducation={deleteEducation}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
        )}
        {activeTab === 'experiences' && (
          <ExperiencesTab
            experiences={experiences}
            addExperience={addExperience}
            updateExperience={updateExperience}
            deleteExperience={deleteExperience}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
};

const ProjectsTab = ({
  projects,
  addProject,
  updateProject,
  deleteProject,
  editingItem,
  setEditingItem,
  showForm,
  setShowForm,
  resetForm,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    duration: '',
    highlights: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const project = {
        ...formData,
        highlights: formData.highlights.split('\n').filter(h => h.trim()),
      };

      if (editingItem) {
        await updateProject(editingItem._id, project);
      } else {
        await addProject(project);
      }

      setFormData({ title: '', description: '', technologies: '', duration: '', highlights: '' });
      resetForm();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingItem(project);
    setFormData({
      ...project,
      highlights: project.highlights.join('\n'),
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', technologies: '', duration: '', highlights: '' });
    resetForm();
  };

  return (
    <div className="tab-panel">
      <button className="btn-add" onClick={() => setShowForm(true)}>
        + Add Project
      </button>

      {showForm && (
        <form className="item-form" onSubmit={handleSubmit}>
          <h3>{editingItem ? 'Edit Project' : 'New Project'}</h3>
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            required
          />
          <input
            type="text"
            placeholder="Technologies (e.g., React, Node.js, MongoDB)"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration (e.g., 3 months, Jan 2024 - Mar 2024)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
          <textarea
            placeholder="Key Highlights (one per line)"
            value={formData.highlights}
            onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            rows="4"
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="items-list">
        {projects.length === 0 ? (
          <p className="empty-message">No projects yet. Add your first project!</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="item-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.technologies && <p className="meta">Technologies: {project.technologies}</p>}
              {project.duration && <p className="meta">Duration: {project.duration}</p>}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              <div className="item-actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => deleteProject(project._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const EducationTab = ({
  education,
  addEducation,
  updateEducation,
  deleteEducation,
  editingItem,
  setEditingItem,
  showForm,
  setShowForm,
  resetForm,
}) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const edu = {
        ...formData,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
      };

      if (editingItem) {
        await updateEducation(editingItem._id, edu);
      } else {
        await addEducation(edu);
      }

      setFormData({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', achievements: '' });
      resetForm();
    } catch (error) {
      alert('Error saving education: ' + error.message);
    }
  };

  const handleEdit = (edu) => {
    setEditingItem(edu);
    setFormData({
      ...edu,
      achievements: edu.achievements?.join('\n') || '',
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', achievements: '' });
    resetForm();
  };

  return (
    <div className="tab-panel">
      <button className="btn-add" onClick={() => setShowForm(true)}>
        + Add Education
      </button>

      {showForm && (
        <form className="item-form" onSubmit={handleSubmit}>
          <h3>{editingItem ? 'Edit Education' : 'New Education'}</h3>
          <input
            type="text"
            placeholder="Institution Name"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Degree (e.g., Bachelor of Science)"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Field of Study (e.g., Computer Science)"
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="Start Date (e.g., Sep 2020)"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="End Date (e.g., May 2024)"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="GPA (optional)"
            value={formData.gpa}
            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
          />
          <textarea
            placeholder="Achievements (one per line)"
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            rows="3"
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="items-list">
        {education.length === 0 ? (
          <p className="empty-message">No education entries yet. Add your first one!</p>
        ) : (
          education.map((edu) => (
            <div key={edu._id} className="item-card">
              <h3>{edu.institution}</h3>
              <p className="degree">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
              {(edu.startDate || edu.endDate) && (
                <p className="meta">
                  {edu.startDate} - {edu.endDate}
                </p>
              )}
              {edu.gpa && <p className="meta">GPA: {edu.gpa}</p>}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="highlights">
                  {edu.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
              <div className="item-actions">
                <button onClick={() => handleEdit(edu)}>Edit</button>
                <button onClick={() => deleteEducation(edu._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ExperiencesTab = ({
  experiences,
  addExperience,
  updateExperience,
  deleteExperience,
  editingItem,
  setEditingItem,
  showForm,
  setShowForm,
  resetForm,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const exp = {
        ...formData,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
      };

      if (editingItem) {
        await updateExperience(editingItem._id, exp);
      } else {
        await addExperience(exp);
      }

      setFormData({ company: '', position: '', location: '', startDate: '', endDate: '', description: '', achievements: '' });
      resetForm();
    } catch (error) {
      alert('Error saving experience: ' + error.message);
    }
  };

  const handleEdit = (exp) => {
    setEditingItem(exp);
    setFormData({
      ...exp,
      achievements: exp.achievements?.join('\n') || '',
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ company: '', position: '', location: '', startDate: '', endDate: '', description: '', achievements: '' });
    resetForm();
  };

  return (
    <div className="tab-panel">
      <button className="btn-add" onClick={() => setShowForm(true)}>
        + Add Experience
      </button>

      {showForm && (
        <form className="item-form" onSubmit={handleSubmit}>
          <h3>{editingItem ? 'Edit Experience' : 'New Experience'}</h3>
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Position/Title"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="Start Date (e.g., Jan 2023)"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="End Date (or 'Present')"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Job Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
          <textarea
            placeholder="Key Achievements (one per line)"
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            rows="4"
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="items-list">
        {experiences.length === 0 ? (
          <p className="empty-message">No experiences yet. Add your first experience!</p>
        ) : (
          experiences.map((exp) => (
            <div key={exp._id} className="item-card">
              <h3>{exp.position}</h3>
              <p className="company">{exp.company}</p>
              {exp.location && <p className="meta">Location: {exp.location}</p>}
              {(exp.startDate || exp.endDate) && (
                <p className="meta">
                  {exp.startDate} - {exp.endDate}
                </p>
              )}
              {exp.description && <p>{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="highlights">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
              <div className="item-actions">
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button onClick={() => deleteExperience(exp._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
