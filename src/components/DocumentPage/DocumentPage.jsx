import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { saveAs } from 'file-saver';
import './DocumentPage.scss';
import { useTelegram } from '../../hooks/useTelegram';


const DocumentPage = () => {
  const viewer = useRef(null);
  const instanceRef = useRef(null);
  const { user } = useTelegram();
  const jsonData = {
    date: 'Test',
    title: 'Test',
    place: 'place',
    mini_description: 'test',
    price_equip: '188000',
    discount: '20',
    price_service: '34000',
    price_all: '200000',
    items_equip: {
      insert_rows: [
        ["1", "ev66", "усилек", "2", '28000', '56000'],
        ["1", "ev66", "усилек", "2", '28000', '56000']
      ]
    }
  };

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/document1.docx',
        licenseKey: 'your_license_key',
      },
      viewer.current,
    ).then((instance) => {
      instanceRef.current = instance;
      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('documentLoaded', async () => {
        const doc = documentViewer.getDocument();
        
        try {
          await doc.applyTemplateValues(jsonData);
          console.log('Template values applied successfully');
        } catch (error) {
          console.error('Error applying template values:', error);
        }
      });
    });
  }, []);

  const saveAndSendPdf = async () => {
    if (instanceRef.current) {
      const { documentViewer } = instanceRef.current.Core;
      const doc = documentViewer.getDocument();
  
      try {
        // Wait for all template values to be applied
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
  
        // Get PDF data
        const pdfArrayBuffer = await doc.getFileData({ downloadType: 'pdf' });
  
        // Create a Blob from ArrayBuffer
        const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
  
        // Send the PDF Blob to the server
        const formData = new FormData();
        formData.append('file', pdfBlob, 'document.pdf');
        formData.append('chatId', user?.id || '989985866');
  
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
  
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('File sent to server successfully');
        } else {
          console.error('Error sending file to server:', response.statusText);
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: '90vh' }}></div>
      <button onClick={saveAndSendPdf}>Save and Send as PDF</button>
    </div>
  );
};

export default DocumentPage;