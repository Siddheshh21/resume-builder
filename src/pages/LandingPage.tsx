import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineDocumentText,
  HiOutlineTemplate,
  HiOutlineDownload,
  HiOutlineLightningBolt,
  HiOutlineColorSwatch,
  HiOutlineCube,
} from 'react-icons/hi';
import './LandingPage.css';

const features = [
  {
    icon: HiOutlineDocumentText,
    title: 'Intuitive Editor',
    description: 'Form-based sections with real-time validation and instant preview updates.',
  },
  {
    icon: HiOutlineTemplate,
    title: '6 Pro Templates',
    description: 'From minimal to executive - curated designs for every industry and career stage.',
  },
  {
    icon: HiOutlineDownload,
    title: 'One-Click Export',
    description: 'Download a pixel-perfect, print-ready PDF of your resume in seconds.',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Live Preview',
    description: 'Split-panel editor with side-by-side preview that updates as you type.',
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Crafted Design',
    description: 'Hand-tuned typography, spacing, and layouts that make your resume stand out.',
  },
  {
    icon: HiOutlineCube,
    title: 'Zero Setup',
    description: 'No sign-up, no friction. Open the editor and start building immediately.',
  },
];

/* Animated code lines for the hero decoration */
const codeLines = [
  { text: 'const resume = {', color: '#c4b5fd', indent: 0 },
  { text: '  name: "Your Name",', color: '#a5a5ba', indent: 1 },
  { text: '  title: "Software Engineer",', color: '#a5a5ba', indent: 1 },
  { text: '  skills: ["React", "TypeScript"],', color: '#fb923c', indent: 1 },
  { text: '  experience: [', color: '#a5a5ba', indent: 1 },
  { text: '    { role: "Lead Dev", years: 5 }', color: '#34d399', indent: 2 },
  { text: '  ]', color: '#a5a5ba', indent: 1 },
  { text: '};', color: '#c4b5fd', indent: 0 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Mesh gradient bg overlay */}
      <div className="hero-mesh" />

      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="eyebrow-dot" />
            <span>Trusted by developers & designers worldwide</span>
          </motion.div>

          <h1 className="hero-title">
            Build resumes that
            <br />
            <span className="hero-highlight">land interviews</span>
          </h1>

          <p className="hero-subtitle">
            A developer-grade resume builder with real-time editing, 
            professional templates, and one-click PDF export. 
            No account needed - just start building.
          </p>

          <div className="hero-actions">
            <motion.button
              className="hero-cta primary"
              onClick={() => navigate('/editor')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Editor
              <span className="cta-arrow">→</span>
            </motion.button>
            <motion.button
              className="hero-cta secondary"
              onClick={() => navigate('/templates')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Templates
            </motion.button>
          </div>


        </motion.div>

        {/* Advanced hero decoration */}
        <div className="hero-decoration">
          {/* Code editor mockup */}
          <motion.div
            className="code-editor"
            initial={{ opacity: 0, y: 40, rotateY: -8, rotateX: 4 }}
            animate={{ opacity: 1, y: 0, rotateY: -8, rotateX: 4 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="code-titlebar">
              <div className="code-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="code-filename">resume.ts</span>
            </div>
            <div className="code-body">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="code-line"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                >
                  <span className="line-num">{i + 1}</span>
                  <span style={{ color: line.color, paddingLeft: `${line.indent * 16}px` }}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              <motion.div
                className="code-cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </motion.div>

          {/* Resume preview card floating behind */}
          <motion.div
            className="preview-float-card"
            initial={{ opacity: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pf-header">
              <div className="pf-avatar" />
              <div className="pf-info">
                <div className="pf-name" />
                <div className="pf-role" />
              </div>
            </div>
            <div className="pf-section">
              <div className="pf-section-title" />
              <div className="pf-bar-row">
                <div className="pf-bar" style={{ width: '90%' }} />
                <div className="pf-bar" style={{ width: '75%' }} />
                <div className="pf-bar" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="pf-section">
              <div className="pf-section-title" />
              <div className="pf-line" style={{ width: '100%' }} />
              <div className="pf-line" style={{ width: '85%' }} />
              <div className="pf-line" style={{ width: '92%' }} />
            </div>
          </motion.div>

          {/* Floating stats badge */}
          <motion.div
            className="stats-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5, type: 'spring' }}
          >
            <span className="stats-icon">✓</span>
            <div>
              <div className="stats-value">ATS-Ready</div>
              <div className="stats-label">All templates</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="features-tag">Features</span>
          <h2 className="features-title">
            Everything to craft a
            <span className="hero-highlight"> winning resume</span>
          </h2>
          <p className="features-subtitle">No fluff, no bloat - just the tools you actually need.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h3 className="feature-name">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="cta-title">Start building in seconds</h2>
          <p className="cta-subtitle">No sign-up required. Your data stays in your browser.</p>
          <motion.button
            className="hero-cta primary"
            onClick={() => navigate('/editor')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Open the Editor
            <span className="cta-arrow">→</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
