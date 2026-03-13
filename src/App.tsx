import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import AppLayout from './components/Layout/AppLayout';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import TemplatePage from './pages/TemplatePage';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/templates" element={<TemplatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
