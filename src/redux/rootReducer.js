import { combineReducers } from 'redux';
import eqipReducer from './eqipReducer'; // импортируй другие редюсеры

const rootReducer = combineReducers({
  example: eqipReducer, // добавь редюсеры в корневой редюсер
  // добавь другие редюсеры здесь
});

export default rootReducer;