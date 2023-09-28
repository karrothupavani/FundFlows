import React from 'react';

const App = () => {
  const circleStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
    animation: 'pulsate 2s ease-in-out infinite',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}></div>
    </div>
  );
};

export default App;

// CSS-in-JS
const styles = `
  @keyframes pulsate {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
