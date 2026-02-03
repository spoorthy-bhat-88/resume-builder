import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [currentView, setCurrentView] = useState('master'); // 'master' or 'builder'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // User profile state
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', city: '', state: '' });

  const clearAllData = useCallback(() => {
    setProjects([]);
    setEducation([]);
    setExperiences([]);
    setResumes([]);
    setProfile({ name: '', email: '', phone: '', city: '', state: '' });
    setError(null);
  }, []);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [projectsData, educationData, experiencesData, resumesData, profileData] = await Promise.all([
        api.getProjects(),
        api.getEducation(),
        api.getExperiences(),
        api.getResumes(),
        api.getProfile()
      ]);
      setProjects(projectsData);
      setEducation(educationData);
      setExperiences(experiencesData);
      setResumes(resumesData);
      setProfile(profileData || { name: '', email: '', phone: '', city: '', state: '' });
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Projects
  const addProject = async (project) => {
    try {
      const newProject = await api.createProject(project);
      setProjects([newProject, ...projects]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      const updated = await api.updateProject(id, updatedProject);
      setProjects(projects.map(p => p._id === id ? updated : p));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Education
  const addEducation = async (edu) => {
    try {
      const newEducation = await api.createEducation(edu);
      setEducation([newEducation, ...education]);
      return newEducation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEducation = async (id, updatedEdu) => {
    try {
      const updated = await api.updateEducation(id, updatedEdu);
      setEducation(education.map(e => e._id === id ? updated : e));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEducation = async (id) => {
    try {
      await api.deleteEducation(id);
      setEducation(education.filter(e => e._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Experiences
  const addExperience = async (exp) => {
    try {
      const newExperience = await api.createExperience(exp);
      setExperiences([newExperience, ...experiences]);
      return newExperience;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateExperience = async (id, updatedExp) => {
    try {
      const updated = await api.updateExperience(id, updatedExp);
      setExperiences(experiences.map(e => e._id === id ? updated : e));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExperience = async (id) => {
    try {
      await api.deleteExperience(id);
      setExperiences(experiences.filter(e => e._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Resumes
  const saveResume = async (resume) => {
    try {
      if (resume._id) {
        const updated = await api.updateResume(resume._id, resume);
        setResumes(resumes.map(r => r._id === resume._id ? updated : r));
        return updated;
      } else {
        const newResume = await api.createResume(resume);
        setResumes([newResume, ...resumes]);
        return newResume;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteResume = async (id) => {
    try {
      await api.deleteResume(id);
      setResumes(resumes.filter(r => r._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };


  const value = {
    projects,
    education,
    experiences,
    resumes,
    currentView,
    setCurrentView,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    saveResume,
    deleteResume,
    profile,
    setProfile,
    clearAllData,
    loadAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
