import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayTwoStateData } from "./dayTwo.types";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, loadData, saveData, updateFieldDelegated, toNumber, toSeconds } from "@/utils";

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
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const field = action.payload;

      switch (field) {
        case 'epicMedals':
        case 'legendaryMedals':
          const legendaryMedals = toNumber(state.legendaryMedals);
          const epicMedals = toNumber(state.epicMedals);
          state.score.medals = 0;

          if (legendaryMedals > 0) {
            state.score.medals += legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL;
          }
          if (epicMedals > 0) {
            state.score.medals += epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL;
          }
          break;
        case 'epicScrolls':
        case 'legendaryScrolls':
          const legendaryScrolls = toNumber(state.legendaryScrolls);
          const epicScrolls = toNumber(state.epicScrolls);
          state.score.scrolls = 0

          if (legendaryScrolls > 0) {
            state.score.scrolls += legendaryScrolls * POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL;
          }
          if (epicScrolls > 0) {
            state.score.scrolls += epicScrolls * POINTS_AND_MULTIPLIERS.EPIC_SCROLL;
          }
          break;
        case 'legendaryBlueprints':
        case 'preforgedBlueprints':
        case 'forgingTime':
        case 'forgingSpeedup':
          let preforgedBlueprints = toNumber(state.preforgedBlueprints);
          const legendaryBlueprints = toNumber(state.legendaryBlueprints);
          const forgingTime = toSeconds(state.forgingTime);
          const forgingSpeedup = toSeconds(state.forgingSpeedup);
          state.score.forging = 0

          if (preforgedBlueprints > 0) {
            if (preforgedBlueprints > 5) {
              preforgedBlueprints = 5 // only 5 queues available in the game
              state.preforgedBlueprints = '5' // update the state to show the user the new value.  
            }
            state.score.forging += preforgedBlueprints * POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT;
          }
          if (forgingSpeedup > forgingTime && legendaryBlueprints > 0 && forgingTime > 0) {
            let completedBlueprints = Math.min(legendaryBlueprints, Math.floor(forgingSpeedup / forgingTime));
            state.score.forging += completedBlueprints * POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT;
            state.completedBlueprints = completedBlueprints;
          }
          break;
        case 'previousEvent':
          break;
        default:
          console.log("Error, incorrect field supplied to score calculation: ", field);
      }

      // add the various score values together into totalDailyScore
      state.totalDailyScore = Object.values(state.score)
        .reduce((total, score) => total + (score || 0), 0);
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