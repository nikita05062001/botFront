import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { saveAs } from 'file-saver';
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

  const saveAndSendDocx = async () => {
    if (instanceRef.current) {
      const { documentViewer } = instanceRef.current.Core;
      const doc = documentViewer.getDocument();

      try {
        // Ожидание для применения всех значений шаблона
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 секунды задержки

        // Получите данные документа в формате ArrayBuffer
        const docArrayBuffer = await doc.getFileData({ downloadType: 'docx' });
        
        // Создайте Blob из ArrayBuffer
        const docBlob = new Blob([docArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Используйте file-saver для сохранения файла
        saveAs(docBlob, 'document.docx');
        
        console.log('File saved successfully');
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: '90vh' }}></div>
      <button onClick={saveAndSendDocx}>Save and Download as DOCX</button>
    </div>
  );
};

export default DocumentPage;