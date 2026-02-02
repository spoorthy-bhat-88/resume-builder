// API utilities for managing data with MongoDB backend


// Detect if running locally
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Local storage helpers
function getLocal(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const api = {
  // Projects

  async getProjects() {
    if (isLocal) return getLocal('projects');
    const response = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse(response);
  },


  async createProject(project) {
    if (isLocal) {
      const projects = getLocal('projects');
      const newProject = { ...project, _id: generateId() };
      projects.unshift(newProject);
      setLocal('projects', projects);
      return newProject;
    }
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },


  async updateProject(id, project) {
    if (isLocal) {
      const projects = getLocal('projects');
      const idx = projects.findIndex(p => p._id === id);
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project };
        setLocal('projects', projects);
        return projects[idx];
      }
      throw new Error('Project not found');
    }
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },


  async deleteProject(id) {
    if (isLocal) {
      const projects = getLocal('projects').filter(p => p._id !== id);
      setLocal('projects', projects);
      return true;
    }
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Education

  async getEducation() {
    if (isLocal) return getLocal('education');
    const response = await fetch(`${API_BASE_URL}/education`);
    return handleResponse(response);
  },


  async createEducation(education) {
    if (isLocal) {
      const educationArr = getLocal('education');
      const newEdu = { ...education, _id: generateId() };
      educationArr.unshift(newEdu);
      setLocal('education', educationArr);
      return newEdu;
    }
    const response = await fetch(`${API_BASE_URL}/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(education),
    });
    return handleResponse(response);
  },


  async updateEducation(id, education) {
    if (isLocal) {
      const educationArr = getLocal('education');
      const idx = educationArr.findIndex(e => e._id === id);
      if (idx !== -1) {
        educationArr[idx] = { ...educationArr[idx], ...education };
        setLocal('education', educationArr);
        return educationArr[idx];
      }
      throw new Error('Education not found');
    }
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(education),
    });
    return handleResponse(response);
  },


  async deleteEducation(id) {
    if (isLocal) {
      const educationArr = getLocal('education').filter(e => e._id !== id);
      setLocal('education', educationArr);
      return true;
    }
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Experiences

  async getExperiences() {
    if (isLocal) return getLocal('experiences');
    const response = await fetch(`${API_BASE_URL}/experiences`);
    return handleResponse(response);
  },


  async createExperience(experience) {
    if (isLocal) {
      const experiences = getLocal('experiences');
      const newExp = { ...experience, _id: generateId() };
      experiences.unshift(newExp);
      setLocal('experiences', experiences);
      return newExp;
    }
    const response = await fetch(`${API_BASE_URL}/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    return handleResponse(response);
  },


  async updateExperience(id, experience) {
    if (isLocal) {
      const experiences = getLocal('experiences');
      const idx = experiences.findIndex(e => e._id === id);
      if (idx !== -1) {
        experiences[idx] = { ...experiences[idx], ...experience };
        setLocal('experiences', experiences);
        return experiences[idx];
      }
      throw new Error('Experience not found');
    }
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    return handleResponse(response);
  },


  async deleteExperience(id) {
    if (isLocal) {
      const experiences = getLocal('experiences').filter(e => e._id !== id);
      setLocal('experiences', experiences);
      return true;
    }
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Resumes

  async getResumes() {
    if (isLocal) return getLocal('resumes');
    const response = await fetch(`${API_BASE_URL}/resumes`);
    return handleResponse(response);
  },


  async createResume(resume) {
    if (isLocal) {
      const resumes = getLocal('resumes');
      const newResume = { ...resume, _id: generateId(), createdAt: new Date().toISOString() };
      resumes.unshift(newResume);
      setLocal('resumes', resumes);
      return newResume;
    }
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    return handleResponse(response);
  },


  async updateResume(id, resume) {
    if (isLocal) {
      const resumes = getLocal('resumes');
      const idx = resumes.findIndex(r => r._id === id);
      if (idx !== -1) {
        resumes[idx] = { ...resumes[idx], ...resume };
        setLocal('resumes', resumes);
        return resumes[idx];
      }
      throw new Error('Resume not found');
    }
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    return handleResponse(response);
  },


  async deleteResume(id) {
    if (isLocal) {
      const resumes = getLocal('resumes').filter(r => r._id !== id);
      setLocal('resumes', resumes);
      return true;
    }
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
