import { getDocument } from 'pdfjs-dist/build/pdf';
import React, { useEffect } from 'react';

const PdfExtractor = ({ file, onExtractData }) => {
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await getDocument(typedArray).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      
      const text = textContent.items.map(item => item.str).join(' ');
      
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
    reader.readAsArrayBuffer(file);
  }, [file, onExtractData]);

  return <div>Processing PDF...</div>;
};

export default PdfExtractor;