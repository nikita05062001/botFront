import React, { useRef, useEffect, useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import { Link } from "react-router-dom";
import "./DocumentPage.scss";

const DocumentPage = () => {
  const { user } = useTelegram();
  const items = useSelector((state) => state.equip);
  const info = useSelector((state) => state.pdfinfo);
  const services = useSelector((state) => state.pdfservices);
  const conditions = useSelector((state) => state.pdfcondition);

  const itemsArr = Object.values(items);
  const servicesArr = Object.values(services);

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
      const blob = await pdf(
        <PDFFile
          value={items}
          place={info.adres}
          date={info.date}
          dateSign={info.dateSign}
          discount={info.discount}
          titleTable={info.title}
          miniDescription={info.description}
          services={services}
          conditions={conditions}
        />
      ).toBlob();
      // Отправляем PDF в Telegram
      await sendPdfToTelegram(blob);
    } catch (error) {
      console.error("Error generating or sending PDF:", error);
    }
  };
  return (
    <div className="DocumentPage">
      <div className="DocumentPage-content">
        <div className="DocumentPage-content-buttons">
          <button
            className="DocumentPage-content-buttons-pdf"
            onClick={handleDownloadAndSend}
          >
            Скачать PDF
          </button>
        </div>

        <Link className="DocumentPage-content-back" to="/">
          Back
        </Link>
      </div>

      {/* <PDFDownloadLink document={<PDFFile />} filename="FORM">
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink> */}

      <div className="DocumentPage-list">
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">Заголовок:</p>
          <p>{info.title}</p>
        </div>
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">Описание:</p>
          <p>{info.description}</p>
        </div>
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">Адрес:</p>
          <p>{info.adres}</p>
        </div>
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">Дата:</p>
          <p>{info.date}</p>
        </div>
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">
            Дата подписания договора:
          </p>
          <p>{info.dateSign}</p>
        </div>
        <div className="DocumentPage-list-item">
          <p className="DocumentPage-list-item-title">Скидка:</p>
          <p>{info.discount}</p>
        </div>
        <div className="DocumentPage-list-items">
          <div className="DocumentPage-list-items-equip">
            <p className="DocumentPage-list-items-equip-title">Оборудование:</p>
            {itemsArr.map((el, index) => (
              <div className="DocumentPage-list-items-equip-item" key={index}>
                <p>
                  {el.Наименование} x {el.count} штук
                </p>
              </div>
            ))}
          </div>
          <div className="DocumentPage-list-items-services">
            <p className="DocumentPage-list-items-services-title">Услуги:</p>
            {servicesArr.map((el, index) => (
              <div
                className="DocumentPage-list-items-services-item"
                key={index}
              >
                <p>{el.title}</p>
                <p>{el.description}</p>
                <p>{el.count}</p>
                <p>{el.price}</p>
              </div>
            ))}
          </div>
          <div className="DocumentPage-list-items-conditions">
            <p className="DocumentPage-list-items-conditions-title">Условия:</p>
            {conditions.map((el) => (
              <div
                className="DocumentPage-list-items-conditions-item"
                key={el.id}
              >
                <p>{el.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* закоментировать PDFFile когда макет будет готов */}
      {/* <PDFFile
        value={items}
        place={info.adres}
        date={info.date}
        dateSign={info.dateSign}
        discount={info.discount}
        titleTable={info.title}
        miniDescription={info.description}
        services={services}
        conditions={conditions}
      /> */}
    </div>
  );
};

export default DocumentPage;
