import type { ResumeData } from '../types/resume';
import './ExecutiveTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function ExecutiveTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="exec-template">
      <div className="exec-header">
        <div className="exec-header-left">
          <h1 className="exec-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="exec-title">{personalInfo.title || 'Professional Title'}</p>
        </div>
        <div className="exec-header-right">
          {personalInfo.email && <div className="exec-contact-row">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="exec-contact-row">{personalInfo.phone}</div>}
          {personalInfo.location && <div className="exec-contact-row">{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="exec-contact-row">{personalInfo.linkedin}</div>}
        </div>
      </div>

      <div className="exec-gold-line" />

      {personalInfo.summary && (
        <div className="exec-section">
          <p className="exec-summary">{personalInfo.summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="exec-section">
          <h2 className="exec-section-title">Professional Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="exec-entry">
              <div className="exec-entry-top">
                <div>
                  <h3 className="exec-role">{exp.role || 'Position'}</h3>
                  <span className="exec-company">{exp.company || 'Company'}</span>
                </div>
                <span className="exec-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="exec-bullets">
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="exec-section">
          <h2 className="exec-section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="exec-entry">
              <div className="exec-entry-top">
                <div>
                  <h3 className="exec-role">{edu.degree} in {edu.field}</h3>
                  <span className="exec-company">{edu.institution}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</span>
                </div>
                <span className="exec-date">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="exec-bottom">
        {skills.length > 0 && (
          <div className="exec-section exec-skills-section">
            <h2 className="exec-section-title">Core Competencies</h2>
            <div className="exec-skills-grid">
              {skills.map((s) => (
                <span key={s.id} className="exec-skill">{s.name}</span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="exec-section">
            <h2 className="exec-section-title">Key Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="exec-entry">
                <h3 className="exec-role">{proj.name}</h3>
                <p className="exec-description">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
