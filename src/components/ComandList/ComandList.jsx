import React, { useEffect, useState } from "react";
import "./ComandList.scss";
import axios from "axios";
//@ts-ignore
import InfoMenu from "../InfoMenu/InfoMenu.jsx";

// import { List } from  '../../api/getList';

const ComandList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbzcFkt--B7LRQO17fXLw0_wqZ4RO0FtTr9qqWo5VDw0wZrbJnA4n6k8VGsUBzFMgH_P/exec"
        );
        setList(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);
  const handleTitleClick = (el) => {
    setSelectedElement(el);
  };
  console.log(list.list);
  return (
    <div className="list">
       
      <div className="list-input">
        <input type="text" />
      </div>
      <div className="list-content">
    
        <ul>
          <li>
            <div className="list-content-title">Наименование</div>
            <div className="list-content-count">Кол-во</div>
          </li>
          {!loading ? (
            list.list.map((el, index) => (
              <li key={index}>
                <div className="list-content-title" onClick={() => {
                  handleTitleClick(el)
                }}>{el.Наименование}</div>
                <div className="list-content-count">
                  <div className="list-content-count-minus">-</div>
                  <div className="list-content-count-value">0</div>
                  <div className="list-content-count-minus">+</div>
                </div>
              </li>
            ))
          ) : (
            <li>загрузка</li>
          )}
          {error && <li>Ошибка: {error}</li>}
        </ul>
      </div>
      {selectedElement && (
        <InfoMenu element={selectedElement} setState={setSelectedElement} />
      )}
    </div>
  );
};

export default ComandList;
