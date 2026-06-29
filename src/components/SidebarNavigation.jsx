import React from 'react';
import { courseContent } from '../data/courseContent';

const Sidebar = ({ onSelectPath, activePath }) => {
  return (
    <div style={{ width: '300px', padding: '20px', borderRight: '1px solid #ddd', height: '100vh', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Curso de React</h2>
      {courseContent.map((nivel) => (
        <div key={nivel.id} style={{ marginBottom: '30px' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '5px' }}>{nivel.title}</h3>
          {nivel.categories.map((categoria) => (
            <div key={categoria.id} style={{ marginLeft: '10px', marginBottom: '10px' }}>
              <h4 style={{ color: '#666', fontSize: '1rem' }}>{categoria.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {categoria.items.map((item) => (
                  <li 
                    key={item.id} 
                    style={{ 
                      padding: '8px', 
                      cursor: 'pointer', 
                      borderRadius: '4px',
                      backgroundColor: activePath === item.path ? '#e0e0e0' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#eee'}
                    onMouseLeave={(e) => {
                      if (activePath !== item.path) e.target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => onSelectPath(item.path)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
