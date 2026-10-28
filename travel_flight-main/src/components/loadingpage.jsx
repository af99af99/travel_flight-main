import React, { useEffect, useState } from 'react';

const loadingpage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return <h1 style={{ textAlign: 'center', marginTop: '20%' }}>Welcome to the App!</h1>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.airplaneContainer}>
        <div style={styles.airplane}>
          <div style={styles.contrail}></div>
        </div>
      </div>
      <p style={styles.text}>Preparing for takeoff...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom, #87ceeb, #ffffff)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  airplaneContainer: {
    position: 'relative',
    width: '100vw',
    overflow: 'hidden',
  },
  airplane: {
    position: 'absolute',
    top: '40%',
    left: '-50px',
    width: '50px',
    height: '50px',
    background: '#3498db',
    clipPath: 'polygon(50% 0%, 70% 40%, 100% 50%, 70% 60%, 50% 100%, 30% 60%, 0% 50%, 30% 40%)',
    animation: 'fly 3s infinite linear',
  },
  contrail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '5px',
    height: '100px',
    background: 'rgba(255, 255, 255, 0.7)',
    animation: 'fade 3s infinite linear',
  },
  text: {
    marginTop: '20px',
    fontSize: '20px',
  },
};

// Add animations
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  @keyframes fly {
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(100vw);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
document.head.appendChild(globalStyle);

export default loadingpage;
