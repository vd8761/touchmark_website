'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Hide loader once document is fully loaded
    const handleLoad = () => {
      setFade(true);
      setTimeout(() => setVisible(false), 300);
    };

    if (document.readyState === 'complete') {
      setFade(true);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout to ensure loader goes away in case load event already fired
      const timer = setTimeout(() => {
        setFade(true);
        setTimeout(() => setVisible(false), 300);
      }, 800);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div 
      id="loader-wrapper" 
      style={{ 
        opacity: fade ? 0 : 1, 
        visibility: fade ? 'hidden' : 'visible', 
        transition: 'opacity 300ms ease-out, visibility 300ms ease-out' 
      }}
    >
      <div className="loader"></div>
      <style jsx global>{`
        #loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loader {
          width: 20px;
          aspect-ratio: 1;
          background: #1692C8;
          box-shadow: 0 0 60px 15px #1692C8;
          transform: translate(-80px);
          clip-path: inset(0);
          animation:
            l4-1 0.5s ease-in-out infinite alternate,
            l4-2 1s ease-in-out infinite;
        }

        @keyframes l4-1 {
          100% { transform: translateX(80px); }
        }

        @keyframes l4-2 {
          33% { clip-path: inset(0 0 0 -100px); }
          50% { clip-path: inset(0 0 0 0); }
          83% { clip-path: inset(0 -100px 0 0); }
        }
      `}</style>
    </div>
  );
}

