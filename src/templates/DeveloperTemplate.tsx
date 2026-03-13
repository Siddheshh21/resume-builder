import type { ResumeData } from '../types/resume';
import './DeveloperTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function DeveloperTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="dev-template">
      <div className="dev-header">
        <div className="dev-info-left">
          <h1 className="dev-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="dev-title">{personalInfo.title || 'Professional Title'}</p>
        </div>
        <div className="dev-contact-right">
          {personalInfo.email && <div className="dev-contact-item">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="dev-contact-item">{personalInfo.phone}</div>}
          {personalInfo.location && <div className="dev-contact-item">{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="dev-contact-item dev-link">{personalInfo.linkedin}</div>}
        </div>
      </div>

      <div className="dev-divider" />

      <div className="dev-body">
        <div className="dev-main-content">
          {personalInfo.summary && (
            <div className="dev-section">
              <h2 className="dev-section-title">
                <span className="dev-label">SUMMARY</span>
              </h2>
              <p className="dev-text">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="dev-section">
              <h2 className="dev-section-title">
                <span className="dev-label">EXPERIENCE</span>
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="dev-entry">
                  <div className="dev-entry-header">
                    <h3 className="dev-entry-role">{exp.role}</h3>
                    <span className="dev-entry-date">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="dev-entry-company">{exp.company}</div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="dev-bullets">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div className="dev-section">
              <h2 className="dev-section-title">
                <span className="dev-label">PROJECTS</span>
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="dev-entry">
                  <div className="dev-entry-header">
                    <h3 className="dev-entry-role">{proj.name}</h3>
                    {proj.link && <span className="dev-link">{proj.link}</span>}
                  </div>
                  <p className="dev-text">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="dev-tech-row">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="dev-tech-tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dev-sidebar">
          {skills.length > 0 && (
            <div className="dev-section">
              <h2 className="dev-section-title">
                <span className="dev-label">SKILLS</span>
              </h2>
              <div className="dev-skills-list">
                {skills.map((s) => (
                  <div key={s.id} className="dev-skill-item">
                    <div className="dev-skill-name">{s.name}</div>
                    <div className="dev-skill-level-text">{s.level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="dev-section">
              <h2 className="dev-section-title">
                <span className="dev-label">EDUCATION</span>
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="dev-edu-entry">
                  <div className="dev-edu-degree">{edu.degree}</div>
                  <div className="dev-edu-field">{edu.field}</div>
                  <div className="dev-edu-school">{edu.institution}</div>
                  <div className="dev-edu-date">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
