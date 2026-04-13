import React, { useState } from "react";
import { pdf, Font } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import EquipmentListPDF from "../EquipmentListPDF/EquipmentListPDF";
import { useNavigate } from "react-router-dom";
import "./DocumentPage.scss";

// Регистрация шрифтов
import CalibriRegular from "../../fonts/calibri.ttf";
import CalibriBold from "../../fonts/calibriBold.ttf";

Font.register({ family: "Calibri", src: CalibriRegular });
Font.register({ family: "CalibriBold", src: CalibriBold });

const DocumentPage = () => {
  const { user, tg } = useTelegram();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const items = useSelector((state) => state.equip);
  const info = useSelector((state) => state.pdfinfo);
  const services = useSelector((state) => state.pdfservices);
  const conditions = useSelector((state) => state.pdfcondition);

  const itemsArr = Object.values(items);

  const notify = (message) => {
    if (tg.isVersionAtLeast("6.2")) {
      tg.showAlert(message);
    } else {
      alert(message);
    }
  };

  const sendPdfToTelegram = async (pdfBlob, fileName) => {
    const formData = new FormData();
    formData.append("document", pdfBlob, fileName);

    const botToken = "7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8";
    const chatId = user?.id || "989985866";
    const url = `https://api.telegram.org/bot${botToken}/sendDocument?chat_id=${chatId}`;

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      if (response.ok) {
        notify("Документ успешно отправлен!");
      } else {
        notify("Ошибка API Telegram.");
      }
    } catch (error) {
      notify("Ошибка сети.");
    }
  };

  const handleGenerate = async (type) => {
    if (isSending) return;
    setIsSending(true);

    try {
      let doc;
      let fileName = "";

      if (type === "offer") {
        fileName = `Offer_${info.title || "Doc"}.pdf`;
        doc = (
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
        );
      } else {
        fileName = `List_${info.title || "Equipment"}.pdf`;
        doc = (
          <EquipmentListPDF
            value={items}
            place={info.adres}
            date={info.date}
            titleTable={info.title}
          />
        );
      }

      const blob = await pdf(doc).toBlob();
      await sendPdfToTelegram(blob, fileName);
    } catch (error) {
      console.error(error);
      notify("Ошибка при генерации PDF.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="document-page">
      <div className="document-page__header">
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Назад
        </button>
        <div className="document-page__actions">
          <button
            className={`btn-primary ${isSending ? "loading" : ""}`}
            onClick={() => handleGenerate("offer")}
            disabled={isSending}
          >
            {isSending ? "..." : "Коммерческое"}
          </button>
          <button
            className={`btn-primary btn-list ${isSending ? "loading" : ""}`}
            onClick={() => handleGenerate("list")}
            disabled={isSending}
          >
            {isSending ? "..." : "Список оборудования"}
          </button>
        </div>
      </div>

      <div className="document-page__content">
        <section className="tma-section">
          <h4 className="tma-section__title">Основная информация</h4>
          <div className="tma-cell">
            <span className="tma-cell__label">Заголовок</span> {info.title}
          </div>
          <div className="tma-cell">
            <span className="tma-cell__label">Адрес</span> {info.adres}
          </div>
        </section>

        <section className="tma-section">
          <h4 className="tma-section__title">
            Оборудование ({itemsArr.length})
          </h4>
          {itemsArr.map((el, index) => (
            <div className="tma-cell" key={index}>
              <span>{el.Наименование}</span>
              <span className="tma-cell__hint">{el.count} шт.</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default DocumentPage;
