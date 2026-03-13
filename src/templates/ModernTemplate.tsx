import type { ResumeData } from '../types/resume';
import './ModernTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function ModernTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="modern-template">
      <div className="modern-sidebar">
        <div className="modern-avatar">
          {(personalInfo.fullName || 'U').charAt(0)}
        </div>
        <h1 className="modern-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="modern-title">{personalInfo.title || 'Professional Title'}</p>

        <div className="modern-contact-section">
          <h3 className="modern-sidebar-heading">Contact</h3>
          {personalInfo.email && (
            <div className="modern-contact-item">
              <span className="modern-contact-icon">✉</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="modern-contact-item">
              <span className="modern-contact-icon">☎</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="modern-contact-item">
              <span className="modern-contact-icon">📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="modern-contact-item">
              <span className="modern-contact-icon">🔗</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="modern-contact-item">
              <span className="modern-contact-icon">🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="modern-skills-section">
            <h3 className="modern-sidebar-heading">Skills</h3>
            <div className="modern-skills-list">
              {skills.map((skill) => (
                <div key={skill.id} className="modern-skill-item">
                  <span className="modern-skill-name">{skill.name}</span>
                  <div className="modern-skill-bar">
                    <div
                      className="modern-skill-fill"
                      style={{
                        width: skill.level === 'Expert' ? '100%' :
                               skill.level === 'Advanced' ? '80%' :
                               skill.level === 'Intermediate' ? '60%' : '40%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="modern-main">
        {personalInfo.summary && (
          <div className="modern-section">
            <h2 className="modern-section-title">
              <span className="modern-section-accent" />
              About Me
            </h2>
            <p className="modern-summary">{personalInfo.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="modern-section">
            <h2 className="modern-section-title">
              <span className="modern-section-accent" />
              Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="modern-entry">
                <div className="modern-entry-dot" />
                <div className="modern-entry-content">
                  <div className="modern-entry-header">
                    <div>
                      <h3 className="modern-entry-role">{exp.role || 'Position'}</h3>
                      <p className="modern-entry-company">{exp.company || 'Company'}</p>
                    </div>
                    <span className="modern-date">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="modern-bullets">
                      {exp.bullets.filter(Boolean).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="modern-section">
            <h2 className="modern-section-title">
              <span className="modern-section-accent" />
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="modern-entry">
                <div className="modern-entry-dot" />
                <div className="modern-entry-content">
                  <div className="modern-entry-header">
                    <div>
                      <h3 className="modern-entry-role">{edu.degree} in {edu.field}</h3>
                      <p className="modern-entry-company">{edu.institution}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="modern-date">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                      {edu.gpa && <p className="modern-gpa">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="modern-section">
            <h2 className="modern-section-title">
              <span className="modern-section-accent" />
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="modern-entry">
                <div className="modern-entry-dot" />
                <div className="modern-entry-content">
                  <h3 className="modern-entry-role">{proj.name}</h3>
                  <p className="modern-description">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="modern-tech-tags">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="modern-tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.link && <p className="modern-project-link">{proj.link}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
