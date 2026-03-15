import React, { useState } from "react";
import { pdf, Font } from "@react-pdf/renderer";
import { useTelegram } from "../../hooks/useTelegram";
import { useSelector } from "react-redux";
import PDFFile from "../PdfFile/PDFFile";
import { useNavigate } from "react-router-dom";
import "./DocumentPage.scss";

// Импорт шрифтов
import CalibriRegular from "../../fonts/calibri.ttf";
import CalibriBold from "../../fonts/calibriBold.ttf";
import CalibriItalic from "../../fonts/calibriItalic.ttf";
import CalibriBoldItalic from "../../fonts/calibriBoldItalic.ttf";

Font.register({ family: "Calibri", src: CalibriRegular });
Font.register({ family: "CalibriBold", src: CalibriBold });
Font.register({ family: "CalibriItalic", src: CalibriItalic });
Font.register({ family: "CalibriBoldItalic", src: CalibriBoldItalic });

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

  const notify = (message) => {
    if (tg.isVersionAtLeast("6.2")) {
      tg.showAlert(message);
    } else {
      alert(message);
    }
  };

  // --- НОВАЯ ФУНКЦИЯ ДЛЯ ОБХОДА CORS ---
  const fetchImageAsBase64 = async (url) => {
    if (!url) return null;
    try {
      // 1. Извлекаем ID файла из ссылки Google Drive
      const match = url.match(/(?:id=|d\/)([\w-]+)/);
      const fileId = match ? match[1] : null;
      if (!fileId) return null;

      const directLink = `https://docs.google.com/uc?export=download&id=${fileId}`;

      // 2. Используем прокси для загрузки данных (обходим CORS)
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(directLink)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch");

      const blob = await response.blob();

      // 3. Конвертируем Blob в Base64 string
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Ошибка при загрузке картинки:", e);
      return null;
    }
  };

  const sendPdfToTelegram = async (pdfBlob) => {
    const formData = new FormData();
    formData.append(
      "document",
      pdfBlob,
      `Offer_${info.title || "document"}.pdf`,
    );

    const botToken = "7170153136:AAFxOfSKrht_OzuVyZmomixX4KoHdefSWx8";
    const chatId = user?.id || "989985866";
    const url = `https://api.telegram.org/bot${botToken}/sendDocument?chat_id=${chatId}`;

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      if (response.ok) {
        notify("Документ успешно отправлен в ваш чат!");
      } else {
        notify("Ошибка API при отправке файла.");
      }
    } catch (error) {
      notify("Сетевая ошибка при отправке.");
    }
  };

  const handleDownloadAndSend = async () => {
    if (isSending) return;
    setIsSending(true);

    try {
      // --- ПРЕ-ПРОЦЕССИНГ КАРТИНOK ---
      // Загружаем все картинки в Base64 перед созданием PDF
      const itemsWithImages = await Promise.all(
        itemsArr.map(async (item) => {
          const base64 = await fetchImageAsBase64(item["URL-Изображения"]);
          return { ...item, imageBase64: base64 };
        }),
      );

      const doc = (
        <PDFFile
          value={itemsWithImages} // Передаем данные уже с картинками
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

      const blob = await pdf(doc).toBlob();
      await sendPdfToTelegram(blob);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      notify("Ошибка при создании PDF.");
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
          {isSending ? "Обработка фото..." : "Отправить PDF"}
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
      </div>
    </div>
  );
};

export default DocumentPage;
