import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFourStateData } from "./dayFour.types";
import { saveData, loadData, toNumber, updateFieldDelegated, toMinutes } from "@/utils";
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
  totalDailyScore: 0
}

const dayFourSlice = createSlice({
  name: DAY_KEYS.DAY_FOUR,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const field = action.payload

      switch (field) {
        case 'hammers':
        case 'fineGold':
        case 'copperSand':
        case 'silverSand':
          const hammers = toNumber(state.hammers);
          const fineGold = toNumber(state.fineGold);
          const copperSand = toNumber(state.copperSand);
          const silverSand = toNumber(state.silverSand);

          state.score.rings = 0
          if (hammers > 0) {
            state.score.rings += hammers * POINTS_AND_MULTIPLIERS.FINE_CRAFT;
          }
          if (copperSand > 0) {
            state.score.rings += copperSand * POINTS_AND_MULTIPLIERS.COPPER_SAND;
          }
          if (silverSand > 0) {
            state.score.rings += silverSand * POINTS_AND_MULTIPLIERS.SILVER_SAND;
          }
          if (fineGold > 0) {
            state.score.rings += fineGold * POINTS_AND_MULTIPLIERS.FINE_GOLD;
          }
          break;
        case 'universalSpeedup':
          const universalSpeedupMin = toMinutes(state.universalSpeedup);
          state.score.universal = universalSpeedupMin * POINTS_AND_MULTIPLIERS.SPEEDUP_UNIVERSAL;
          break;
        case 'buildingSpeedup':
          const buildingSpeedupMin = toMinutes(state.buildingSpeedup);
          state.score.building = buildingSpeedupMin * POINTS_AND_MULTIPLIERS.SPEEDUP_BUILDING;
          break;
        case 'researchSpeedup':
          const researchSpeedupMin = toMinutes(state.researchSpeedup);
          state.score.research = researchSpeedupMin * POINTS_AND_MULTIPLIERS.SPEEDUP_RESEARCH;
          break;
        case 'previousEvent':
          break;
        default:
          console.log(`Error in score calculation, field ${field} does not exist in state.`)
      }

      state.totalDailyScore = Object.values(state.score)
        .reduce((total, score) => total + (score || 0), 0);

    },
    resetState: () => {
      const reset: DayFourStateData = {
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
      }

      saveData(DAY_KEYS.DAY_FOUR, reset);
      return reset;

    }
  }
})

export const { updateField, calculateDailyScore, resetState } = dayFourSlice.actions;
export default dayFourSlice.reducer;