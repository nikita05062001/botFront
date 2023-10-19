import { useEffect } from "react";
import "./App.css";

const App = () => {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      test <button>Закрыть</button>
    </div>
  );
};

export default App;
