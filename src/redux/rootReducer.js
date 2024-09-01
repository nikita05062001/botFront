import { combineReducers } from "redux";
import eqipReducer from "./eqipReducer"; // импортируй другие редюсеры
import pdfinfoReducer from "./pdfinfoReducer";

const rootReducer = combineReducers({
  equip: eqipReducer, // добавь редюсеры в корневой редюсер
  // добавь другие редюсеры здесь
  pdfinfo: pdfinfoReducer,
});

export default rootReducer;
