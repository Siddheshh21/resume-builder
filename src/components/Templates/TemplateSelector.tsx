import { motion } from 'framer-motion';
import { useResume } from '../../context/ResumeContext';
import { HiCheckCircle } from 'react-icons/hi';
import './TemplateSelector.css';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column design with sidebar, skill bars, and timeline',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Gold-accented corporate layout for senior leadership',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Syntax-highlighted, terminal-style design for engineers',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant gradient hero with dot-based skill levels',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean whitespace with lightweight typography',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with serif fonts and clean dividers',
  },
];

export default function TemplateSelector() {
  const { state, dispatch } = useResume();

  const handleSelect = (templateId: any) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  return (
    <div className="template-selector">
      <h2 className="template-selector-title">Choose Template</h2>
      <div className="template-grid">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`template-card ${state.selectedTemplate === template.id ? 'active' : ''}`}
            onClick={() => handleSelect(template.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="template-card-preview">
              <div className={`mini-preview-bg ${template.id}`}>
                <div className="mini-line header" />
                <div className="mini-row">
                  <div className="mini-col side" />
                  <div className="mini-col main" />
                </div>
              </div>
              {state.selectedTemplate === template.id && (
                <div className="template-active-overlay">
                  <HiCheckCircle className="check-icon" />
                </div>
              )}
            </div>
            <div className="template-card-info">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-desc">{template.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
