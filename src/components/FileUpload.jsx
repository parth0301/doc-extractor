import React, { useState } from 'react';
import ImageExtractor from './ImageExtractor';
import PdfExtractor from './PdfExtractor';

const FileUpload = ({ onExtractData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className="file-upload">
      <input type="file" accept=".pdf, image/*" onChange={handleFileChange} />
      {file && file.type === 'application/pdf' && (
        <PdfExtractor file={file} onExtractData={onExtractData} />
      )}
      {file && file.type.startsWith('image/') && (
        <ImageExtractor file={file} onExtractData={onExtractData} />
      )}
    </div>
  );
};

export default FileUpload;