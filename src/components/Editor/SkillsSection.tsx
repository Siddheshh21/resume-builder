import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { useResume } from '../../context/ResumeContext';
import type { Skill } from '../../types/resume';
import './EditorSection.css';

const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillsSection() {
  const { state, dispatch } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<Skill['level']>('Intermediate');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: newLevel,
    };
    dispatch({ type: 'ADD_SKILL', payload: skill });
    setNewSkill('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner': return '#94a3b8';
      case 'Intermediate': return '#3b82f6';
      case 'Advanced': return '#14b8a6';
      case 'Expert': return '#f59e0b';
    }
  };

  return (
    <motion.div
      className="editor-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="section-title">
        <span className="section-icon">⚡</span>
        Skills
      </h3>

      <div className="skills-input-row">
        <input
          type="text"
          className="form-input"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill..."
        />
        <select
          className="form-select"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value as Skill['level'])}
        >
          {skillLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <motion.button
          className="btn-add"
          onClick={addSkill}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add
        </motion.button>
      </div>

      <div className="skills-tags">
        <AnimatePresence mode="popLayout">
          {state.skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{ borderColor: getLevelColor(skill.level) }}
            >
              <span
                className="skill-level-dot"
                style={{ background: getLevelColor(skill.level) }}
              />
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}</span>
              <motion.button
                className="skill-remove"
                onClick={() => dispatch({ type: 'REMOVE_SKILL', payload: skill.id })}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <HiOutlineX />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
