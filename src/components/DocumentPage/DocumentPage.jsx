import React, { useRef, useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(true)
  const [showLoad, setShowLoad] = useState(false)
  const [status, setStatus] = useState('запустите')

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
  
        // Create a FormData object
        const formData = new FormData();
        formData.append('document', pdfBlob, 'document.pdf');
  
        // Construct the URL with the bot token and chat ID
        const url = `https://api.telegram.org/bot7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8/sendDocument?chat_id=${user?.id || '989985866'}`;
  
        // Send the document to Telegram
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          setLoading(false)
          console.log('File sent to Telegram successfully');
          setStatus('успешно')
        } else {
          const errorText = await response.text();
          setStatus(errorText)
          console.error('Error sending file to Telegram:', response.statusText, errorText);
        }
      } catch (error) {
        setStatus(error)
        console.error('Error generating PDF:', error);
      }
    }
  };

  return (
    <div className="App">
       <p onClick={() => {
        saveAndSendPdf()
        setShowLoad(true)
       }} onTouchStart={saveAndSendPdf} onTouchEnd={saveAndSendPdf}>Save and Send as PDF</p>
      {showLoad ? <p>{loading ? "пошла загрузка" : "завершено"}</p> : ""} 
      <p>{status}</p>
      <div className="webviewer" ref={viewer} style={{ height: '90vh' }}></div>
    </div>
  );
};

export default DocumentPage;