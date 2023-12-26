import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import MenuSelect from "./components/MenuSelect/MenuSelect";
import ComandList from "./components/ComandList/ComandList";

const App = () => {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);
  const [menu, setMenu] = useState("0");
  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>toggle</button>
      <MenuSelect stateMenu={setMenu} />
      {menu === "1" ? <ComandList /> : ""}
    </div>
  );
};

export default App;
