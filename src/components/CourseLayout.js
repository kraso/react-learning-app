import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentViewer from './ContentViewer';

const CourseLayout = () => {
  const [currentPath, setCurrentPath] = useState('');

  if (!currentPath) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', height: '100vh' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Bienvenido al Curso de React</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Selecciona un tema en el menú lateral para comenzar.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
      <Sidebar 
        onSelectPath={(path) => setCurrentPath(path)} 
        activePath={currentPath} 
      />
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', borderLeft: '1px solid #eee' }}>
        <ContentViewer path={currentPath} />
      </div>
    </div>
  );
};

export default CourseLayout;
