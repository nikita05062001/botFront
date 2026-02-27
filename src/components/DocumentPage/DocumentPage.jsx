import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import { useNavigate } from "react-router-dom"; // useNavigate лучше подходит для кнопок "Назад"
import "./DocumentPage.scss";

const DocumentPage = () => {
  const { user, tg } = useTelegram();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const items = useSelector((state) => state.equip);
  const info = useSelector((state) => state.pdfinfo);
  const services = useSelector((state) => state.pdfservices);
  const conditions = useSelector((state) => state.pdfcondition);

  const itemsArr = Object.values(items);
  const servicesArr = Object.values(services);

  const sendPdfToTelegram = async (pdfBlob) => {
    const formData = new FormData();
    formData.append(
      "document",
      pdfBlob,
      `Offer_${info.title || "document"}.pdf`,
    );

    // ВАЖНО: В продакшене лучше выносить токен на бэкенд
    const url = `https://api.telegram.org/bot7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8/sendDocument?chat_id=${user?.id || "989985866"}`;

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      if (response.ok) {
        tg.showAlert("Документ успешно отправлен в ваш чат!");
      } else {
        tg.showPopup({ message: "Ошибка при отправке файла." });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadAndSend = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
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
        />,
      ).toBlob();
      await sendPdfToTelegram(blob);
    } catch (error) {
      console.error(error);
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
        <button
          className={`btn-primary ${isSending ? "loading" : ""}`}
          onClick={handleDownloadAndSend}
          disabled={isSending}
        >
          {isSending ? "Генерация..." : "Отправить PDF"}
        </button>
      </div>

      <div className="document-page__content">
        <section className="tma-section">
          <h4 className="tma-section__title">Основная информация</h4>
          <div className="tma-cell">
            <span className="tma-cell__label">Заголовок</span>
            <span className="tma-cell__value">{info.title}</span>
          </div>
          <div className="tma-cell">
            <span className="tma-cell__label">Адрес</span>
            <span className="tma-cell__value">{info.adres}</span>
          </div>
          <div className="tma-cell">
            <span className="tma-cell__label">Дата</span>
            <span className="tma-cell__value">{info.date}</span>
          </div>
        </section>

        <section className="tma-section">
          <h4 className="tma-section__title">
            Оборудование ({itemsArr.length})
          </h4>
          {itemsArr.map((el, index) => (
            <div className="tma-cell" key={index}>
              <span className="tma-cell__value">{el.Наименование}</span>
              <span className="tma-cell__hint">{el.count} шт.</span>
            </div>
          ))}
        </section>

        <section className="tma-section">
          <h4 className="tma-section__title">Услуги</h4>
          {servicesArr.map((el, index) => (
            <div className="tma-cell tma-cell--multiline" key={index}>
              <div className="tma-cell__main">
                <span className="tma-cell__value">{el.title}</span>
                <span className="tma-cell__sub">{el.description}</span>
              </div>
              <span className="tma-cell__value">${el.price}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default DocumentPage;
