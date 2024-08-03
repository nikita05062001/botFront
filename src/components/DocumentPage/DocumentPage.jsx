import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './DocumentPage.scss';

const DocumentPage = ({ chatId }) => {
  const viewer = useRef(null);
  const instanceRef = useRef(null);

  const jsonData = {
    date: 'Test',
    title: 'Test',
    place: 'place',
    mini_description: 'test',
    price_equip: '188000',
    discount : '20',
    price_service: '34000',
    price_all: '200000',
    items_equip: {
      insert_rows:[["1", "ev66", "усилек", "2", '28000', '56000'],["1", "ev66", "усилек", "2", '28000', '56000']]
    }
  };

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/document1.docx',
        licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
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

  const saveAndSendDocx = async () => {
    if (instanceRef.current) {
      const { documentViewer } = instanceRef.current.Core;
      const doc = documentViewer.getDocument();
      
      try {
        const docxArrayBuffer = await doc.saveDocument('docx');
        const base64String = btoa(String.fromCharCode(...new Uint8Array(docxArrayBuffer)));
        
        const response = await fetch('http://localhost:3001/save-docx', {  // Изменено на порт 3001
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileContent: base64String, chatId }),
        });

        if (response.ok) {
          console.log('File sent successfully');
        } else {
          console.error('Error sending file');
        }
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: '90vh' }}></div>
      <button onClick={saveAndSendDocx}>Save and Send as DOCX</button>
    </div>
  );
};

export default DocumentPage;