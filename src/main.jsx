import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import AppContextProvider from "./context/AppContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProjectProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ProjectProvider>
  </BrowserRouter>
);