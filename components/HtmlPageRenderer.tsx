'use client';

import { useEffect, useRef } from 'react';

interface HtmlPageRendererProps {
  html: string;
  styles?: string;
}

export default function HtmlPageRenderer({ html, styles }: HtmlPageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all script elements inside the loaded content
    const scripts = containerRef.current.querySelectorAll('script');
    
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Copy inline text content (code execution)
      newScript.textContent = oldScript.textContent;
      
      // Replace to force script loading and execution by browser
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
      <div 
        ref={containerRef} 
        dangerouslySetInnerHTML={{ __html: html }} 
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}
