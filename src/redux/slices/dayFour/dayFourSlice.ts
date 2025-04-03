import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFourStateData } from "./dayFour.types";
import { saveData, loadData, toNumber, updateFieldDelegated } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS } from "@/utils";

const initialState: DayFourStateData = loadData<DayFourStateData>(DAY_KEYS.DAY_FOUR) ?? {
  hammers: '',
  copperSand: '',
  silverSand: '',
  fineGold: '',
  universalSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  buildingSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  researchSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  score: {
    rings: 0,
    universal: 0,
    building: 0,
    research: 0
  },
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: ''
  }
}

const dayFourSlice = createSlice({
  name: DAY_KEYS.DAY_FOUR,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload
    },
    resetState: () => {
      const reset = {
        hammers: '',
        copperSand: '',
        silverSand: '',
        fineGold: '',
        universalSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        buildingSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        researchSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        score: {
          rings: 0,
          universal: 0,
          building: 0,
          research: 0
        },
        totalDailyScore: 0,
        previousEvent: {
          first: '',
          tenth: ''
        }
      }

      saveData(DAY_KEYS.DAY_FOUR, reset);
      return reset;

    }
  }
})

export const { updateField, calculateDailyScore, resetState } = dayFourSlice.actions;
export default dayFourSlice.reducer;