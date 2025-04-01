import { createSlice } from "@reduxjs/toolkit";
import { DayTwoStateData } from "./dayTwo.types";
import { DAY_KEYS, loadData, saveData, updateFieldDelegated } from "@/utils";

const initialState: DayTwoStateData = loadData<DayTwoStateData>(DAY_KEYS.DAY_TWO) ?? {
  epicMedals: '',
  legendaryMedals: '',
  epicScrolls: '',
  legendaryScrolls: '',
  legendaryBlueprints: '',
  preforgedBlueprints: '',
  completedBlueprints: 0,
  totalDailyScore: 0,
  forgingSpeedup: {
    days: '',
    hours: '',
    minutes: '',
  },
  forgingTime: {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  },
  score: {
    forging: 0,
    medals: 0,
    scrolls: 0
  },
  previousEvent: {
    first: '',
    tenth: '',
  },
}

const dayTwoSlice = createSlice({
  name: DAY_KEYS.DAY_TWO,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state) => {

    },
    resetState: () => {
      const reset = {
        epicMedals: '',
        legendaryMedals: '',
        epicScrolls: '',
        legendaryScrolls: '',
        legendaryBlueprints: '',
        preforgedBlueprints: '',
        completedBlueprints: 0,
        totalDailyScore: 0,
        forgingSpeedup: {
          days: '',
          hours: '',
          minutes: '',
        },
        forgingTime: {
          days: '',
          hours: '',
          minutes: '',
          seconds: ''
        },
        score: {
          forging: 0,
          medals: 0,
          scrolls: 0
        },
        previousEvent: {
          first: '',
          tenth: '',
        },
      }

      saveData(DAY_KEYS.DAY_TWO, reset);
      return reset;
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = dayTwoSlice.actions;
export default dayTwoSlice.reducer;