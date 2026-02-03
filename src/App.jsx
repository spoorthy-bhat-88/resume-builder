import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MasterList } from './components/MasterList';
import { ResumeBuilder } from './components/ResumeBuilder';
import { SavedResumes } from './components/SavedResumes';
import ProfileForm from './components/ProfileForm';
import AuthPage from './components/AuthPage';
import './App.css';

function AppContent() {
  const { currentView, setCurrentView, clearAllData, loadAllData } = useApp();
  const { user, logout } = useAuth();

  // Reload data when user changes
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      clearAllData();
    }
  }, [user, loadAllData, clearAllData]);

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1>Resume Builder</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="user-info">{user.email}</span>
            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="nav-tabs">
          <div className="nav-tabs-left">
            <button
              className={currentView === 'master' ? 'active' : ''}
              onClick={() => setCurrentView('master')}
            >
              Master List
            </button>
            <button
              className={currentView === 'builder' ? 'active' : ''}
              onClick={() => setCurrentView('builder')}
            >
              Build Resume
            </button>
            <button
              className={currentView === 'saved' ? 'active' : ''}
              onClick={() => setCurrentView('saved')}
            >
              Saved Resumes
            </button>
            <button
              className={currentView === 'profile' ? 'active' : ''}
              onClick={() => setCurrentView('profile')}
            >
              Profile
            </button>
          </div>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'master' && <MasterList />}
        {currentView === 'builder' && <ResumeBuilder />}
        {currentView === 'saved' && <SavedResumes />}
        {currentView === 'profile' && <ProfileForm />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
