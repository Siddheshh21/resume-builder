import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { useResume } from '../../context/ResumeContext';
import type { Experience } from '../../types/resume';
import './EditorSection.css';

export default function ExperienceSection() {
  const { state, dispatch } = useResume();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [''],
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExp });
  };

  const updateExperience = (id: string, field: string, value: unknown) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data: { [field]: value } } });
  };

  const updateBullet = (expId: string, index: number, value: string) => {
    const exp = state.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[index] = value;
    updateExperience(expId, 'bullets', newBullets);
  };

  const addBullet = (expId: string) => {
    const exp = state.experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, 'bullets', [...exp.bullets, '']);
  };

  const removeBullet = (expId: string, index: number) => {
    const exp = state.experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, 'bullets', exp.bullets.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="editor-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-header">
        <h3 className="section-title">
          <span className="section-icon">💼</span>
          Experience
        </h3>
        <motion.button
          className="btn-add"
          onClick={addExperience}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlinePlus /> Add
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        {state.experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="entry-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="entry-header">
              <span className="entry-badge">Experience</span>
              <motion.button
                className="btn-delete"
                onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineTrash />
              </motion.button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="month"
                  className="form-input"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  className="form-input"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  />
                  Currently working here
                </label>
              </div>
            </div>

            <div className="bullets-section">
              <label className="form-label">Key Achievements</label>
              {exp.bullets.map((bullet, index) => (
                <div key={index} className="bullet-row">
                  <span className="bullet-dot">•</span>
                  <input
                    type="text"
                    className="form-input bullet-input"
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, index, e.target.value)}
                    placeholder="Describe an achievement..."
                  />
                  {exp.bullets.length > 1 && (
                    <motion.button
                      className="btn-remove-bullet"
                      onClick={() => removeBullet(exp.id, index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  )}
                </div>
              ))}
              <button className="btn-add-bullet" onClick={() => addBullet(exp.id)}>
                + Add bullet point
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
