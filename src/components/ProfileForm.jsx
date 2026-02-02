import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProfileForm() {
  const { profile, setProfile } = useApp();
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    alert('Profile saved!');
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ marginBottom: 16 }}>Your Profile</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} type="tel" style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>City</label>
        <input name="city" value={form.city || ''} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>State</label>
        <input name="state" value={form.state || ''} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <button className="btn-primary" type="submit" style={{ width: '100%' }}>Save</button>
    </form>
  );
}
