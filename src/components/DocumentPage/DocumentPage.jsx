import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './DocumentPage.scss';

const DocumentPage = () => {
  const viewer = useRef(null);
  const instanceRef = useRef(null); // Ссылка для хранения экземпляра WebViewer

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
      insert_rows:[["1", "ev66", "усилек", "2", '28000', '56000'],["1", "ev66", "усилек", "2", '28000', '56000']]}
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

  const saveAsDocx = async () => {
    if (instanceRef.current) {
      const { documentViewer } = instanceRef.current.Core;
      const doc = documentViewer.getDocument();
      
      try {
        const docxArrayBuffer = await doc.saveDocument('docx');
        const blob = new Blob([docxArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: '90vh' }}></div>
      <button onClick={saveAsDocx} style={{ marginTop: '20px' }}>Save as DOCX</button>
    </div>
  );
};

export default DocumentPage;