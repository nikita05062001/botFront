import React, { useEffect, useState } from "react";
import "./PDFInfo.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo } from "../../redux/pdfinfoReducer";
import { changeServices, removeService } from "../../redux/pdfservicesReducer";
import {
  addCondition,
  changeCondition,
  removeCondition,
} from "../../redux/pdfConditionReducer";

const PDFInfo = ({ setState }) => {
  const infoState = useSelector((state) => state.pdfinfo);
  const servicesState = useSelector((state) => state.pdfservices);
  const conditions = useSelector((state) => state.pdfcondition); // Получаем условия из состояния Redux
  const dispatch = useDispatch();

  // Локальный стейт для информации и услуг
  const [info, setInfo] = useState(infoState);
  const [services, setServices] = useState(servicesState);
  const [nextId, setNextId] = useState(Date.now()); // Уникальный идентификатор для новых услуг и условий

  // Синхронизация локального стейта с Redux
  useEffect(() => {
    dispatch(changeInfo(info)); // Обновляем информацию в Redux при изменении локального стейта
  }, [info, dispatch]);

  useEffect(() => {
    dispatch(changeServices(services)); // Обновляем услуги в Redux при изменении локального стейта
  }, [services, dispatch]);

  // Функция для добавления новой услуги
  const addService = () => {
    const newId = Date.now(); // Генерация уникального ID
    const newService = {
      title: "",
      description: "",
      count: "",
      price: "",
    };

    setServices((prevServices) => ({
      ...prevServices,
      [newId]: newService,
    }));

    // Сразу обновляем Redux
    dispatch(changeServices({ [newId]: newService }));
  };

  // Обработчик изменений для конкретного поля услуги
  const handleServiceChange = (id, field, value) => {
    const updatedService = {
      ...services[id],
      [field]: value,
    };

    setServices((prevServices) => ({
      ...prevServices,
      [id]: updatedService,
    }));

    // Обновляем Redux
    dispatch(changeServices({ [id]: updatedService }));
  };

  // Функция удаления услуги как из локального стейта, так и из Redux
  const handleRemoveService = (id) => {
    setServices((prevServices) => {
      const newServices = { ...prevServices };
      delete newServices[id]; // Удаляем услугу из локального состояния
      return newServices;
    });

    dispatch(removeService(id)); // Удаляем услугу из Redux
  };

  // Функция для добавления нового условия
  const handleAddCondition = () => {
    dispatch(addCondition({ id: nextId, text: "" })); // Добавляем новое пустое условие
    setNextId(Date.now()); // Генерируем новый уникальный ID для следующего условия
  };

  // Функция для изменения текста условия
  const handleChangeCondition = (id, text) => {
    dispatch(changeCondition({ id, text }));
  };

  // Функция для удаления условия
  const handleRemoveCondition = (id) => {
    dispatch(removeCondition({ id }));
  };

  return (
    <div className="PDFInfo">
      <div className="PDFInfo-content">
        <div
          className="infoMenu-exit"
          onClick={() => {
            setState(false);
          }}
        >
          <SvgExit fill={"aqua"} />
        </div>
        <div className="PDFInfo-content-title">
          <p>Введите данные</p>
        </div>
        <div className="PDFInfo-content-body">
          <div className="PDFInfo-content-body-inputs">
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.adres}
                type="text"
                placeholder="Введите адрес"
                className="PDFInfo-content-body-inputs-input-adres"
                onChange={(e) => setInfo({ ...info, adres: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.date}
                type="text"
                placeholder="Введите дату"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, date: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.dateSign}
                type="text"
                placeholder="Введите дату подписания документа"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, dateSign: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.title}
                type="text"
                placeholder="Введите заголовок"
                className="PDFInfo-content-body-inputs-input-title"
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.description}
                type="text"
                placeholder="Введите мини-описание"
                className="PDFInfo-content-body-inputs-input-description"
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value })
                }
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                value={info.discount}
                type="number"
                max={100}
                min={0}
                placeholder="Введите скидку"
                className="PDFInfo-content-body-inputs-input-discount"
                onChange={(e) => setInfo({ ...info, discount: e.target.value })}
              />
            </div>
          </div>
          <div className="PDFInfo-content-body-services">
            <div className="PDFInfo-content-body-services-title">
              <p>Выберите услуги специалистов</p>
            </div>
            <div className="PDFInfo-content-body-services-list">
              <ul>
                {Object.keys(services).map((id) => (
                  <li key={id}>
                    <input
                      type="text"
                      value={services[id].title}
                      placeholder="введите заголовок услуги"
                      onChange={(e) =>
                        handleServiceChange(id, "title", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={services[id].description}
                      placeholder="введите описание услуги"
                      onChange={(e) =>
                        handleServiceChange(id, "description", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={services[id].count}
                      placeholder="введите кол-во"
                      onChange={(e) =>
                        handleServiceChange(id, "count", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={services[id].price}
                      placeholder="введите цену"
                      onChange={(e) =>
                        handleServiceChange(id, "price", e.target.value)
                      }
                    />
                    <button onClick={() => handleRemoveService(id)}>
                      Удалить услугу
                    </button>
                  </li>
                ))}
                <div className="PDFInfo-content-body-services-list-custom">
                  <p className="PDFInfo-content-body-services-list-custom-title">
                    Создать услугу
                  </p>
                  <button onClick={addService}>Добавить услугу</button>
                </div>
              </ul>
            </div>
          </div>
          <div className="PDFInfo-content-body-conditions">
            <div className="PDFInfo-content-body-conditions-title">
              <p>Условия</p>
            </div>

            {conditions &&
              conditions.map((condition) => (
                <div
                  key={condition.id}
                  className="PDFInfo-content-body-conditions-condition"
                >
                  <textarea
                    value={condition.text}
                    placeholder="введите условие"
                    onChange={(e) =>
                      handleChangeCondition(condition.id, e.target.value)
                    } // Изменение текста условия
                  />
                  <button
                    className="PDFInfo-content-body-conditions-condition-remove"
                    onClick={() => handleRemoveCondition(condition.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            <div className="PDFInfo-content-body-conditions-condition-add">
              <button onClick={handleAddCondition}>Добавить условие</button>
            </div>
          </div>
        </div>
        <div className="PDFInfo-content-button">
          <Link to="/document">Оформить</Link>
        </div>
      </div>
    </div>
  );
};

export default PDFInfo;
