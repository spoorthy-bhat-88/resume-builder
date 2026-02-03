// API utilities for managing data with MongoDB backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper to get auth token
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Helper to get auth headers
function getAuthHeaders() {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (!response.ok) {
    let errorInfo = { message: 'Network error' };
    if (isJson) {
       errorInfo = await response.json().catch(() => ({ message: 'Network error' }));
    } else {
       const text = await response.text();
       console.error('API Error (Non-JSON):', text);
       errorInfo = { message: `Server error: ${response.status} ${response.statusText}` };
    }
    throw new Error(errorInfo.message || errorInfo.error || 'Something went wrong');
  }

  if (!isJson) {
    throw new Error('Received non-JSON response from API');
  }
  
  return response.json();
};

export const api = {
  // Projects

  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async createProject(project) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },

  async updateProject(id, project) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });
    return handleResponse(response);
  },

  async deleteProject(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Education

  async getEducation() {
    const response = await fetch(`${API_BASE_URL}/education`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async createEducation(education) {
    const response = await fetch(`${API_BASE_URL}/education`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(education),
    });
    return handleResponse(response);
  },

  async updateEducation(id, education) {
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(education),
    });
    return handleResponse(response);
  },

  async deleteEducation(id) {
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Experiences

  async getExperiences() {
    const response = await fetch(`${API_BASE_URL}/experiences`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async createExperience(experience) {
    const response = await fetch(`${API_BASE_URL}/experiences`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(experience),
    });
    return handleResponse(response);
  },

  async updateExperience(id, experience) {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(experience),
    });
    return handleResponse(response);
  },

  async deleteExperience(id) {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Resumes

  async getResumes() {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async createResume(resume) {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resume),
    });
    return handleResponse(response);
  },

  async updateResume(id, resume) {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(resume),
    });
    return handleResponse(response);
  },

  async deleteResume(id) {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Profile
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async updateProfile(profile) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    });
    return handleResponse(response);
  },
};
