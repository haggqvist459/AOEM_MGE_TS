import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
      
    },
    
  });
  
//   // Save to localStorage on any state change
//   store.subscribe(() => {
//     saveData(store.getState().list);
//   });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch