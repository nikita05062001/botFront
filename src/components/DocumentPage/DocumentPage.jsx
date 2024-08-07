import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { saveAs } from 'file-saver';
import './DocumentPage.scss';
import { useTelegram } from '../../hooks/useTelegram';
import Document from '../Document/Document';
import { compile } from '@fileforge/react-print';
import { FileforgeClient } from '@fileforge/client';


const DocumentPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const generatePDF = async () => {
      try {
        // Сначала скомпилируйте React-компонент в HTML
        const HTML = await compile(<Document />);
        
        // Создайте экземпляр клиента Fileforge
        const ff = new FileforgeClient({
          apiKey: process.env.REACT_APP_FILEFORGE_API_KEY, // Убедитесь, что этот ключ правильно установлен
        });
        
        // Генерируйте PDF
        const pdf = await ff.pdf.generate(
          [
            new File([HTML], "index.html", { type: "text/html" }),
          ],
          {
            options: {
              host: true,
            },
          },
          {
            timeoutInSeconds: 30,
          }
        );

        // Установите URL PDF для отображения
        setPdfUrl(pdf.url);
      } catch (error) {
        console.error("Error during PDF conversion:", error);
      }
    };

    generatePDF();
  }, []);

  return (
    <div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p>Generating PDF...</p>
      )}
    </div>
  );
};

export default DocumentPage;