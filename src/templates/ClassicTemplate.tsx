import type { ResumeData } from '../types/resume';
import './ClassicTemplate.css';

interface Props {
  data: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function ClassicTemplate({ data }: Props) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="classic-template">
      {/* Header */}
      <div className="classic-header">
        <h1 className="classic-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="classic-title-text">{personalInfo.title || 'Professional Title'}</p>
        <div className="classic-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="classic-links">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="classic-section">
          <h2 className="classic-section-title">Professional Summary</h2>
          <div className="classic-divider" />
          <p className="classic-summary">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="classic-section">
          <h2 className="classic-section-title">Experience</h2>
          <div className="classic-divider" />
          {experiences.map((exp) => (
            <div key={exp.id} className="classic-entry">
              <div className="classic-entry-header">
                <div>
                  <h3 className="classic-entry-title">{exp.role || 'Position'}</h3>
                  <p className="classic-entry-subtitle">{exp.company || 'Company'}</p>
                </div>
                <p className="classic-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="classic-bullets">
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
        <div className="classic-section">
          <h2 className="classic-section-title">Education</h2>
          <div className="classic-divider" />
          {education.map((edu) => (
            <div key={edu.id} className="classic-entry">
              <div className="classic-entry-header">
                <div>
                  <h3 className="classic-entry-title">{edu.degree} in {edu.field}</h3>
                  <p className="classic-entry-subtitle">{edu.institution}</p>
                </div>
                <div className="classic-date-group">
                  <p className="classic-date">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="classic-gpa">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="classic-section">
          <h2 className="classic-section-title">Skills</h2>
          <div className="classic-divider" />
          <div className="classic-skills">
            {skills.map((skill) => (
              <span key={skill.id} className="classic-skill">{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="classic-section">
          <h2 className="classic-section-title">Projects</h2>
          <div className="classic-divider" />
          {projects.map((proj) => (
            <div key={proj.id} className="classic-entry">
              <div className="classic-entry-header">
                <h3 className="classic-entry-title">{proj.name}</h3>
                {proj.link && <p className="classic-link">{proj.link}</p>}
              </div>
              <p className="classic-description">{proj.description}</p>
              {proj.technologies.length > 0 && (
                <div className="classic-techs">
                  <span className="classic-tech-label">Technologies:</span>
                  {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
