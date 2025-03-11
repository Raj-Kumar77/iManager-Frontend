import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import TaskCard from './TaskCard';
import TaskColumn from './TaskColumn';

const KanbanBoard = ({ projectId, versionId }) => {
  const { projects, assignees, addTask } = useProject();
  const [showNewTaskForm, setShowNewTaskForm] = useState(null);

  const project = projects.find(p => p.id === projectId);
  const version = project?.versions.find(v => v.id === versionId);
  const tasks = version?.tasks || [];

  const handleAddTask = (status) => {
    const task = {
      name: 'New Task',
      description: '',
      priority: 'medium',
      assignees: [],
      status
    };
    addTask(projectId, versionId, task);
    setShowNewTaskForm(null);
  };

  if (!project || !version) {
    return <div className="p-4">Select a project and version to view the board</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
          <p className="text-gray-600">Version: {version.name}</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {['todo', 'inprogress', 'done'].map(status => (
            <TaskColumn
              key={status}
              status={status}
              projectId={projectId}
              versionId={versionId}
            >
              {tasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    projectId={projectId}
                    versionId={versionId}
                    assignees={assignees}
                  />
                ))}
              <button
                onClick={() => handleAddTask(status)}
                className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg
                         text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Task
              </button>
            </TaskColumn>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;