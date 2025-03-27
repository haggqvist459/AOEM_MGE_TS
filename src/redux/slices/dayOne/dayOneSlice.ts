import { createSlice } from '@reduxjs/toolkit'
import { StateData } from './dayOne.types'
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, updateFieldDelegated, loadData, saveData } from '@/utils'


const initialState: StateData = loadData<StateData>(DAY_KEYS.DAY_ONE) ?? {
    tribeLevelMultiplier: Object.values(TRIBE_LEVEL_MULTIPLIERS)[0], 
    stamina: '',
    tribesHunted: 0,
    score: {
       tribe: 0 
    },
    previousEvent: {
        first: '',
        tenth: ''
    }
}

const dayOneSlice = createSlice({
    name: DAY_KEYS.DAY_ONE,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {
            
        },
        resetState: () => {
            saveData(DAY_KEYS.DAY_ONE, initialState);
            return initialState;
          }
    }
})

export const { updateField, calculateDailyScore, resetState } = dayOneSlice.actions;
export default dayOneSlice.reducer;