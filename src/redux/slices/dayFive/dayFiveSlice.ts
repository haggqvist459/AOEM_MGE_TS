import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFiveStateData, TroopType, TroopTypeData, UpdateTroopTypePayload, calculatePromotionScore } from "../dayFive";
import { saveData, loadData, toNumber, updateFieldDelegated, toSeconds, TROOP_TIER_MULTIPLIERS } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, TROOP_TYPES } from "@/utils";
import { TimeData } from "@/types";

const targetTierDefault = TROOP_TIER_MULTIPLIERS['Tier 7'];
const baseTierDefault = TROOP_TIER_MULTIPLIERS['Tier 6'];

const initialState: DayFiveStateData = loadData<DayFiveStateData>(DAY_KEYS.DAY_FIVE) ?? {
  troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
    acc[troop as TroopType] = {
      targetTier: targetTierDefault,
      baseTier: baseTierDefault,
      availableTroops: '',
      troopsPerBatch: '',
      promotionTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      troopTotalScore: 0,
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
      const { troopType, field, value, unit } = action.payload

      if (unit) {
        (state.troops[troopType][field] as TimeData)[unit] = value as string
      } else {
        (state.troops[troopType][field] as any) = value 
      }
    },
    calculateDailyScore: (state) => {
        let trainingSpeedupSeconds = toSeconds(state.initialTrainingSpeedup)
        let remainingTrainingSpeedup = 0
        // only calculate the score if there is speed up
        if (trainingSpeedupSeconds >= 0){
          remainingTrainingSpeedup = calculatePromotionScore(Object.values(state.troops), trainingSpeedupSeconds)
        }
        // if there's remaining training speedup after promotion, calculate training score
        const trainingTimeSeconds = toSeconds(state.trainedTroopsTrainingTime)
        if (remainingTrainingSpeedup > trainingTimeSeconds){
          
        }
    },
    resetState: () => {
      const reset = {
        troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
          acc[troop as TroopType] = {
            targetTier: targetTierDefault,
            baseTier: baseTierDefault,
            availableTroops: '',
            troopsPerBatch: '',
            promotionTime: {
              days: '',
              hours: '',
              minutes: '',
              seconds: '',
            },
            troopTotalScore: 0,
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