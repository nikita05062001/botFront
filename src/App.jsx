import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import MenuSelect from "./components/MenuSelect/MenuSelect";
import ComandList from "./components/ComandList/ComandList";
import Authorization from "./components/Authorization/Authorization";


const App = () => {
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
    // <button onClick={onToggleButton}>toggle</button>
  );
};

export default App;
