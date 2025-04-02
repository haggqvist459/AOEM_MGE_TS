import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayThreeStateData, UpdateMarchPayload, GatherMarchData } from './dayThree.types'
import { DAY_KEYS, saveData, loadData, updateFieldDelegated, toNumber } from "@/utils";

const initialState: DayThreeStateData = loadData<DayThreeStateData>(DAY_KEYS.DAY_THREE) ?? {
  marches: [
    {
      id: '1',
      name: 'March 1',
      fullAtReset: false,
      loadBonus: '',
      loadCapacity: '',
      completedTurns: '',
      score: 0
    }
  ],
  nextMarchId: 2,
  allianceCenterId: '0',
  richFieldId: '0',
  empireCoins: '',
  score: {
    gathering: 0,
    spins: 0
  },
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: '',
  }
}

const dayThreeSlice = createSlice({
  name: DAY_KEYS.DAY_THREE,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    updateMarchField(state, action: PayloadAction<{ id: string; field: string; value: string | boolean }>) {
      const { id, field, value } = action.payload;
      const marchIndex = state.marches.findIndex(m => m.id === id);
      if (marchIndex === -1) return;
    
      const march = state.marches[marchIndex];
      if (!(field in march)) return;
    
      (march as any)[field] = value;
    },
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload;

      // find the index of the march to calculate
      const marchIndex = state.marches.findIndex(march => march.id === id);
      if (marchIndex === -1) {
        console.error(`Invalid march ID: ${id}`);
        return;
      }

      // do nothing on id 0

      // calculate spin score on id=999

      // calculate the score for the march with provided id 
    },
    addMarch: (state) => {
      if (state.marches.length >= 5) return

      const newMarch = {
        id: state.nextMarchId.toString(),
        name: `March ${state.nextMarchId}`,
        fullAtReset: false,
        loadBonus: '',
        loadCapacity: '',
        completedTurns: '',
        score: 0
      }

      state.marches.push(newMarch);
      state.nextMarchId += 1;

    },
    removeMarch: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.marches = state.marches.filter(march => march.id !== id);
    },
    resetState: () => {
      const reset = {
        marches: [
          {
            id: '1',
            name: 'March 1',
            fullAtReset: false,
            loadBonus: '',
            loadCapacity: '',
            completedTurns: '',
            score: 0
          }
        ],
        nextMarchId: 2,
        allianceCenterId: '0',
        richFieldId: '0',
        empireCoins: '',
        score: {
          gathering: 0,
          spins: 0
        },
        totalDailyScore: 0,
        previousEvent: {
          first: '',
          tenth: '',
        }
      }

      saveData(DAY_KEYS.DAY_THREE, reset);
      return reset;
    }
  }
})


export const { updateField, calculateDailyScore, resetState, addMarch, removeMarch, updateMarchField } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;