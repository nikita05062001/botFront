import React, { useEffect, useState } from "react";
import "./PDFInfo.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo } from "../../redux/pdfinfoReducer";
import { changeServices, removeService } from "../../redux/pdfservicesReducer";

const PDFInfo = ({ setState }) => {
  const infoState = useSelector((state) => state.pdfinfo);
  const servicesState = useSelector((state) => state.pdfservices);
  const [info, setInfo] = useState({
    adres: infoState.adres,
    date: infoState.date,
    title: infoState.title,
    description: infoState.description,
    discount: infoState.discount,
    dateSign: infoState.dateSign,
  });
  const [services, setServices] = useState(servicesState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeInfo(info));
  }, [info]);

  useEffect(() => {
    dispatch(changeServices(services)); // Обновляем услуги в Redux
  }, [services]);

  // Функция для добавления новой услуги
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

  // Обработчик изменений для конкретного поля услуги
  const handleServiceChange = (id, field, value) => {
    setServices((prevServices) => ({
      ...prevServices,
      [id]: {
        ...prevServices[id],
        [field]: value,
      },
    }));
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
                defaultValue={info.adres}
                type="text"
                placeholder="Введите адрес"
                className="PDFInfo-content-body-inputs-input-adres"
                onChange={(e) => setInfo({ ...info, adres: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                defaultValue={info.date}
                type="text"
                placeholder="Введите дату"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, date: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                defaultValue={info.dateSign}
                type="text"
                placeholder="Введите дату подписания документа"
                className="PDFInfo-content-body-inputs-input-date"
                onChange={(e) => setInfo({ ...info, dateSign: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                defaultValue={info.title}
                type="text"
                placeholder="Введите заголовок"
                className="PDFInfo-content-body-inputs-input-title"
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
              />
            </div>
            <div className="PDFInfo-content-body-inputs-input">
              <input
                defaultValue={info.description}
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
                defaultValue={info.discount}
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
        </div>
        <div className="PDFInfo-content-button">
          <Link to="/document">Оформить</Link>
        </div>
      </div>
    </div>
  );
};

export default PDFInfo;
