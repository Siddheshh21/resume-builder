import PersonalInfo from './PersonalInfo';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import './ResumeEditor.css';

export default function ResumeEditor() {
  return (
    <div className="resume-editor">
      <div className="editor-header">
        <h2 className="editor-title">Resume Editor</h2>
        <p className="editor-subtitle">Fill in your details to build your professional resume</p>
      </div>
      <div className="editor-sections">
        <PersonalInfo />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
      </div>
    </div>
  );
}
