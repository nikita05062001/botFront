import React, { useEffect, useState } from "react";
import "./ComandList.scss";
import axios from "axios";
//@ts-ignore
import InfoMenu from "../InfoMenu/InfoMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeEquipMinus, changeEquipPlus } from "../../redux/eqipReducer.js";

const ComandList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    cat1: "",
    cat2: "",
    cat3: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState({});

  const dispatch = useDispatch();
  const value = useSelector((state) => state.equip);

  useEffect(() => {
    if (selectedElement) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [selectedElement]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbzcFkt--B7LRQO17fXLw0_wqZ4RO0FtTr9qqWo5VDw0wZrbJnA4n6k8VGsUBzFMgH_P/exec"
        );

        const filteredItems = response.data.list.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.Наименование === item.Наименование)
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
      const tempCategories = {};

      list.forEach((el) => {
        if (!tempCategories[el["Категория 1"]]) {
          tempCategories[el["Категория 1"]] = {};
        }

        if (!tempCategories[el["Категория 1"]][el["Категория 2"]]) {
          tempCategories[el["Категория 1"]][el["Категория 2"]] = [];
        }

        if (el["Категория 3"].trim() !== "") {
          tempCategories[el["Категория 1"]][el["Категория 2"]].push(
            el["Категория 3"]
          );
        }
      });

      // Удаляем пустые строки и дубликаты из массивов
      Object.keys(tempCategories).forEach((category1Key) => {
        Object.keys(tempCategories[category1Key]).forEach((category2Key) => {
          tempCategories[category1Key][category2Key] = Array.from(
            new Set(tempCategories[category1Key][category2Key])
          ).filter((item) => item.trim() !== "");
        });
      });

      setCategories(tempCategories);
    }
  }, [loading, list]);

  useEffect(() => {
    if (!loading) {
      const newFilteredData = list.filter((item) => {
        const searchMatch = item?.Наименование
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const cat1Match = filters.cat1
          ? item["Категория 1"] === filters.cat1
          : true;
        const cat2Match = filters.cat2
          ? item["Категория 2"] === filters.cat2
          : true;
        const cat3Match = filters.cat3
          ? item["Категория 3"] === filters.cat3
          : true;
        return searchMatch && cat1Match && cat2Match && cat3Match;
      });
      setFilteredData(newFilteredData);
    }
  }, [loading, filters, list]);

  const handleTitleClick = (el) => {
    setSelectedElement(el);
  };

  const handleCategoryChange = (level, value) => {
    const newFilters = { ...filters, [`cat${level}`]: value };

    // Reset filters at higher levels
    for (let i = level + 1; i <= 3; i++) {
      newFilters[`cat${i}`] = "";
    }

    setFilters(newFilters);
  };

  const getCategoryOptions = (level) => {
    if (level === 1) {
      return Object.keys(categories);
    } else if (level === 2 && filters.cat1) {
      return Object.keys(categories[filters.cat1] || {});
    } else if (level === 3 && filters.cat2 && filters.cat1) {
      return categories[filters.cat1][filters.cat2] || [];
    }
    return [];
  };

  return (
    <div className="list">
      <div className="list-input">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => {
            const newObj = { ...filters, search: e.target.value };
            setFilters(newObj);
          }}
        />
      </div>
      <div className="list-filters">
        <select
          value={filters.cat1}
          onChange={(e) => handleCategoryChange(1, e.target.value)}
        >
          <option value="">Выберите Категорию 1</option>
          {getCategoryOptions(1).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={filters.cat2}
          onChange={(e) => handleCategoryChange(2, e.target.value)}
          disabled={!filters.cat1}
        >
          <option value="">Выберите Категорию 2</option>
          {getCategoryOptions(2).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={filters.cat3}
          onChange={(e) => handleCategoryChange(3, e.target.value)}
          disabled={!filters.cat2}
        >
          <option value="">Выберите Категорию 3</option>
          {getCategoryOptions(3).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="list-content">
        <ul>
          <li>
            <div className="list-content-title">Наименование</div>
            <div className="list-content-count">Кол-во</div>
          </li>
          {!loading ? (
            filteredData.map((el, index) => (
              <li key={index}>
                <div
                  className="list-content-title"
                  onClick={() => handleTitleClick(el)}
                >
                  {el.Наименование}
                </div>
                <div className="list-content-count">
                  <div
                    className="list-content-count-minus"
                    onClick={() => dispatch(changeEquipMinus(el))}
                  >
                    -
                  </div>
                  <div className="list-content-count-value">
                    {value &&
                    value[el["№"]] &&
                    value[el["№"]].count !== undefined
                      ? value[el["№"]].count
                      : 0}
                  </div>
                  <div
                    className="list-content-count-plus"
                    onClick={() => dispatch(changeEquipPlus(el))}
                  >
                    +
                  </div>
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
