import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { ResumeData, ResumeAction } from '../types/resume';

const initialState: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Passionate software engineer with 8+ years of experience building scalable web applications and leading cross-functional teams. Expertise in React, TypeScript, and cloud architecture.',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
  },
  experiences: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: '',
      bullets: [
        'Led development of a microservices architecture serving 2M+ daily active users',
        'Mentored a team of 5 junior developers, improving code quality by 40%',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2020-12',
      current: false,
      description: '',
      bullets: [
        'Built responsive web applications using React and Node.js',
        'Designed RESTful APIs handling 500K+ requests per day',
        'Optimized database queries resulting in 3x performance improvement',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'MIT',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Advanced' },
    { id: '5', name: 'AWS', level: 'Advanced' },
    { id: '6', name: 'Docker', level: 'Intermediate' },
    { id: '7', name: 'GraphQL', level: 'Intermediate' },
    { id: '8', name: 'PostgreSQL', level: 'Advanced' },
  ],
  projects: [
    {
      id: '1',
      name: 'Cloud Dashboard',
      description: 'Real-time monitoring dashboard for cloud infrastructure with WebSocket integration.',
      technologies: ['React', 'TypeScript', 'WebSocket', 'D3.js'],
      link: 'github.com/johndoe/cloud-dashboard',
    },
  ],
  selectedTemplate: 'modern',
};

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'ADD_EXPERIENCE':
      return { ...state, experiences: [...state.experiences, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experiences: state.experiences.filter((exp) => exp.id !== action.payload) };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((edu) => edu.id !== action.payload) };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((skill) => skill.id !== action.payload) };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        ),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((proj) => proj.id !== action.payload) };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'LOAD_RESUME':
      return action.payload;
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
