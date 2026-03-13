import { motion } from 'framer-motion';
import { useResume } from '../../context/ResumeContext';
import './EditorSection.css';

export default function PersonalInfo() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const handleChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  return (
    <motion.div
      className="editor-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="section-title">
        <span className="section-icon">👤</span>
        Personal Information
      </h3>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@email.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-input"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="johndoe.dev"
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief description about yourself..."
          rows={4}
        />
      </div>
    </motion.div>
  );
}
