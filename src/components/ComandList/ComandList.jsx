import React, { useEffect, useState, useMemo } from "react";
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

  const dispatch = useDispatch();
  const equipState = useSelector((state) => state.equip);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    document.body.classList.toggle("no-scroll", !!selectedElement);
    return () => document.body.classList.remove("no-scroll");
  }, [selectedElement]);

  // Загрузка данных
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbx2FkcDqvjkdr8qfoChNUtbIzLzGy5-OSnwI0BOkKQ9gnOUsbZvme10qr3z7EWv05Qk/exec",
        );
        setList(response.data.list || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // Формирование дерева категорий (через useMemo для оптимизации)
  const categories = useMemo(() => {
    const tree = {};
    list.forEach((el) => {
      // Ключевой момент: .trim() и проверка на наличие данных
      const a = el["Атрибут А"]?.toString().trim() || "Без категории";
      const b = el["Атрибут B"]?.toString().trim() || "Без категории";
      const c = el["Атрибут C"]?.toString().trim() || "";

      if (!tree[a]) tree[a] = {};
      if (!tree[a][b]) tree[a][b] = new Set(); // Используем Set для уникальности

      if (c) tree[a][b].add(c);
    });

    // Преобразуем Set обратно в массивы для удобства рендера
    const finalTree = {};
    Object.keys(tree).forEach((a) => {
      finalTree[a] = {};
      Object.keys(tree[a]).forEach((b) => {
        finalTree[a][b] = Array.from(tree[a][b]);
      });
    });
    return finalTree;
  }, [list]);

  // Фильтрация данных (через useMemo)
  const filteredData = useMemo(() => {
    return list.filter((item) => {
      const name = item["Наименование"]?.toLowerCase() || "";
      const searchMatch = name.includes(filters.search.toLowerCase());

      const itemA = item["Атрибут А"]?.toString().trim() || "Без категории";
      const itemB = item["Атрибут B"]?.toString().trim() || "Без категории";
      const itemC = item["Атрибут C"]?.toString().trim() || "";

      const cat1Match = !filters.cat1 || itemA === filters.cat1;
      const cat2Match = !filters.cat2 || itemB === filters.cat2;
      const cat3Match = !filters.cat3 || itemC === filters.cat3;

      return searchMatch && cat1Match && cat2Match && cat3Match;
    });
  }, [list, filters]);

  const handleCategoryChange = (level, value) => {
    const newFilters = { ...filters, [`cat${level}`]: value };
    // Сбрасываем дочерние фильтры при изменении родительского
    if (level === 1) {
      newFilters.cat2 = "";
      newFilters.cat3 = "";
    }
    if (level === 2) {
      newFilters.cat3 = "";
    }
    setFilters(newFilters);
  };

  const getOptions = (level) => {
    if (level === 1) return Object.keys(categories);
    if (level === 2 && filters.cat1)
      return Object.keys(categories[filters.cat1] || {});
    if (level === 3 && filters.cat2)
      return categories[filters.cat1]?.[filters.cat2] || [];
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
          {getOptions(1).map((opt) => (
            <option key={opt} value={opt}>
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
          {getOptions(2).map((opt) => (
            <option key={opt} value={opt}>
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
          {getOptions(3).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="list-content">
        <ul>
          <li className="list-header">
            <div className="list-content-title">Наименование</div>
            <div
              className="list-content-count"
              style={{ background: "none", minWidth: "auto" }}
            >
              Кол-во
            </div>
          </li>

          {!loading ? (
            filteredData.map((el) => {
              const currentCount = equipState?.[el.id]?.count || 0;
              return (
                <li key={el.id}>
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
