import { configureStore } from '@reduxjs/toolkit';

import uiActions from './ui-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer }
});

export default store;