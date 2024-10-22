import React, { useState } from 'react';
import FileUpload from './components/FileUpload';

const App = () => {
  const [extractedData, setExtractedData] = useState(null);

  const handleExtractedData = (data) => {
    setExtractedData(data);
  };

  return (
    <div className="app-container">
      <h1>Document Data Extractor</h1>
      <FileUpload onExtractData={handleExtractedData} />
      {extractedData && (
        <div className="result">
          <h2>Extracted Data:</h2>
          <p><strong>Name:</strong> {extractedData.name}</p>
          <p><strong>Document Number:</strong> {extractedData.documentNumber}</p>
          <p><strong>Expiration Date:</strong> {extractedData.expirationDate}</p>
        </div>
      )}
    </div>
  );
};

export default App;