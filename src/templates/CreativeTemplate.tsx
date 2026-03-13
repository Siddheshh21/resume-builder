import type { ResumeData } from '../types/resume';
import './CreativeTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="creative-template">
      <div className="creative-header">
        <div className="creative-header-content">
          <h1 className="creative-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="creative-title">{personalInfo.title || 'Professional Title'}</p>
          <div className="creative-contact-row">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div className="creative-body">
        <div className="creative-main">
          {personalInfo.summary && (
            <div className="creative-section">
              <h2 className="creative-section-title">PROFILE</h2>
              <div className="creative-section-underline" />
              <p className="creative-text">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="creative-section">
              <h2 className="creative-section-title">EXPERIENCE</h2>
              <div className="creative-section-underline" />
              {experiences.map((exp) => (
                <div key={exp.id} className="creative-entry">
                  <div className="creative-entry-header">
                    <h3 className="creative-entry-role">{exp.role}</h3>
                    <span className="creative-date">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="creative-company-line">{exp.company}</div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="creative-bullets">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div className="creative-section">
              <h2 className="creative-section-title">KEY PROJECTS</h2>
              <div className="creative-section-underline" />
              {projects.map((proj) => (
                <div key={proj.id} className="creative-entry">
                  <div className="creative-entry-header">
                    <h3 className="creative-entry-role">{proj.name}</h3>
                    {proj.link && <span className="creative-link">{proj.link}</span>}
                  </div>
                  <p className="creative-text" style={{ marginTop: 4 }}>{proj.description}</p>
                  <div className="creative-tech-tags">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="creative-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="creative-sidebar">
          {skills.length > 0 && (
            <div className="creative-section">
              <h2 className="creative-section-title">SKILLS</h2>
              <div className="creative-section-underline" />
              <div className="creative-skills-grid">
                {skills.map((s) => (
                  <div key={s.id} className="creative-skill-row">
                    <span className="creative-skill-name">{s.name}</span>
                    <div className="creative-skill-bars">
                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i} 
                          className={`creative-skill-segment ${i <= (s.level === 'Expert' ? 4 : s.level === 'Advanced' ? 3 : s.level === 'Intermediate' ? 2 : 1) ? 'filled' : ''}`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="creative-section">
              <h2 className="creative-section-title">EDUCATION</h2>
              <div className="creative-section-underline" />
              {education.map((edu) => (
                <div key={edu.id} className="creative-edu-item">
                  <div className="creative-edu-degree">{edu.degree}</div>
                  <div className="creative-edu-field">{edu.field}</div>
                  <div className="creative-edu-school">{edu.institution}</div>
                  <div className="creative-edu-date">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
