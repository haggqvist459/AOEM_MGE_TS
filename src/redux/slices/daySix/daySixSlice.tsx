import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveData, loadData, toNumber, updateFieldDelegated } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, TROOP_POWER_MULTIPLIER } from "@/utils";
import { DaySixStateData } from "../daySix";

const targetTierDefault = TROOP_POWER_MULTIPLIER['Tier 7'];

const initialState: DaySixStateData = loadData<DaySixStateData>(DAY_KEYS.DAY_SIX) ?? {
  troopsTotal: '',
  troopTier: targetTierDefault,
  buildingPower: {
    firstQueue: '',
    secondQueue: '',
    thirdQueue: '',
  },
  researchPower: '',
  score: {
    building: 0,
    research: 0,
    troop: 0
  },
  totalDailyScore: 0
}

const daySixSlice = createSlice({
  name: DAY_KEYS.DAY_SIX,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const field = action.payload

      switch (field) {
        case 'troopsTotal':
        case 'troopTier':
          state.score.troop = toNumber(state.troopsTotal) * toNumber(state.troopTier) * POINTS_AND_MULTIPLIERS.POWER_TRAINING
          break;
        case 'buildingPower':
          state.score.building = Object.values(state.buildingPower).reduce((total, power) => {
            return total + toNumber(power)
          }, 0) * POINTS_AND_MULTIPLIERS.POWER_BUILDING
          break;
        case 'researchPower':
          state.score.research = toNumber(state.researchPower) * POINTS_AND_MULTIPLIERS.POWER_RESEARCH
          break;
        case 'previousEvent':
          break;
        default:
          console.error("incorrect value for field provided to calculateDailyScore: ", field)
          break;
      }

      state.totalDailyScore = Object.values(state.score)
        .reduce((total, score) => total + (score || 0), 0);

    },
    resetState: () => {
      const reset = {
        troopsTotal: '',
        troopTier: targetTierDefault,
        buildingPower: {
          firstQueue: '',
          secondQueue: '',
          thirdQueue: '',
        },
        researchPower: '',
        score: {
          building: 0,
          research: 0,
          troop: 0
        },
        totalDailyScore: 0
      }

      saveData(DAY_KEYS.DAY_SIX, reset);
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = daySixSlice.actions;
export default daySixSlice.reducer;