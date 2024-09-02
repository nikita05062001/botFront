import { combineReducers } from "redux";
import eqipReducer from "./eqipReducer"; // импортируй другие редюсеры
import pdfinfoReducer from "./pdfinfoReducer";
import pdfservicesReducer from "./pdfservicesReducer";

const rootReducer = combineReducers({
  equip: eqipReducer, // добавь редюсеры в корневой редюсер
  // добавь другие редюсеры здесь
  pdfinfo: pdfinfoReducer,
  pdfservices: pdfservicesReducer,
});

export default rootReducer;
