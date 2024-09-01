import React, { useEffect, useState } from "react";
import "./PDFInfo.scss";
import SvgExit from "../../svg/exit/SvgExit";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../redux/pdfinfoReducer";

const PDFInfo = ({ setState }) => {
  const [info, setInfo] = useState({
    adres: "",
    date: "",
    title: "",
    description: "",
    discount: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeInfo(info));
  }, [info]);

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
        </div>
        <div className="PDFInfo-content-button">
          <Link to="/document">Оформить</Link>
        </div>
      </div>
    </div>
  );
};

export default PDFInfo;
