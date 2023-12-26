import "./MenuSelect.scss";

const MenuSelect = ({ stateMenu }) => {
  const handleItemClick = (value) => {
    stateMenu(value);
  };

  return (
    <div className="menu">
      <div className="menu-content">
        <div className="menu-content-list">
          <ul>
            <li onClick={() => handleItemClick("1")}>Авторизация</li>
            <li onClick={() => handleItemClick("2")}>Список команд</li>
            <li onClick={() => handleItemClick("3")}>О компании</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuSelect;
