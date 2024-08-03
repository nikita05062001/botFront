import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import MenuSelect from "./components/MenuSelect/MenuSelect";
import ComandList from "./components/ComandList/ComandList";
import Authorization from "./components/Authorization/Authorization";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from "./components/StartPage/StartPage";
import DocumentPage from "./components/DocumentPage/DocumentPage";


const App = () => {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  const [menu, setMenu] = useState("1");

  return (
    <Router>
     <Routes>
        <Route path="/" Component={StartPage} />
        <Route path="/document" Component={DocumentPage} />
        </Routes>
    </Router>
    // <button onClick={onToggleButton}>toggle</button>
  );
};

export default App;
