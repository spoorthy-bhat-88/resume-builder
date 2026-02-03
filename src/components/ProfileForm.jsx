import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/storage';

export default function ProfileForm() {
  const { profile, setProfile } = useApp();
  const [form, setForm] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync form with profile when profile loads/updates from context
  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSavedSuccess(false);
  };

  const isDirty = JSON.stringify(form) !== JSON.stringify(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) return;

    setIsSaving(true);
    try {
      await api.updateProfile(form);
      setProfile(form);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Your Profile</h2>
        {isDirty && <span style={{ color: '#e67300', fontSize: '0.8rem', fontWeight: 'bold' }}>● Unsaved Changes</span>}
        {savedSuccess && <span style={{ color: 'green', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ Saved</span>}
      </div>
      
      <div style={{ marginBottom: 12 }}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', borderColor: form.name !== profile.name ? '#e67300' : '' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" required style={{ width: '100%', borderColor: form.email !== profile.email ? '#e67300' : '' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} type="tel" style={{ width: '100%', borderColor: form.phone !== profile.phone ? '#e67300' : '' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>City</label>
        <input name="city" value={form.city || ''} onChange={handleChange} style={{ width: '100%', borderColor: (form.city || '') !== (profile.city || '') ? '#e67300' : '' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>State</label>
        <input name="state" value={form.state || ''} onChange={handleChange} style={{ width: '100%', borderColor: (form.state || '') !== (profile.state || '') ? '#e67300' : '' }} />
      </div>
      
      <button 
        className="btn-primary" 
        type="submit" 
        style={{ 
          width: '100%', 
          backgroundColor: isDirty ? '#000000' : '#888888',
          cursor: isDirty ? 'pointer' : 'default',
          opacity: isSaving ? 0.7 : 1
        }}
        disabled={!isDirty || isSaving}
      >
        {isSaving ? 'Saving...' : (isDirty ? 'Save Changes' : 'Saved')}
      </button>
    </form>
  );
}
