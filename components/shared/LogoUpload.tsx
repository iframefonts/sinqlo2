
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '../../constants';

interface LogoUploadProps {
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string; // e.g., '.svg'
  maxFileSize?: number; // in bytes
  instructions?: string;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  onFileUpload,
  acceptedFileTypes = 'image/svg+xml, .svg', // Updated: SVG only
  maxFileSize = 5 * 1024 * 1024, // 5MB
  instructions = 'SVG only - 5MB Limit', // Updated: SVG only
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError(null);
    setFileName(null);

    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];
      if (firstRejection.errors[0].code === 'file-too-large') {
        setError(`File is too large. Max size is ${maxFileSize / (1024*1024)}MB.`);
      } else if (firstRejection.errors[0].code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an SVG file.'); // Updated: SVG only
      } else {
        setError(firstRejection.errors[0].message);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileUpload(file);
    }
  }, [onFileUpload, maxFileSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/svg+xml': ['.svg'], // Updated: SVG only
    },
    maxSize: maxFileSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-brand-accent bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        ${error ? 'border-red-500' : ''}
      `}
    >
      <input {...getInputProps()} />
      <UploadIcon className={`w-12 h-12 mb-3 ${isDragActive ? 'text-brand-accent' : 'text-gray-400'}`} />
      {fileName ? (
        <p className="text-sm text-gray-700 font-medium">{fileName}</p>
      ) : isDragActive ? (
        <p className="text-sm text-brand-accent">Drop the file here ...</p>
      ) : (
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-brand-accent">Click to upload</span> or drag and drop
        </p>
      )}
      <p className="text-xs text-gray-400 mt-1">{instructions}</p>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LogoUpload;