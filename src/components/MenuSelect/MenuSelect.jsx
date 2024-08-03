import "./MenuSelect.scss";
import { Link } from "react-router-dom";

const MenuSelect = ({ stateMenu }) => {
  const handleItemClick = (value) => {
    stateMenu(value);
  };

  return (
    <div className="menu">
      <div className="menu-content">
        <div className="menu-content-list">
          <ul>
            <li onClick={() => handleItemClick("1")}>Команды</li>
            <Link to='/document'>
            <li>Оформить</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuSelect;
