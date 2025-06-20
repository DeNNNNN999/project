import React from 'react';

const TestBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0"
      style={{
        zIndex: 0, // Изменяем на 0 вместо -1
        background: 'linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #4a00ff 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};

export default TestBackground;