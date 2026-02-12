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
import getGoogleDriveUrl from "../../api/getGoogleImg";
import {
  changeEquipPrice,
  changeEquipPlus,
  changeEquipMinus,
} from "../../redux/eqipReducer";

const PDFInfo = ({ setState }) => {
  const infoState = useSelector((state) => state.pdfinfo);
  const servicesState = useSelector((state) => state.pdfservices);
  const conditions = useSelector((state) => state.pdfcondition);
  const eqipItemsObj = useSelector((state) => state.equip) || {};
  const dispatch = useDispatch();

  const [info, setInfo] = useState(infoState);
  const [services, setServices] = useState(servicesState);
  const [nextId, setNextId] = useState(Date.now());

  useEffect(() => {
    dispatch(changeInfo(info));
  }, [info, dispatch]);

  useEffect(() => {
    dispatch(changeServices(services));
  }, [services, dispatch]);

  // ПРЕВРАЩАЕМ ОБЪЕКТ В МАССИВ (Фикс ошибки .map)
  const eqipItems = Object.entries(eqipItemsObj);

  // --- ФУНКЦИИ ДЛЯ УСЛУГ ---
  const addService = () => {
    const newId = Date.now();
    const newService = { title: "", description: "", count: "", price: "" };
    setServices((prev) => ({ ...prev, [newId]: newService }));
    dispatch(changeServices({ [newId]: newService }));
  };

  const handleServiceChange = (id, field, value) => {
    const updated = { ...services[id], [field]: value };
    setServices((prev) => ({ ...prev, [id]: updated }));
    dispatch(changeServices({ [id]: updated }));
  };

  const handleRemoveService = (id) => {
    setServices((prev) => {
      const newServices = { ...prev };
      delete newServices[id];
      return newServices;
    });
    dispatch(removeService(id));
  };

  // --- ФУНКЦИИ ДЛЯ УСЛОВИЙ ---
  const handleAddCondition = () => {
    dispatch(addCondition({ id: Date.now(), text: "" }));
  };

  const handleChangeCondition = (id, text) => {
    dispatch(changeCondition({ id, text }));
  };

  const handleRemoveCondition = (id) => {
    dispatch(removeCondition({ id }));
  };

  return (
    <div className="PDFInfo">
      <div className="PDFInfo-content">
        <div className="infoMenu-exit" onClick={() => setState(false)}>
          <SvgExit fill={"aqua"} />
        </div>

        <div className="PDFInfo-content-title">
          <p>Введите данные для документа</p>
        </div>

        <div className="PDFInfo-content-body">
          {/* БЛОК 1: ОСНОВНЫЕ ИНПУТЫ */}
          <div className="PDFInfo-content-body-inputs">
            <input
              value={info.adres || ""}
              placeholder="Введите адрес"
              onChange={(e) => setInfo({ ...info, adres: e.target.value })}
            />
            <input
              value={info.date || ""}
              placeholder="Введите дату"
              onChange={(e) => setInfo({ ...info, date: e.target.value })}
            />
            <input
              value={info.dateSign || ""}
              placeholder="Дата подписания"
              onChange={(e) => setInfo({ ...info, dateSign: e.target.value })}
            />
            <input
              value={info.title || ""}
              placeholder="Заголовок документа"
              onChange={(e) => setInfo({ ...info, title: e.target.value })}
            />
            <input
              value={info.description || ""}
              placeholder="Мини-описание"
              onChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
            />
            <input
              type="number"
              value={info.discount || ""}
              placeholder="Скидка %"
              onChange={(e) => setInfo({ ...info, discount: e.target.value })}
            />
          </div>

          {/* БЛОК 2: ОБОРУДОВАНИЕ */}
          <div className="PDFInfo-content-body-items">
            {eqipItems.map(([itemId, item]) => {
              const price = parseFloat(item.price) || 0;
              const count = item.count || 0;
              return (
                <div className="PDFInfo-content-body-items-item" key={itemId}>
                  <div className="item-main-info">
                    <img
                      src={getGoogleDriveUrl(item["URL-Изображения"])}
                      alt=""
                    />
                    <p>
                      <strong>{item["Наименование"]}</strong>
                    </p>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          dispatch(changeEquipMinus({ id: itemId }))
                        }
                      >
                        -
                      </button>
                      <span>{count} шт.</span>
                      <button
                        onClick={() =>
                          dispatch(changeEquipPlus({ id: itemId }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="number"
                      value={item.price || ""}
                      placeholder="Цена"
                      onChange={(e) =>
                        dispatch(
                          changeEquipPrice({
                            id: itemId,
                            price: e.target.value,
                          }),
                        )
                      }
                    />
                    <div className="item-total">
                      {(price * count).toLocaleString("kk-KZ")} ₸
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="grand-total">
              <p>
                Итого оборудование:{" "}
                <span>
                  {eqipItems
                    .reduce(
                      (s, [_, i]) =>
                        s + (parseFloat(i.price) || 0) * (i.count || 0),
                      0,
                    )
                    .toLocaleString("kk-KZ")}{" "}
                  ₸
                </span>
              </p>
            </div>
          </div>

          {/* БЛОК 3: УСЛУГИ */}
          <div className="PDFInfo-content-body-services">
            <p className="section-subtitle">Услуги специалистов</p>
            <div className="PDFInfo-content-body-services-list">
              {Object.keys(services).map((id) => (
                <div key={id} className="service-card">
                  <input
                    className="input-title"
                    value={services[id].title}
                    placeholder="Название услуги"
                    onChange={(e) =>
                      handleServiceChange(id, "title", e.target.value)
                    }
                  />
                  <textarea
                    className="input-desc"
                    value={services[id].description}
                    placeholder="Описание"
                    onChange={(e) =>
                      handleServiceChange(id, "description", e.target.value)
                    }
                  />
                  <div className="service-pricing">
                    <input
                      type="number"
                      placeholder="Кол-во"
                      value={services[id].count}
                      onChange={(e) =>
                        handleServiceChange(id, "count", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Цена ₸"
                      value={services[id].price}
                      onChange={(e) =>
                        handleServiceChange(id, "price", e.target.value)
                      }
                    />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveService(id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button className="add-btn" onClick={addService}>
                + Добавить услугу
              </button>
            </div>
          </div>

          {/* БЛОК 4: УСЛОВИЯ */}
          <div className="PDFInfo-content-body-conditions">
            <p className="section-subtitle">Условия</p>
            {conditions?.map((c) => (
              <div key={c.id} className="condition-card">
                <textarea
                  value={c.text}
                  placeholder="Текст условия..."
                  onChange={(e) => handleChangeCondition(c.id, e.target.value)}
                />
                <button
                  className="remove-btn-simple"
                  onClick={() => handleRemoveCondition(c.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
            <button className="add-btn" onClick={handleAddCondition}>
              + Добавить условие
            </button>
          </div>
        </div>

        <div className="PDFInfo-content-button">
          <Link to="/document">ОФОРМИТЬ ДОКУМЕНТ</Link>
        </div>
      </div>
    </div>
  );
};

export default PDFInfo;
