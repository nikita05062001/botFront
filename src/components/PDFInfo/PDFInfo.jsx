import React, { useEffect, useState } from "react";
import "./PDFInfo.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../redux/pdfinfoReducer";
import { changeServices } from "../../redux/pdfservicesReducer";

const PDFInfo = ({ setState }) => {
  const [info, setInfo] = useState({
    adres: "",
    date: "",
    title: "",
    description: "",
    discount: "",
    dateSign: "",
  });

  const [services, setServices] = useState({
    1: {
      title: "Услуги инженера-техника",
      description: "Монтаж демонтаж оборудования",
      count: "",
      price: "",
    },
    2: {
      title: "Услуги транспортировки",
      description: "Отправка грузка A-B, B-A.",
      count: "",
      price: "",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeInfo(info));
  }, [info]);

  useEffect(() => {
    dispatch(changeServices(services));
  }, [services]);

  useEffect(() => {
    console.log(services);
  }, [services]);

  const addService = () => {
    const newId = Object.keys(services).length + 1;
    setServices((prevServices) => ({
      ...prevServices,
      [newId]: {
        title: "",
        description: "",
        count: "",
        price: "",
      },
    }));
  };

  const handleServiceChange = (id, field, value) => {
    setServices((prevServices) => ({
      ...prevServices,
      [id]: {
        ...prevServices[id],
        [field]: value,
      },
    }));
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
                type="text"
                placeholder="Введите адрес"
                className="PDFInfo-content-body-inputs-input-adres"
                onChange={(e) => setInfo({ ...info, adres: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                type="text"
                placeholder="Введите дату"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, date: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                type="text"
                placeholder="Введите дату подписания документа"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, dateSign: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                type="text"
                placeholder="Введите заголовок"
                className="PDFInfo-content-body-inputs-input-title"
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
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
                    <button
                      onClick={() =>
                        setServices((prevServices) => {
                          const newServices = { ...prevServices };
                          delete newServices[id];
                          return newServices;
                        })
                      }
                    >
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
        </div>
        <div className="PDFInfo-content-button">
          <Link to="/document">Оформить</Link>
        </div>
      </div>
    </div>
  );
};

export default PDFInfo;
