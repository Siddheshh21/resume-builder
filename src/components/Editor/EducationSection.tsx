import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { useResume } from '../../context/ResumeContext';
import type { Education } from '../../types/resume';
import './EditorSection.css';

export default function EducationSection() {
  const { state, dispatch } = useResume();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEdu });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data: { [field]: value } } });
  };

  return (
    <motion.div
      className="editor-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-header">
        <h3 className="section-title">
          <span className="section-icon">🎓</span>
          Education
        </h3>
        <motion.button
          className="btn-add"
          onClick={addEducation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlinePlus /> Add
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        {state.education.map((edu) => (
          <motion.div
            key={edu.id}
            className="entry-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="entry-header">
              <span className="entry-badge education-badge">Education</span>
              <motion.button
                className="btn-delete"
                onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineTrash />
              </motion.button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Field of Study</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GPA</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="month"
                  className="form-input"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  className="form-input"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
