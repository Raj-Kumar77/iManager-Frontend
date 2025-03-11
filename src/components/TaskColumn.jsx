import React from 'react';
import { useDrop } from 'react-dnd';
import { useProject } from '../context/ProjectContext';

const TaskColumn = ({ status, children, projectId, versionId }) => {
  const { moveTask } = useProject();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      moveTask(item.projectId, item.versionId, item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const columnTitles = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };

  return (
    <div
      ref={drop}
      className={`bg-gray-50 p-4 rounded-lg ${isOver ? 'bg-blue-50' : ''}`}
    >
      <h3 className="text-lg font-medium mb-4">{columnTitles[status]}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default TaskColumn;