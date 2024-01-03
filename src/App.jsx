import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import MenuSelect from "./components/MenuSelect/MenuSelect";
import ComandList from "./components/ComandList/ComandList";

const App = () => {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);
  const [menu, setMenu] = useState("0");
  return (
    <div className="App">
      <Header />

      <div className="body">
        <MenuSelect stateMenu={setMenu} />
        {menu === "1" ? <ComandList /> : ""}
      </div>
    </div>
    // <button onClick={onToggleButton}>toggle</button>
  );
};

export default App;
