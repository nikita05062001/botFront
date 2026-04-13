import React from "react";
import "./InfoMenu.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { useDispatch, useSelector } from "react-redux";
import { changeEquipMinus, changeEquipPlus } from "../../redux/eqipReducer";
import getGoogleDriveUrl from "../../api/getGoogleImg";

const InfoMenu = ({ element, setState }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.equip);

  // Получаем текущее количество из Redux
  const currentCount = value && value[element.id] ? value[element.id].count : 0;

  // Проверка на превышение лимита
  const isOverLimit = currentCount > (element.maxCount || 0);

  if (!element) return null;

  return (
    <div className="info-menu" onClick={() => setState(null)}>
      <div className="info-menu__window" onClick={(e) => e.stopPropagation()}>
        <button className="info-menu__exit" onClick={() => setState(null)}>
          <SvgExit fill="var(--tg-theme-hint-color)" />
        </button>

        <header className="info-menu__header">
          <h3 className="info-menu__title">{element["Наименование"]}</h3>
        </header>

        <div className="info-menu__body">
          <div className="info-menu__img-container">
            <img
              src={getGoogleDriveUrl(element["URL-Изображения"])}
              alt={element["Наименование"]}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
              }}
              className="info-menu__img"
            />
          </div>

          <div className="info-menu__details">
            <div className="info-menu__row">
              <span>Модель:</span>
              <strong>{element["Модель"] || "—"}</strong>
            </div>
            <div className="info-menu__row">
              <span>Производитель:</span>
              <strong>{element["Производитель"] || "—"}</strong>
            </div>
            {/* НОВОЕ: Отображение доступного количества */}
            <div className="info-menu__row">
              <span>В наличии (всего):</span>
              <strong>{element.maxCount || 1} шт.</strong>
            </div>

            <p className="info-menu__description">
              {element["Описание краткое"] || "Нет описания"}
            </p>
          </div>

          <div className="info-menu__price-block">
            <div className="info-menu__price">
              <span>Оценочная:</span>
              <strong>${element["Оценочная стоимость USD"] || 0}</strong>
            </div>
            <div className="info-menu__price">
              <span>Стоимость:</span>
              <strong>${element["Стоимость USD"] || 0}</strong>
            </div>
          </div>
        </div>

        <footer className="info-menu__footer">
          <div className="counter-control">
            <button
              className="counter-control__btn"
              onClick={() => dispatch(changeEquipMinus(element))}
            >
              –
            </button>
            {/* ПРИМЕНЕНИЕ ЦВЕТА: Красный, если превышен лимит */}
            <span
              className="counter-control__value"
              style={{
                color: isOverLimit ? "#ff4d4f" : "var(--tg-theme-text-color)",
              }}
            >
              {currentCount}
            </span>
            <button
              className="counter-control__btn"
              onClick={() => dispatch(changeEquipPlus(element))}
            >
              +
            </button>
          </div>
          {/* Подсказка, если превышено */}
          {isOverLimit && (
            <div
              style={{
                color: "#ff4d4f",
                fontSize: "12px",
                textAlign: "center",
                marginTop: "8px",
                fontWeight: "500",
              }}
            >
              Внимание: превышен лимит (макс: {element.maxCount})
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default InfoMenu;
