import { configureStore } from "@reduxjs/toolkit";

import { saveData } from "@/utils";


export const store = configureStore({
    reducer: {
      
    },
    
  });
  
  store.subscribe(() => {
    const state = store.getState();
  
    saveData('dayOne', state.dayOne);
    saveData('dayTwo', state.dayTwo);
    saveData('dayThree', state.dayThree);
    saveData('dayFour', state.dayFour);
    saveData('dayFive', state.dayFive);
    saveData('daySix', state.daySix);
    saveData('daySeven', state.daySeven);
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch