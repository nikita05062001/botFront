import React from "react";
import "./InfoMenu.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { useDispatch, useSelector } from "react-redux";
import { changeEquipMinus, changeEquipPlus } from "../../redux/eqipReducer";
import getGoogleDriveUrl from "../../api/getGoogleImg";

const InfoMenu = ({ element, setState }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.equip);

  // Функция для преобразования ссылки Google Drive в прямой URL для img

  // Получаем текущее количество, используя id (из Google Script)
  const currentCount = value && value[element.id] ? value[element.id].count : 0;

  return (
    <div className="infoMenu">
      <div className="infoMenu-content">
        <div className="infoMenu-content-window">
          <div className="infoMenu-exit" onClick={() => setState(null)}>
            <SvgExit fill={"aqua"} />
          </div>

          <div className="infoMenu-content-window-item">
            <div className="infoMenu-content-window-item-title">
              <h3>{element["Наименование"]}</h3>
            </div>
          </div>

          <div className="infoMenu-content-window-item">
            <div className="infoMenu-content-window-item-img">
              <img
                src={getGoogleDriveUrl(element["URL-Изображения"])}
                alt={element["Наименование"]}
                // Вместо полного скрытия, лучше показывать "битую" картинку или заглушку
                onError={(e) => {
                  console.error("Ошибка загрузки изображения:", e.target.src);
                  // Можно подставить ссылку на картинку-заглушку (placeholder)
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                  e.target.style.display = "block"; // Убеждаемся, что заглушку видно
                }}
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="infoMenu-content-window-item">
            <div className="infoMenu-content-window-item-title">
              <p>
                <strong>Модель:</strong> {element["Модель"] || "—"}
              </p>
              <p>
                <strong>Производитель:</strong>{" "}
                {element["Производитель"] || "—"}
              </p>
              <p>
                <strong>Описание:</strong> {element["Описание краткое"] || "—"}
              </p>
            </div>
          </div>

          <div className="infoMenu-content-window-item">
            <div className="infoMenu-content-window-item-title">
              <p>
                Оценочная стоимость: {element["Оценочная стоимость USD"] || 0}$
              </p>
              <p>Стоимость: {element["Стоимость USD"] || 0}$</p>
            </div>
          </div>

          <div className="infoMenu-content-window-item">
            <div className="infoMenu-content-window-item-change">
              <p
                className="infoMenu-content-window-item-change-minus"
                onClick={() => dispatch(changeEquipMinus(element))}
              >
                -
              </p>
              <p className="infoMenu-content-window-item-change-value">
                {currentCount}
              </p>
              <p
                className="infoMenu-content-window-item-change-plus"
                onClick={() => dispatch(changeEquipPlus(element))}
              >
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
