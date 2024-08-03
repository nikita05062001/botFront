import React from 'react'
import { useEffect, useState } from "react";
import "./StartPage.scss";
import { useTelegram } from "../../hooks/useTelegram";
import Header from '../Header/Header';
import MenuSelect from '../MenuSelect/MenuSelect';
import ComandList from '../ComandList/ComandList';
import Authorization from '../Authorization/Authorization';



const StartPage = () => {

    const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

    const [menu, setMenu] = useState("1");
  return (
    <div className="App">
      <Header />
      <div className="body">
        <MenuSelect stateMenu={setMenu} />
        {menu === "1" ? <ComandList /> : ""}
        {menu === "2" ? <Authorization /> : ""}
      </div>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
      </style>
    </div>
  )
}

export default StartPage