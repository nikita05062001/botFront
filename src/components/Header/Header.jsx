import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.scss";
const Header = () => {
  const { user, onClose } = useTelegram();
  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <Button onClick={() => localStorage.setItem("test", "true")}>
        {localStorage.getItem("test") || "false"}
      </Button>
      <span className="username">{user?.username || "Пользователь"}</span>
    </div>
  );
};

export default Header;
