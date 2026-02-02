import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MasterList } from './components/MasterList';
import { ResumeBuilder } from './components/ResumeBuilder';
import { SavedResumes } from './components/SavedResumes';
import ProfileForm from './components/ProfileForm';
import './App.css';

function AppContent() {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Resume Builder</h1>
        <nav className="nav-tabs">
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
        </nav>
      </header>

      <main className="app-main">
  {currentView === 'master' && <MasterList />}
  {currentView === 'builder' && <ResumeBuilder />}
  {currentView === 'saved' && <SavedResumes />}
  {currentView === 'profile' && <ProfileForm />}
      </main>

      <footer className="app-footer">
        <p>Resume Builder © 2026 - Your career, your way</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
