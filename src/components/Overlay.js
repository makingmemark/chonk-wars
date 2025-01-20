import React from 'react';

export function Overlay({
  isPostProcessingEnabled,
  setIsPostProcessingEnabled,
  currentScene,
  setCurrentScene,
  quality,
  setQuality,
}) {
  const [forceActivated, setForceActivated] = React.useState(false);
  const [isSoundOn, setIsSoundOn] = React.useState(true);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/star-wars-style-march-165111.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleForceButton = () => {
    setForceActivated(true);
    if (isSoundOn && audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    if (audioRef.current) {
      if (!isSoundOn) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="overlay">
      {!forceActivated && (
        <div className="force-overlay" style={{ pointerEvents: 'auto' }}>
          <button
            className="force-button"
            onClick={handleForceButton}
          >
            Let the Chonk Be With You (Sound On)
          </button>
        </div>
      )}
      <header>
        <h1>
          <span>Chonk Wars</span>
        </h1>
        {/* <p>
          This is a demo of React Three Fiber using post processing with threejs
          and WebGPU, featuring Screen Space Reflections.
        </p> */}
      </header>
      <footer>
        <p className="footer-text">
          Originally by <a href="https://andersonmancini.dev" target="_blank" rel="noopener noreferrer">Anderson Mancini</a> | Updated by <a href="https://x.com/marka_eth" target="_blank" rel="noopener noreferrer">marka</a>
        </p>
        {/* <div className="footer-buttons">
          <button
            onClick={() => setIsPostProcessingEnabled(!isPostProcessingEnabled)}
          >
            {isPostProcessingEnabled ? "Disable" : "Enable"} Post Processing
          </button>
          <button
            className="toggle"
            onClick={() =>
              setCurrentScene(currentScene === "vader" ? "royal" : "vader")
            }
          >
            Toggle Scene
          </button>
          <button
            onClick={() =>
              setQuality(quality === "default" ? "high" : "default")
            }
            className="toggle-quality"
          >
            {quality === "default" ? "Higher Quality" : "Performance Mode"}
          </button>
        </div> */}
        {/* <a
          href="https://github.com/ektogamat/r3f-webgpu-starter"
          download
          className="download-button"
        >
          <SvgIcon />
        </a> */}
      </footer>
      <button
        className="sound-toggle"
        onClick={toggleSound}
        style={{
          pointerEvents: 'auto',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          opacity: 0.3,
          cursor: 'pointer',
          fontSize: '0.6rem',
        }}
      >
        Sound {isSoundOn ? 'Off' : 'On'}
      </button>
    </div>
  );
}

const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
  >
    <path
      d="m20.59 12-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4A1 1 0 0 1 6.7 8.7zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48z"
      className="heroicon-ui"
    ></path>
  </svg>
);
