import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveData, loadData, toNumber, updateFieldDelegated, toSeconds } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, TROOP_TIER_MULTIPLIERS } from "@/utils";
import { DaySixStateData } from "../daySix";

const targetTierDefault = TROOP_TIER_MULTIPLIERS['Tier 7'];

const initialState: DaySixStateData = loadData<DaySixStateData>(DAY_KEYS.DAY_SIX) ?? {
  troopPower: {
    troopsTotal: '',
    troopTier: targetTierDefault
  },
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
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: ''
  }
}

const daySixSlice = createSlice({
  name: DAY_KEYS.DAY_SIX,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const field = action.payload

      switch (field) {
        case 'troopPower':
          state.score.troop = 0

          break;
        case 'buildingPower':
          state.score.building = 0
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
        troopPower: {
          troopsTotal: '',
          troopTier: targetTierDefault
        },
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
        totalDailyScore: 0,
        previousEvent: {
          first: '',
          tenth: ''
        }
      }

      saveData(DAY_KEYS.DAY_SIX, reset);
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = daySixSlice.actions;
export default daySixSlice.reducer;