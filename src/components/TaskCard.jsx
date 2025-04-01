import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Edit2, Trash2 } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { MultiSelect } from "react-multi-select-component";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {children}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-2 py-1 rounded text-gray-600 hover:text-gray-800 border">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, projectId, versionId, assignees }) => {
  const { updateTask, deleteTask, moveTask } = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [assigneeInput, setAssigneeInput] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);

  const populateAssigneeOptions = () => {
    const options = assignees?.map(assignee => ({
      label: assignee.name,
      value: assignee.email
    }));
    setAssigneeOptions(options || []);
  };

  useEffect(() => {
    populateAssigneeOptions();
  }, [assignees]);

  useEffect(() => {
    if (isEditing) {
      setAssigneeInput(task.assignees?.map(email => assigneeOptions.find(option => option.value === email))?.filter(Boolean) || []);
    }
  }, [isEditing, task, assigneeOptions]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, projectId, versionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    const updatedTask = {
      ...editedTask,
      assignees: assigneeInput.map((assignee) => assignee.value)
    };

    updateTask(projectId, versionId, updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(projectId, versionId, task.id);
  };

  const handleStatusChange = (newStatus) => {
    moveTask(projectId, versionId, task.id, newStatus);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <div
        ref={drag}
        className={`p-4 bg-white rounded-lg shadow-md border border-gray-200 ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{task.name}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        {task.assignees?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.assignees?.map((email, index) => {
              const assignee = assignees?.find(a => a.email === email);
              return assignee ? (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {assignee.name}
                </span>
              ) : null;
            })}
          </div>
        )}
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <CustomModal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <input
          type="text"
          value={editedTask.name}
          onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          className="w-full mb-2 px-2 py-1 border rounded"
          placeholder="Task name"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full mb-2 px-2 py-1 border rounded"
          placeholder="Task description"
        />
        <select
          value={editedTask.priority}
          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
          className="w-full mb-2 px-2 py-1 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <MultiSelect
          options={assigneeOptions}
          value={assigneeInput}
          onChange={setAssigneeInput}
          labelledBy="Select"
          className='py-0'
        />
        <textarea
          className="w-full mb-2 px-2 py-1 border rounded mt-2"
          placeholder="Comment"
        />
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default TaskCard;