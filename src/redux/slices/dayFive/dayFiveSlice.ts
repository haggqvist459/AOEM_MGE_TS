import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFiveStateData, TroopType, TroopTypeData, UpdateTroopTypePayload } from "./dayFive.types";
import { saveData, loadData, toNumber, updateFieldDelegated, toSeconds, toMinutes, TROOP_TIER_MULTIPLIERS } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, TROOP_TYPES } from "@/utils";


const targetTierDefault = TROOP_TIER_MULTIPLIERS['Tier 7'];
const baseTierDefault = TROOP_TIER_MULTIPLIERS['Tier 6'];

const initialState: DayFiveStateData = loadData<DayFiveStateData>(DAY_KEYS.DAY_FIVE) ?? {
  troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
    acc[troop as TroopType] = {
      targetTier: targetTierDefault,
      baseTier: baseTierDefault,
      availableTroops: '',
      troopsPerBatch: '',
      trainingTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      troopTotalScore: 0,
      promotableBatches: 0,
      maxPromotableBatches: 0,
    };
    return acc;
  }, {} as Record<TroopType, TroopTypeData>),
  trainedTroopsPerBatch: '',
  trainedTroopsTrainingTime: {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  },
  trainedTroopTier: targetTierDefault,
  initialTrainingSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  remainingTrainingSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  score: {
    promotion: 0,
    training: 0
  },
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: ''
  }
}

const dayFiveSlice = createSlice({
  name: DAY_KEYS.DAY_FIVE,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    updateTroopTypeField: (state, action: PayloadAction<UpdateTroopTypePayload>) => {
      const { troopType, field, value } = action.payload
      console.log("updateTroopField payload, troopType: ", troopType, ', field: ', field, ' , value: ', value)
      
    },
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {

    },
    resetState: () => {
      const reset = {
        troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
          acc[troop as TroopType] = {
            targetTier: targetTierDefault,
            baseTier: baseTierDefault,
            availableTroops: '',
            troopsPerBatch: '',
            trainingTime: {
              days: '',
              hours: '',
              minutes: '',
              seconds: '',
            },
            troopTotalScore: 0,
            promotableBatches: 0,
            maxPromotableBatches: 0,
          };
          return acc;
        }, {} as Record<TroopType, TroopTypeData>),
        trainedTroopsPerBatch: '',
        trainedTroopsTrainingTime: {
          days: '',
          hours: '',
          minutes: '',
          seconds: '',
        },
        trainedTroopTier: targetTierDefault,
        initialTrainingSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        remainingTrainingSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        score: {
          promotion: 0,
          training: 0
        },
        totalDailyScore: 0,
        previousEvent: {
          first: '',
          tenth: ''
        }
      }

      saveData(DAY_KEYS.DAY_FIVE, reset)
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState, updateTroopTypeField } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;