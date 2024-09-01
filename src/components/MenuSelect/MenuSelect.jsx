import { useState } from "react";
import "./MenuSelect.scss";
import { Link } from "react-router-dom";
import PDFInfo from "../PDFInfo/PDFInfo";

const MenuSelect = ({ stateMenu }) => {
  const handleItemClick = (value) => {
    stateMenu(value);
  };
  const [showPDFInfo, setShowPDFInfo] = useState(false);
  return (
    <div className="menu">
      <div className="menu-content">
        <div className="menu-content-list">
          <ul>
            <li onClick={() => handleItemClick("1")}>Команды</li>
            <li onClick={() => setShowPDFInfo(true)}>Оформить</li>
            {/* <Link to="/document">
              <li>Оформить</li>
            </Link> */}
          </ul>
        </div>
      </div>
      {showPDFInfo ? <PDFInfo setState={setShowPDFInfo} /> : ""}
    </div>
  );
};

export default MenuSelect;
