import React, { useState } from "react";
import { pdf, Font } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import { useNavigate } from "react-router-dom";
import "./DocumentPage.scss";

// Импорт шрифтов (убедитесь, что пути верны)
import CalibriRegular from "../../fonts/calibri.ttf";
import CalibriBold from "../../fonts/calibriBold.ttf";
import CalibriItalic from "../../fonts/calibriItalic.ttf";
import CalibriBoldItalic from "../../fonts/calibriBoldItalic.ttf";

// Регистрация шрифтов для react-pdf
Font.register({
  family: "Calibri",
  src: CalibriRegular,
});
Font.register({
  family: "CalibriBold",
  src: CalibriBold,
});
Font.register({
  family: "CalibriItalic",
  src: CalibriItalic,
});
Font.register({
  family: "CalibriBoldItalic",
  src: CalibriBoldItalic,
});

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

  // Универсальная функция уведомлений с проверкой версии Telegram
  const notify = (message) => {
    if (tg.isVersionAtLeast("6.2")) {
      tg.showAlert(message);
    } else {
      alert(message); // Запасной вариант для старых версий (6.0)
    }
  };

  const sendPdfToTelegram = async (pdfBlob) => {
    const formData = new FormData();
    formData.append(
      "document",
      pdfBlob,
      `Offer_${info.title || "document"}.pdf`,
    );

    // Токен бота (в идеале вынести на бэкенд)
    const botToken = "7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8";
    const chatId = user?.id || "989985866";
    const url = `https://api.telegram.org/bot${botToken}/sendDocument?chat_id=${chatId}`;

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      if (response.ok) {
        notify("Документ успешно отправлен в ваш чат!");
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        notify("Ошибка API при отправке файла.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      notify("Сетевая ошибка при отправке.");
    }
  };

  const handleDownloadAndSend = async () => {
    if (isSending) return;
    setIsSending(true);

    try {
      // Создаем компонент документа
      const doc = (
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

      // Генерируем Blob
      const blob = await pdf(doc).toBlob();

      // Отправляем
      await sendPdfToTelegram(blob);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      notify("Ошибка при создании PDF. Проверьте консоль браузера.");
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

        {servicesArr.length > 0 && (
          <section className="tma-section">
            <h4 className="tma-section__title">Услуги</h4>
            {servicesArr.map((el, index) => (
              <div className="tma-cell tma-cell--multiline" key={index}>
                <div className="tma-cell__main">
                  <span className="tma-cell__value">{el.title}</span>
                  <span className="tma-cell__sub">{el.description}</span>
                </div>
                <span className="tma-cell__value">{el.price}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default DocumentPage;
