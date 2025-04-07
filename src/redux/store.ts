import { configureStore } from "@reduxjs/toolkit";
import { dayOneReducer, dayTwoReducer, dayThreeReducer, dayFourReducer, dayFiveReducer } from '@/redux/slices';
import { saveData, DAY_KEYS } from "@/utils";


export const store = configureStore({
  reducer: {
    [DAY_KEYS.DAY_ONE]: dayOneReducer,
    [DAY_KEYS.DAY_TWO]: dayTwoReducer,
    [DAY_KEYS.DAY_THREE]: dayThreeReducer,
    [DAY_KEYS.DAY_FOUR]: dayFourReducer,
    [DAY_KEYS.DAY_FIVE]: dayFiveReducer,
  },

});

store.subscribe(() => {
  const state = store.getState();

  Object.values(DAY_KEYS).forEach((key) => {
    saveData(key, state[key]);
  });
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch