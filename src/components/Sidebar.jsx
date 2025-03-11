import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

const Sidebar = ({ onSelectVersion }) => {
  const { projects, assignees, addProject, addVersion, addAssignee } = useProject();
  const [newProjectName, setNewProjectName] = useState('');
  const [newAssigneeName, setNewAssigneeName] = useState('');
  const [expandedProject, setExpandedProject] = useState(null);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      addProject(newProjectName);
      setNewProjectName('');
    }
  };

  const handleAddVersion = (projectId, versionName) => {
    if (versionName.trim()) {
      addVersion(projectId, versionName);
    }
  };

  const handleAddAssignee = (e) => {
    e.preventDefault();
    if (newAssigneeName.trim()) {
      addAssignee(newAssigneeName);
      setNewAssigneeName('');
    }
  };

  return (
    <div className="h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <form onSubmit={handleAddProject} className="mb-6">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New Project Name"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </form>

        <div className="space-y-2">
          {projects.map(project => (
            <div key={project.id} className="border rounded-md bg-white">
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className="w-full px-4 py-2 text-left font-medium flex items-center justify-between"
              >
                {project.name}
                <Plus className="h-4 w-4" />
              </button>
              {expandedProject === project.id && (
                <div className="p-2 border-t">
                  {project.versions.map(version => (
                    <button
                      key={version.id}
                      onClick={() => onSelectVersion(project.id, version.id)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      {version.name}
                    </button>
                  ))}
                  <input
                    type="text"
                    placeholder="New Version Name"
                    className="w-full mt-2 px-3 py-1 border rounded-md text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddVersion(project.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" /> Assignees
          </h3>
          <div className="space-y-1">
            {assignees.map(assignee => (
              <div key={assignee} className="text-sm px-2 py-1 bg-gray-100 rounded">
                {assignee}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleAddAssignee}>
          <input
            type="text"
            value={newAssigneeName}
            onChange={(e) => setNewAssigneeName(e.target.value)}
            placeholder="New Assignee Name"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Assignee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;