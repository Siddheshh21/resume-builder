import type { ResumeData } from '../types/resume';
import './MinimalTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function MinimalTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="minimal-template">
      {/* Header */}
      <div className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="minimal-meta">
          {personalInfo.title && <span className="minimal-title-text">{personalInfo.title}</span>}
          {personalInfo.location && <span className="minimal-location">{personalInfo.location}</span>}
        </div>
        <div className="minimal-contact">
          {personalInfo.email && <a className="minimal-contact-link">{personalInfo.email}</a>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <a className="minimal-contact-link">{personalInfo.linkedin}</a>}
          {personalInfo.website && <a className="minimal-contact-link">{personalInfo.website}</a>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="minimal-section">
          <p className="minimal-summary">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="minimal-entry">
              <div className="minimal-entry-top">
                <span className="minimal-role">{exp.role || 'Position'}</span>
                <span className="minimal-date-line">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <span className="minimal-company">{exp.company || 'Company'}</span>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="minimal-bullets">
                  {exp.bullets.filter(Boolean).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="minimal-entry">
              <div className="minimal-entry-top">
                <span className="minimal-role">
                  {edu.degree} in {edu.field}
                </span>
                <span className="minimal-date-line">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <span className="minimal-company">
                {edu.institution}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Skills</h2>
          <p className="minimal-skills-line">
            {skills.map((s) => s.name).join('  ·  ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="minimal-entry">
              <div className="minimal-entry-top">
                <span className="minimal-role">{proj.name}</span>
                {proj.link && <span className="minimal-link">{proj.link}</span>}
              </div>
              <p className="minimal-entry-desc">{proj.description}</p>
              {proj.technologies.length > 0 && (
                <p className="minimal-techs">{proj.technologies.join(' · ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
