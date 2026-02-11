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
  // Достаем состояние корзины/оборудования из Redux
  const equipState = useSelector((state) => state.equip);

  useEffect(() => {
    if (selectedElement) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [selectedElement]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbx2FkcDqvjkdr8qfoChNUtbIzLzGy5-OSnwI0BOkKQ9gnOUsbZvme10qr3z7EWv05Qk/exec",
        );

        // В новом JSON есть поле "id", используем его
        const data = response.data.list;
        setList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // Логика формирования дерева категорий на основе Атрибутов
  useEffect(() => {
    if (!loading) {
      const tempCategories = {};

      list.forEach((el) => {
        // Добавляем проверку на существование значения, если его нет — ставим пустую строку
        const a = (el["Атрибут A"] || "Без категории").toString();
        const b = (el["Атрибут B"] || "Без категории").toString();
        const c = el["Атрибут C"] ? el["Атрибут C"].toString().trim() : "";

        if (!tempCategories[a]) tempCategories[a] = {};
        if (!tempCategories[a][b]) tempCategories[a][b] = [];

        // Добавляем в список только если C не пустой и его там еще нет
        if (c !== "" && !tempCategories[a][b].includes(c)) {
          tempCategories[a][b].push(c);
        }
      });
      setCategories(tempCategories);
    }
  }, [loading, list]);

  // Фильтрация
  useEffect(() => {
    if (!loading) {
      const newFilteredData = list.filter((item) => {
        const searchMatch = item["Наименование"]
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());
        const cat1Match = filters.cat1
          ? item["Атрибут A"] === filters.cat1
          : true;
        const cat2Match = filters.cat2
          ? item["Атрибут B"] === filters.cat2
          : true;
        const cat3Match = filters.cat3
          ? item["Атрибут C"] === filters.cat3
          : true;
        return searchMatch && cat1Match && cat2Match && cat3Match;
      });
      setFilteredData(newFilteredData);
    }
  }, [loading, filters, list]);

  const handleCategoryChange = (level, value) => {
    const newFilters = { ...filters, [`cat${level}`]: value };
    for (let i = level + 1; i <= 3; i++) {
      newFilters[`cat${i}`] = "";
    }
    setFilters(newFilters);
  };

  const getCategoryOptions = (level) => {
    if (level === 1) return Object.keys(categories);
    if (level === 2 && filters.cat1)
      return Object.keys(categories[filters.cat1] || {});
    if (level === 3 && filters.cat2 && filters.cat1)
      return categories[filters.cat1][filters.cat2] || [];
    return [];
  };

  return (
    <div className="list">
      <div className="list-input">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="list-filters">
        <select
          value={filters.cat1}
          onChange={(e) => handleCategoryChange(1, e.target.value)}
        >
          <option value="">Атрибут A</option>
          {getCategoryOptions(1).map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select
          value={filters.cat2}
          onChange={(e) => handleCategoryChange(2, e.target.value)}
          disabled={!filters.cat1}
        >
          <option value="">Атрибут B</option>
          {getCategoryOptions(2).map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select
          value={filters.cat3}
          onChange={(e) => handleCategoryChange(3, e.target.value)}
          disabled={!filters.cat2}
        >
          <option value="">Атрибут C</option>
          {getCategoryOptions(3).map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="list-content">
        <ul>
          <li className="list-header">
            <div className="list-content-title">Наименование</div>
            <div className="list-content-count">Кол-во</div>
          </li>
          {!loading ? (
            filteredData.map((el) => {
              // ИСПОЛЬЗУЕМ ID ИЗ GOOGLE SCRIPT КАК КЛЮЧ
              const itemId = el.id;
              const currentCount =
                equipState && equipState[itemId] ? equipState[itemId].count : 0;

              return (
                <li key={itemId}>
                  <div
                    className="list-content-title"
                    onClick={() => setSelectedElement(el)}
                  >
                    {el["Наименование"]}
                  </div>
                  <div className="list-content-count">
                    <div
                      className="list-content-count-minus"
                      onClick={() => dispatch(changeEquipMinus(el))}
                    >
                      -
                    </div>
                    <div className="list-content-count-value">
                      {currentCount}
                    </div>
                    <div
                      className="list-content-count-plus"
                      onClick={() => dispatch(changeEquipPlus(el))}
                    >
                      +
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li>Загрузка...</li>
          )}
          {error && <li className="error">Ошибка: {error}</li>}
        </ul>
      </div>
      {selectedElement && (
        <InfoMenu element={selectedElement} setState={setSelectedElement} />
      )}
    </div>
  );
};

export default ComandList;
