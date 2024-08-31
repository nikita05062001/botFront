import React, { useRef, useEffect, useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import { Link } from "react-router-dom";

const DocumentPage = () => {
  const { user } = useTelegram();
  const items = useSelector((state) => state.equip);
  console.log(items);
  const sendPdfToTelegram = async (pdfBlob) => {
    const formData = new FormData();
    formData.append("document", pdfBlob, "document.pdf");
    const url = `https://api.telegram.org/bot7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8/sendDocument?chat_id=${
      user?.id || "989985866"
    }`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File sent to Telegram successfully");
      } else {
        const errorText = await response.text();
        console.error(
          "Error sending file to Telegram:",
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Error sending file to Telegram:", error);
    }
  };

  const handleDownloadAndSend = async () => {
    try {
      // Генерируем PDF-файл
      const blob = await pdf(<PDFFile value={items} />).toBlob();
      // Отправляем PDF в Telegram
      await sendPdfToTelegram(blob);
    } catch (error) {
      console.error("Error generating or sending PDF:", error);
    }
  };
  return (
    <div className="DocumentPage">
      <button onClick={handleDownloadAndSend}>Download and Send PDF</button>
      <Link to="/">Back</Link>
      {/* <PDFDownloadLink document={<PDFFile />} filename="FORM">
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink> */}
      {/* закоментировать PDFFile когда макет будет готов */}
      <PDFFile value={items} />
    </div>
  );
};

export default DocumentPage;
