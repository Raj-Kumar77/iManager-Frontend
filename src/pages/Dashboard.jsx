import React, { useState } from 'react';
import { ProjectProvider } from '../context/ProjectContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import KanbanBoard from '../components/KanbanBoard';

function Dashboard() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectVersion = (projectId, versionId) => {
    setSelectedVersion({ projectId, versionId });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = e.clientX;
      setSidebarWidth(Math.max(200, Math.min(newWidth, 600)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <ProjectProvider>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <div style={{ width: sidebarWidth, flexShrink: 0 }} className="relative">
            <Sidebar onSelectVersion={handleSelectVersion} />
            <div
              className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-100 ${
                isDragging ? 'bg-blue-500 opacity-100' : 'bg-gray-200 opacity-0'
              }`}
              onMouseDown={handleMouseDown}
            />
          </div>
          <main className="flex-1 overflow-auto bg-gray-100">
            {selectedVersion ? (
              <KanbanBoard
                projectId={selectedVersion.projectId}
                versionId={selectedVersion.versionId}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a project version to view the Kanban board
              </div>
            )}
          </main>
        </div>
        {isDragging && (
          <div className="fixed inset-0 z-50 cursor-col-resize" />
        )}
      </div>
    </ProjectProvider>
  );
}

export default Dashboard;