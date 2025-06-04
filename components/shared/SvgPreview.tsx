
import React from 'react';

interface SvgPreviewProps {
  svgString: string | null;
  className?: string;
  title?: string; // For accessibility
}

const SvgPreview: React.FC<SvgPreviewProps> = ({ svgString, className, title }) => {
  if (!svgString) {
    return (
      <div 
        className={`flex items-center justify-center text-gray-400 text-sm ${className || ''}`}
        role={title ? "img" : undefined}
        aria-label={title || "SVG preview area"}
      >
        No preview available.
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ maxWidth: '100%', maxHeight: '300px' }} // Example constraint
      dangerouslySetInnerHTML={{ __html: svgString }}
      role={title ? "img" : undefined} // Add role="img" if title is provided
      aria-label={title} // Use title for aria-label
    />
  );
};

export default SvgPreview;