import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineTemplate,
  HiOutlineDownload,
} from 'react-icons/hi';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: HiOutlineHome, label: 'Home' },
  { path: '/editor', icon: HiOutlineDocumentText, label: 'Editor' },
  { path: '/templates', icon: HiOutlineTemplate, label: 'Templates' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.nav
      className="sidebar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sidebar-logo">
        <motion.div
          className="logo-mark"
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="logo-letter">P</span>
        </motion.div>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="sidebar-link">
              <motion.div
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {isActive && (
                  <motion.div
                    className="sidebar-active-bg"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon className="sidebar-icon" />
                <span className="sidebar-label">{item.label}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/editor" className="sidebar-link">
          <motion.div
            className="sidebar-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineDownload className="sidebar-icon" />
          </motion.div>
        </NavLink>
      </div>
    </motion.nav>
  );
}
