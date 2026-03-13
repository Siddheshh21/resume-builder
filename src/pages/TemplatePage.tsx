import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { HiOutlineArrowRight } from 'react-icons/hi';
import './TemplatePage.css';

const allTemplates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'A contemporary two-column layout with a dark sidebar and teal accents. Great for tech roles.',
    image: 'modern',
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    description: 'Gold-accented corporate layout designed for senior leadership and management roles.',
    image: 'executive',
  },
  {
    id: 'developer',
    name: 'Developer Terminal',
    description: 'Syntax-highlighted, terminal-style design perfect for software engineers and devs.',
    image: 'developer',
  },
  {
    id: 'creative',
    name: 'Vibrant Creative',
    description: 'Vibrant gradient hero with dot-based skill levels for designers and creative pros.',
    image: 'creative',
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    description: 'An ultra-clean design with generous whitespace and lightweight typography.',
    image: 'minimal',
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'A timeless resume design with elegant serif fonts and clean structural dividers.',
    image: 'classic',
  },
];

export default function TemplatePage() {
  const navigate = useNavigate();
  const { dispatch } = useResume();

  const handleSelect = (id: any) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id });
    navigate('/editor');
  };

  return (
    <div className="template-page">
      <div className="template-page-header">
        <motion.h1
          className="tp-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Choose Your Template
        </motion.h1>
        <motion.p
          className="tp-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Select a professionally designed template to start building your resume.
          Each template is optimized for readability and ATS compatibility.
        </motion.p>
      </div>

      <div className="template-gallery">
        {allTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            className="template-gallery-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="tg-preview-container">
              <div className={`tg-mini-preview ${template.id}`}>
                <div className="tg-header" />
                <div className="tg-row">
                  <div className="tg-side" />
                  <div className="tg-main" />
                </div>
              </div>
              <div className="tg-overlay">
                <motion.button
                  className="tg-select-btn"
                  onClick={() => handleSelect(template.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use This Template
                </motion.button>
              </div>
            </div>
            <div className="tg-info">
              <h3 className="tg-name">{template.name}</h3>
              <p className="tg-desc">{template.description}</p>
              <button
                className="tg-link-btn"
                onClick={() => handleSelect(template.id)}
              >
                Start building
                <HiOutlineArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
