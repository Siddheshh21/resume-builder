import { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import ExportButton from '../Export/ExportButton';
import ClassicTemplate from '../../templates/ClassicTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import ExecutiveTemplate from '../../templates/ExecutiveTemplate';
import DeveloperTemplate from '../../templates/DeveloperTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';
import './ResumePreview.css';

export default function ResumePreview() {
  const { state } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (state.selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={state} />;
      case 'modern':
        return <ModernTemplate data={state} />;
      case 'minimal':
        return <MinimalTemplate data={state} />;
      case 'executive':
        return <ExecutiveTemplate data={state} />;
      case 'developer':
        return <DeveloperTemplate data={state} />;
      case 'creative':
        return <CreativeTemplate data={state} />;
      default:
        return <ModernTemplate data={state} />;
    }
  };

  return (
    <div className="resume-preview-container">
      <div className="preview-header">
        <h2 className="preview-title">Live Preview</h2>
        <ExportButton resumeRef={resumeRef} />
      </div>

      <div className="preview-scroll">
        <div className="preview-page" ref={resumeRef}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
