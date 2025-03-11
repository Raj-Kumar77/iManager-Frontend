import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const addProject = (name) => {
    setProjects(prev => [...prev, { id: uuidv4(), name, versions: [] }]);
  };

  const addVersion = (projectId, versionName) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          versions: [...project.versions, { id: uuidv4(), name: versionName, tasks: [] }]
        };
      }
      return project;
    }));
  };

  const addTask = (projectId, versionId, task) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          versions: project.versions.map(version => {
            if (version.id === versionId) {
              return {
                ...version,
                tasks: [...version.tasks, { ...task, id: uuidv4() }]
              };
            }
            return version;
          })
        };
      }
      return project;
    }));
  };

  const updateTask = (projectId, versionId, updatedTask) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          versions: project.versions.map(version => {
            if (version.id === versionId) {
              return {
                ...version,
                tasks: version.tasks.map(task => 
                  task.id === updatedTask.id ? updatedTask : task
                )
              };
            }
            return version;
          })
        };
      }
      return project;
    }));
  };

  const deleteTask = (projectId, versionId, taskId) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          versions: project.versions.map(version => {
            if (version.id === versionId) {
              return {
                ...version,
                tasks: version.tasks.filter(task => task.id !== taskId)
              };
            }
            return version;
          })
        };
      }
      return project;
    }));
  };

  const moveTask = (projectId, versionId, taskId, newStatus) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          versions: project.versions.map(version => {
            if (version.id === versionId) {
              return {
                ...version,
                tasks: version.tasks.map(task => 
                  task.id === taskId ? { ...task, status: newStatus } : task
                )
              };
            }
            return version;
          })
        };
      }
      return project;
    }));
  };

  const addAssignee = (name) => {
    setAssignees(prev => [...prev, name]);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      assignees,
      addProject,
      addVersion,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      addAssignee
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};