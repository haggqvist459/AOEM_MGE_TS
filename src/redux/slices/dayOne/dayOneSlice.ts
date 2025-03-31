import { createSlice } from '@reduxjs/toolkit'
import { StateData } from './dayOne.types'
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS } from '@/utils'
import { updateFieldDelegated, loadData, saveData, toNumber } from '@/utils'


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
      const stamina = toNumber(state.stamina)

      if (stamina <= 0) {
        return; // Skip score calculation for empty or negative stamina values
      }

      // remove all the leftover stamina that can not be used to hunt tribes
      const validatedStamina = stamina - (stamina % POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE);
      // calculate the number of hunted tribes
      state.tribesHunted = validatedStamina /  POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE;
      // calculate the score
      state.score.tribe = state.tribesHunted * state.tribeLevelMultiplier
      
    },
    resetState: () => {
      saveData(DAY_KEYS.DAY_ONE, initialState);
      return initialState;
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = dayOneSlice.actions;
export default dayOneSlice.reducer;