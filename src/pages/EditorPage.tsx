import ResumeEditor from '../components/Editor/ResumeEditor';
import ResumePreview from '../components/Preview/ResumePreview';
import TemplateSelector from '../components/Templates/TemplateSelector';
import './EditorPage.css';

export default function EditorPage() {
  return (
    <div className="editor-page">
      <div className="editor-panel">
        <div className="editor-panel-inner">
          <TemplateSelector />
          <ResumeEditor />
        </div>
      </div>
      <div className="preview-panel">
        <ResumePreview />
      </div>
    </div>
  );
}
