import { combineReducers } from "redux";
import eqipReducer from "./eqipReducer"; // импортируй другие редюсеры
import pdfinfoReducer from "./pdfinfoReducer";
import pdfservicesReducer from "./pdfservicesReducer";
import pdfConditionReducer from "./pdfConditionReducer";

const rootReducer = combineReducers({
  equip: eqipReducer, // добавь редюсеры в корневой редюсер
  // добавь другие редюсеры здесь
  pdfinfo: pdfinfoReducer,
  pdfservices: pdfservicesReducer,
  pdfcondition: pdfConditionReducer,
});

export default rootReducer;
