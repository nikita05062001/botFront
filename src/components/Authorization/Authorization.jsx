import React from "react";
import "./Authorization.scss";

const Authorization = () => {
  return (
    <div className="authorization">
      <div className="authorization-content">
        <p className="authorization-content-title">Авторизация</p>
        <div className="authorization-content-body">
          <input
            className="authorization-content-body-input"
            placeholder="логин"
          ></input>
          <br />
          <input
            className="authorization-content-body-input"
            placeholder="пароль"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
