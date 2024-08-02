import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // импортируй корневой редюсер

const store = configureStore({
  reducer: rootReducer,
});

export default store;