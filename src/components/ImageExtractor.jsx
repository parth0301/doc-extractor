import React, { useEffect } from 'react';
import Tesseract from 'tesseract.js';

const ImageExtractor = ({ file, onExtractData }) => {
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = e.target.result;
      const { data: { text } } = await Tesseract.recognize(image, 'eng');
      
      // Basic validation and extraction logic
      const nameMatch = text.match(/Name: (\w+ \w+)/i);
      const documentNumberMatch = text.match(/Document Number: (\w+)/i);
      const expirationDateMatch = text.match(/Expiration Date: (\d{2}\/\d{2}\/\d{4})/i);
      
      onExtractData({
        name: nameMatch ? nameMatch[1] : 'Not found',
        documentNumber: documentNumberMatch ? documentNumberMatch[1] : 'Not found',
        expirationDate: expirationDateMatch ? expirationDateMatch[1] : 'Not found',
      });
    };
    reader.readAsDataURL(file);
  }, [file, onExtractData]);

  return <div>Processing Image...</div>;
};

export default ImageExtractor;