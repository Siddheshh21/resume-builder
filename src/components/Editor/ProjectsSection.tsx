import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Project } from '../../types/resume';
import './EditorSection.css';

export default function ProjectsSection() {
  const { state, dispatch } = useResume();
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProj });
  };

  const updateProject = (id: string, field: string, value: unknown) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data: { [field]: value } } });
  };

  const addTech = (projId: string) => {
    const tech = techInputs[projId]?.trim();
    if (!tech) return;
    const proj = state.projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, 'technologies', [...proj.technologies, tech]);
    setTechInputs((prev) => ({ ...prev, [projId]: '' }));
  };

  const removeTech = (projId: string, index: number) => {
    const proj = state.projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, 'technologies', proj.technologies.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="editor-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-header">
        <h3 className="section-title">
          <span className="section-icon">🚀</span>
          Projects
        </h3>
        <motion.button
          className="btn-add"
          onClick={addProject}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlinePlus /> Add
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        {state.projects.map((proj) => (
          <motion.div
            key={proj.id}
            className="entry-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="entry-header">
              <span className="entry-badge project-badge">Project</span>
              <motion.button
                className="btn-delete"
                onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: proj.id })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineTrash />
              </motion.button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="Project Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-input"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  placeholder="github.com/user/project"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>

            <div className="tech-tags-section">
              <label className="form-label">Technologies</label>
              <div className="tech-input-row">
                <input
                  type="text"
                  className="form-input"
                  value={techInputs[proj.id] || ''}
                  onChange={(e) => setTechInputs((prev) => ({ ...prev, [proj.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(proj.id))}
                  placeholder="Add technology..."
                />
                <button className="btn-add-bullet" onClick={() => addTech(proj.id)}>+</button>
              </div>
              <div className="tech-tags">
                {proj.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                    <button className="tech-remove" onClick={() => removeTech(proj.id, index)}>
                      <HiOutlineX />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
