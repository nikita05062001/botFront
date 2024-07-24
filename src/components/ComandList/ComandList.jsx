import React, { useEffect, useState } from "react";
import "./ComandList.scss";
import axios from "axios";
//@ts-ignore
import InfoMenu from "../InfoMenu/InfoMenu.jsx";

const ComandList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    cat1: "",
    cat2: "",
    cat3: ""
  });
  const [filteredData, setFilteredData] = useState([]);
  const categories = {}

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbzcFkt--B7LRQO17fXLw0_wqZ4RO0FtTr9qqWo5VDw0wZrbJnA4n6k8VGsUBzFMgH_P/exec"
        );

        const filteredItems = response.data.list.filter((item, index, self) =>
          index === self.findIndex(t => t.Наименование === item.Наименование)
        );

        setList(filteredItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);


  useEffect(() => {
    if (!loading) {
      list.forEach((el) => {
        if (!categories[el["Категория 1"]]) {
          categories[el["Категория 1"]] = {};
        }
  
        if (!categories[el["Категория 1"]][el["Категория 2"]]) {
          categories[el["Категория 1"]][el["Категория 2"]] = [];
        }
  
        // Добавляем значение, если оно не пустое
        if (el["Категория 3"].trim() !== "") {
          categories[el["Категория 1"]][el["Категория 2"]].push(el["Категория 3"]);
        }
      });
  
      // Удаляем пустые строки и дубликаты из массивов
      Object.keys(categories).forEach(category1Key => {
        Object.keys(categories[category1Key]).forEach(category2Key => {
          categories[category1Key][category2Key] = Array.from(new Set(categories[category1Key][category2Key]))
            .filter(item => item.trim() !== "");
        });
      });
  
      console.log(categories);
    }
  }, [loading, list]);

  useEffect(() => {
    if (!loading) {
      const newFilteredData = list.filter(item => {
        const searchMatch = item?.Наименование.toLowerCase().includes(filters.search.toLowerCase());
        const cat1Match = filters.cat1 ? item["Категория 1"] === filters.cat1 : true;
        const cat2Match = filters.cat2 ? item["Категория 2"] === filters.cat2 : true;
        const cat3Match = filters.cat3 ? item["Категория 3"] === filters.cat3 : true; // Возможно, ошибка в вашем коде: здесь должно быть category3
        return searchMatch && cat1Match && cat2Match && cat3Match;
      });
      setFilteredData(newFilteredData);
    }
  }, [loading, filters, list]);

  const handleTitleClick = (el) => {
    setSelectedElement(el);
  };

  return (
    <div className="list">
      <div className="list-input">
        <input type="text"  value={filters.search} onChange={(e) =>{
          const newObj = {...filters, search: e.target.value};
          setFilters(newObj);
        }} />
        {/* <img src="https://i.imgur.com/j10HQx7.jpg" alt="test" /> */}
      </div>
      <div className="list-content">
        <ul>
          <li>
            <div className="list-content-title">Наименование</div>
            <div className="list-content-count">Кол-во</div>
          </li>
          {!loading ? (
            filteredData.map((el, index) => ( // Использование filteredData вместо list
              <li key={index}>
                <div
                  className="list-content-title"
                  onClick={() => handleTitleClick(el)}
                >
                  {el.Наименование}
                </div>
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
